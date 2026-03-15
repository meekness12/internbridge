package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.LogbookRequestDTO;
import com.internbridge.backend.dto.response.LogbookResponseDTO;
import com.internbridge.backend.entity.Lecturer;
import com.internbridge.backend.entity.Logbook;
import com.internbridge.backend.entity.LogbookStatus;
import com.internbridge.backend.entity.Notification;
import com.internbridge.backend.entity.Placement;
import com.internbridge.backend.entity.PlacementStatus;
import com.internbridge.backend.entity.Student;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.LecturerRepository;
import com.internbridge.backend.repository.LogbookRepository;
import com.internbridge.backend.repository.NotificationRepository;
import com.internbridge.backend.repository.PlacementRepository;
import com.internbridge.backend.service.LogbookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LogbookServiceImpl implements LogbookService {

    private final LogbookRepository logbookRepository;
    private final PlacementRepository placementRepository;
    private final NotificationRepository notificationRepository;
    private final LecturerRepository lecturerRepository;

    // ── Create ──────────────────────────────────────────────────────────

    @Override
    public LogbookResponseDTO createLogbook(LogbookRequestDTO requestDTO) {
        Placement placement = placementRepository.findById(requestDTO.getPlacementId())
                .orElseThrow(() -> new ResourceNotFoundException("Placement", "id", requestDTO.getPlacementId()));

        // Validation: cannot create logbook for completed/terminated placements
        validatePlacementIsActive(placement);

        Logbook logbook = Logbook.builder()
                .placement(placement)
                .recordDate(requestDTO.getRecordDate())
                .hoursWorked(requestDTO.getHoursWorked())
                .tasksCompleted(requestDTO.getTasksCompleted())
                .build();

        Logbook saved = logbookRepository.save(logbook);
        return mapToResponseDTO(saved);
    }

    // ── Read ────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public LogbookResponseDTO getLogbookById(UUID id) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));
        return mapToResponseDTO(logbook);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LogbookResponseDTO> getLogbooksByPlacementId(UUID placementId) {
        if (!placementRepository.existsById(placementId)) {
            throw new ResourceNotFoundException("Placement", "id", placementId);
        }
        return logbookRepository.findByPlacementIdOrderByRecordDateDesc(placementId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // ── Update Logbook Content ──────────────────────────────────────────

    @Override
    public LogbookResponseDTO updateLogbook(UUID id, LogbookRequestDTO requestDTO) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));

        Placement placement = placementRepository.findById(requestDTO.getPlacementId())
                .orElseThrow(() -> new ResourceNotFoundException("Placement", "id", requestDTO.getPlacementId()));

        // Validation: cannot update logbook if placement is closed
        validatePlacementIsActive(placement);

        logbook.setPlacement(placement);
        logbook.setRecordDate(requestDTO.getRecordDate());
        logbook.setHoursWorked(requestDTO.getHoursWorked());
        logbook.setTasksCompleted(requestDTO.getTasksCompleted());

        Logbook updated = logbookRepository.save(logbook);
        return mapToResponseDTO(updated);
    }

    // ── Company Approval (with Business Workflow) ───────────────────────

    @Override
    public LogbookResponseDTO updateCompanyStatus(UUID id, String status) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));

        // Validation: cannot approve/reject logbook for closed placements
        validatePlacementIsActive(logbook.getPlacement());

        LogbookStatus incomingStatus = LogbookStatus.valueOf(status);
        logbook.setCompanyStatus(incomingStatus);
        Logbook updated = logbookRepository.save(logbook);

        // ── Workflow: on COMPANY_APPROVED → notify the department's lecturers ─
        if (incomingStatus == LogbookStatus.COMPANY_APPROVED) {
            notifyDepartmentLecturers(logbook);
        }

        return mapToResponseDTO(updated);
    }

    // ── Lecturer Approval ───────────────────────────────────────────────

    @Override
    public LogbookResponseDTO updateLecturerStatus(UUID id, String status) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));

        // Validation: cannot approve/reject logbook for closed placements
        validatePlacementIsActive(logbook.getPlacement());

        logbook.setLecturerStatus(LogbookStatus.valueOf(status));
        Logbook updated = logbookRepository.save(logbook);
        return mapToResponseDTO(updated);
    }

    // ── Delete ──────────────────────────────────────────────────────────

    @Override
    public void deleteLogbook(UUID id) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));
        logbookRepository.delete(logbook);
    }

    // ── Private: Business Logic Helpers ─────────────────────────────────

    /**
     * Prevents any mutation on logbooks whose placement is COMPLETED or TERMINATED.
     */
    private void validatePlacementIsActive(Placement placement) {
        if (placement.getStatus() == PlacementStatus.COMPLETED
                || placement.getStatus() == PlacementStatus.TERMINATED) {
            throw new IllegalStateException(
                    "Cannot modify logbook for a placement with status: " + placement.getStatus());
        }
    }

    /**
     * When a company approves a logbook entry, notify all lecturers in the
     * student's department so they can review and verify.
     */
    private void notifyDepartmentLecturers(Logbook logbook) {
        Student student = logbook.getPlacement().getApplication().getStudent();
        UUID departmentId = student.getDepartment().getId();

        String studentFullName = student.getFirstName() + " " + student.getLastName();
        String msgTemplate = "Logbook entry for %s (Date: %s) has been approved by the company " +
                             "and is ready for your verification.";
        String message = String.format(msgTemplate, studentFullName, logbook.getRecordDate());

        List<Lecturer> lecturers = lecturerRepository.findByDepartmentId(departmentId);

        if (lecturers.isEmpty()) {
            log.warn("No lecturers found in department [{}] to notify for logbook [{}]. " +
                     "School admin should be notified instead.", departmentId, logbook.getId());
            return;
        }

        for (Lecturer lecturer : lecturers) {
            Notification notification = Notification.builder()
                    .user(lecturer.getUser())
                    .message(message)
                    .build();
            notificationRepository.save(notification);
        }

        log.info("Notified {} lecturer(s) in department [{}] about logbook [{}] company approval",
                lecturers.size(), departmentId, logbook.getId());
    }

    // ── Mapping ─────────────────────────────────────────────────────────

    private LogbookResponseDTO mapToResponseDTO(Logbook logbook) {
        return LogbookResponseDTO.builder()
                .id(logbook.getId())
                .placementId(logbook.getPlacement().getId())
                .recordDate(logbook.getRecordDate())
                .hoursWorked(logbook.getHoursWorked())
                .tasksCompleted(logbook.getTasksCompleted())
                .companyStatus(logbook.getCompanyStatus().name())
                .lecturerStatus(logbook.getLecturerStatus().name())
                .build();
    }
}
