package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;
import com.internbridge.backend.entity.*;
import com.internbridge.backend.repository.*;
import com.internbridge.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final InternRepository internRepository;
    private final UserRepository userRepository;
    private final InternshipRepository internshipRepository;
    private final PlacementRepository placementRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public ApplicationResponseDTO applyForInternship(ApplicationRequestDTO requestDTO) {
        try {
            // Self-repair logic for orphaned student profiles
            Intern intern = internRepository.findById(requestDTO.getStudentId())
                    .orElseGet(() -> {
                        log.info("Intern profile missing for ID {}. Attempting self-repair...", requestDTO.getStudentId());
                        User user = userRepository.findById(requestDTO.getStudentId())
                                .orElseThrow(() -> new RuntimeException("User not found: " + requestDTO.getStudentId()));
                        
                        if (user.getRole() != Role.INTERN) {
                            throw new RuntimeException("User " + user.getEmail() + " is not an INTERN");
                        }
                        
                        Intern newIntern = Intern.builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .password(user.getPassword())
                                .role(user.getRole())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .status(user.getStatus())
                                .isStudent(true)
                                .build();
                        return internRepository.save(newIntern);
                    });

            Internship internship = internshipRepository.findById(requestDTO.getInternshipId())
                    .orElseThrow(() -> new RuntimeException("Internship mapping not found: " + requestDTO.getInternshipId()));

            if (applicationRepository.existsByInternIdAndInternshipId(intern.getId(), internship.getId())) {
                throw new RuntimeException("You have already submitted an application for this role.");
            }

            Application application = Application.builder()
                    .intern(intern)
                    .internship(internship)
                    .coverLetter(requestDTO.getCoverLetter())
                    .cvUrl(requestDTO.getCvUrl())
                    .status(ApplicationStatus.PENDING)
                    .build();

            Application savedApplication = applicationRepository.save(application);
            
            // Notify Company (Guard against missing managers)
            if (internship.getCompanyAdmin() != null) {
                Notification notification = Notification.builder()
                        .user(internship.getCompanyAdmin())
                        .message("Alert: New application for " + internship.getTitle() + " submitted by " + intern.getFirstName())
                        .isRead(false)
                        .build();
                notificationRepository.save(notification);
            }

            return mapToResponseDTO(savedApplication);
        } catch (Exception e) {
            log.error("CRITICAL: Internship application failed: ", e);
            throw new RuntimeException("Application System Error: " + e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationResponseDTO getApplicationById(UUID id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return mapToResponseDTO(application);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByInternshipId(UUID internshipId) {
        return applicationRepository.findByInternshipId(internshipId).stream()
                .map(app -> {
                    try {
                        return mapToResponseDTO(app);
                    } catch (Exception e) {
                        log.error("POISONED RECORD DETECTED: Application ID {} is malformed: {}", app.getId(), e.getMessage());
                        return null; // Skip this record instead of crashing the whole list
                    }
                })
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByInternId(UUID internId) {
        try {
            return applicationRepository.findByInternId(internId).stream()
                    .map(this::mapToResponseDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Failed to fetch applications for intern {}: ", internId, e);
            throw new RuntimeException("Listing Error: " + e.getMessage());
        }
    }

    @Override
    public ApplicationResponseDTO updateApplicationStatus(UUID id, String status) {
        try {
            Application application = applicationRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Application record not found for ID: " + id));

            ApplicationStatus newStatus;
            try {
                newStatus = ApplicationStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                log.warn("Invalid status provided: {}. Attempting mapping...", status);
                if ("ACCEPTED".equalsIgnoreCase(status)) newStatus = ApplicationStatus.ACCEPTED;
                else if ("APPROVED".equalsIgnoreCase(status)) newStatus = ApplicationStatus.APPROVED;
                else throw new RuntimeException("Protocol Error: Status '" + status + "' is not a valid lifecycle state.");
            }
            
            application.setStatus(newStatus);
            
            // Auto-repair for historical applications missing cover letters
            if (application.getCoverLetter() == null || application.getCoverLetter().trim().isEmpty()) {
                log.info("Repairing missing cover letter for legacy application: {}", id);
                application.setCoverLetter("Submitted via legacy application flow (Historical record).");
            }

            if (newStatus == ApplicationStatus.HIRED) {
                // Create Placement automatically (Only if one doesn't exist)
                Placement placement;
                if (!placementRepository.existsByApplicationId(id)) {
                    placement = Placement.builder()
                            .application(application)
                            .startDate(LocalDate.now())
                            .endDate(LocalDate.now().plusMonths(6)) // Default 6 months
                            .status(PlacementStatus.ACTIVE)
                            .build();
                    placement = placementRepository.save(placement);
                } else {
                    placement = placementRepository.findByApplicationId(id)
                            .orElse(null);
                }

                // NOTIFICATION SHIELD: Notify Student of hiring (Fail-Safe)
                try {
                    if (application.getIntern() != null) {
                        notificationRepository.save(Notification.builder()
                                .user(application.getIntern())
                                .message("Congratulations! You have been HIRED for " + application.getInternship().getTitle())
                                .isRead(false)
                                .build());
                    }
                } catch (Exception notifyEx) {
                    log.warn("Non-critical notification failure during HIRED status update: {}", notifyEx.getMessage());
                }
            } else if (newStatus == ApplicationStatus.ACCEPTED || newStatus == ApplicationStatus.APPROVED) {
                // NOTIFICATION SHIELD: Notify Student of approval (Fail-Safe)
                try {
                    if (application.getIntern() != null) {
                        notificationRepository.save(Notification.builder()
                                .user(application.getIntern())
                                .message("Great news! Your application for " + application.getInternship().getTitle() + " has been " + newStatus.name())
                                .isRead(false)
                                .build());
                    }
                } catch (Exception notifyEx) {
                    log.warn("Non-critical notification failure during ACCEPTED/APPROVED status update: {}", notifyEx.getMessage());
                }
            }

            Application updatedApplication = applicationRepository.save(application);
            return mapToResponseDTO(updatedApplication);
        } catch (Exception e) {
            log.error("Status Update Failed: ", e);
            throw new RuntimeException("Status Update Failed: " + e.getMessage());
        }
    }

    private ApplicationResponseDTO mapToResponseDTO(Application application) {
        if (application == null) return null;
        
        String internshipTitle = "Unknown Internship";
        UUID internshipId = null;
        if (application.getInternship() != null) {
            internshipTitle = application.getInternship().getTitle();
            internshipId = application.getInternship().getId();
        }

        String studentName = "Unknown Student";
        if (application.getIntern() != null) {
            String firstName = application.getIntern().getFirstName();
            String lastName = application.getIntern().getLastName();
            
            if ((firstName == null || firstName.trim().isEmpty()) && 
                (lastName == null || lastName.trim().isEmpty())) {
                studentName = application.getIntern().getEmail();
            } else {
                studentName = (firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "");
                studentName = studentName.trim();
            }
        }

        return ApplicationResponseDTO.builder()
                .id(application.getId())
                .internshipId(internshipId)
                .internshipTitle(internshipTitle)
                .studentName(studentName)
                .status(application.getStatus() != null ? application.getStatus().name() : "PENDING")
                .coverLetter(application.getCoverLetter())
                .cvUrl(application.getCvUrl())
                .createdAt(application.getAppliedAt() != null ? application.getAppliedAt() : java.time.LocalDateTime.now())
                .build();
    }
}
