package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;
import com.internbridge.backend.entity.Application;
import com.internbridge.backend.entity.ApplicationStatus;
import com.internbridge.backend.entity.Internship;
import com.internbridge.backend.entity.Notification;
import com.internbridge.backend.entity.Placement;
import com.internbridge.backend.entity.PlacementStatus;
import com.internbridge.backend.entity.Student;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.ApplicationRepository;
import com.internbridge.backend.repository.InternshipRepository;
import com.internbridge.backend.repository.NotificationRepository;
import com.internbridge.backend.repository.PlacementRepository;
import com.internbridge.backend.repository.StudentRepository;
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
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;
    private final PlacementRepository placementRepository;
    private final NotificationRepository notificationRepository;

    // ── Create ──────────────────────────────────────────────────────────

    @Override
    public ApplicationResponseDTO createApplication(ApplicationRequestDTO requestDTO) {
        Student student = studentRepository.findById(requestDTO.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", requestDTO.getStudentId()));

        Internship internship = internshipRepository.findById(requestDTO.getInternshipId())
                .orElseThrow(() -> new ResourceNotFoundException("Internship", "id", requestDTO.getInternshipId()));

        // ── Validation: prevent duplicate applications ──────────────────
        if (applicationRepository.existsByStudentUserIdAndInternshipId(
                requestDTO.getStudentId(), requestDTO.getInternshipId())) {
            throw new IllegalStateException(
                    "Student has already applied to this internship");
        }

        Application application = Application.builder()
                .student(student)
                .internship(internship)
                .build();

        Application saved = applicationRepository.save(application);
        return mapToResponseDTO(saved);
    }

    // ── Read ────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public ApplicationResponseDTO getApplicationById(UUID id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));
        return mapToResponseDTO(application);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByStudentId(UUID studentUserId) {
        if (!studentRepository.existsById(studentUserId)) {
            throw new ResourceNotFoundException("Student", "userId", studentUserId);
        }
        return applicationRepository.findByStudentUserId(studentUserId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByInternshipId(UUID internshipId) {
        if (!internshipRepository.existsById(internshipId)) {
            throw new ResourceNotFoundException("Internship", "id", internshipId);
        }
        return applicationRepository.findByInternshipId(internshipId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // ── Update Status (with Business Workflow) ──────────────────────────

    @Override
    public ApplicationResponseDTO updateApplicationStatus(UUID id, String status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));

        ApplicationStatus incomingStatus = ApplicationStatus.valueOf(status);
        ApplicationStatus currentStatus = application.getStatus();

        application.setStatus(incomingStatus);
        Application updated = applicationRepository.save(application);

        // ── Workflow: on APPROVED → auto-create Placement + Notification ─
        if (incomingStatus == ApplicationStatus.APPROVED && currentStatus != ApplicationStatus.APPROVED) {
            Placement placement = Placement.builder()
                    .application(application)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now().plusMonths(3))
                    .status(PlacementStatus.ACTIVE)
                    .build();
            placementRepository.save(placement);

            log.info("Auto-created Placement [{}] for Application [{}]",
                    placement.getId(), application.getId());

            // Notify the student
            String studentName = application.getStudent().getFirstName();
            String internshipTitle = application.getInternship().getTitle();
            String companyName = application.getInternship().getCompany().getCompanyName();

            Notification notification = Notification.builder()
                    .user(application.getStudent().getUser())
                    .message(String.format(
                            "Congratulations %s! Your application for \"%s\" at %s has been approved. " +
                            "A placement has been automatically generated (Start: %s, End: %s).",
                            studentName, internshipTitle, companyName,
                            placement.getStartDate(), placement.getEndDate()))
                    .build();
            notificationRepository.save(notification);

            log.info("Sent approval notification to Student [{}]",
                    application.getStudent().getUserId());
        }

        return mapToResponseDTO(updated);
    }

    // ── Delete ──────────────────────────────────────────────────────────

    @Override
    public void deleteApplication(UUID id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));
        applicationRepository.delete(application);
    }

    // ── Mapping ─────────────────────────────────────────────────────────

    private ApplicationResponseDTO mapToResponseDTO(Application application) {
        return ApplicationResponseDTO.builder()
                .id(application.getId())
                .studentId(application.getStudent().getUserId())
                .studentName(application.getStudent().getFirstName() + " " + application.getStudent().getLastName())
                .internshipId(application.getInternship().getId())
                .internshipTitle(application.getInternship().getTitle())
                .status(application.getStatus().name())
                .appliedAt(application.getAppliedAt())
                .build();
    }
}
