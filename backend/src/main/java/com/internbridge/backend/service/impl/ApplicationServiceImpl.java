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
    private final InternshipRepository internshipRepository;
    private final PlacementRepository placementRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public ApplicationResponseDTO applyForInternship(ApplicationRequestDTO requestDTO) {
        Intern intern = internRepository.findById(requestDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Intern not found"));

        Internship internship = internshipRepository.findById(requestDTO.getInternshipId())
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        if (applicationRepository.existsByInternIdAndInternshipId(intern.getId(), internship.getId())) {
            throw new RuntimeException("Already applied for this internship");
        }

        Application application = Application.builder()
                .intern(intern)
                .internship(internship)
                .status(ApplicationStatus.PENDING)
                .build();

        Application savedApplication = applicationRepository.save(application);
        
        // Notify Company
        Notification notification = Notification.builder()
                .user(internship.getCompanyAdmin())
                .message("New application for " + internship.getTitle() + " from " + intern.getFirstName())
                .isRead(false)
                .build();
        notificationRepository.save(notification);

        return mapToResponseDTO(savedApplication);
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
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByInternId(UUID internId) {
        return applicationRepository.findByInternId(internId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationResponseDTO updateApplicationStatus(UUID id, String status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        ApplicationStatus newStatus = ApplicationStatus.valueOf(status);
        application.setStatus(newStatus);

        if (newStatus == ApplicationStatus.HIRED) {
            // Create Placement automatically
            Placement placement = Placement.builder()
                    .application(application)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now().plusMonths(6)) // Default 6 months
                    .status(PlacementStatus.ACTIVE)
                    .build();
            placementRepository.save(placement);
            
            // Notify Student
            Notification notification = Notification.builder()
                    .user(application.getIntern())
                    .message("Congratulations! You have been hired for " + application.getInternship().getTitle())
                    .isRead(false)
                    .build();
            notificationRepository.save(notification);
        }

        Application updatedApplication = applicationRepository.save(application);
        return mapToResponseDTO(updatedApplication);
    }

    private ApplicationResponseDTO mapToResponseDTO(Application application) {
        return ApplicationResponseDTO.builder()
                .id(application.getId())
                .internshipId(application.getInternship().getId())
                .internshipTitle(application.getInternship().getTitle())
                .studentName(application.getIntern().getFirstName() + " " + application.getIntern().getLastName())
                .status(application.getStatus().name())
                .createdAt(application.getAppliedAt())
                .build();
    }
}
