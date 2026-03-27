import com.internbridge.backend.dto.request.LogbookRequestDTO;
import com.internbridge.backend.dto.response.LogbookResponseDTO;
import com.internbridge.backend.entity.Logbook;
import com.internbridge.backend.entity.LogbookStatus;
import com.internbridge.backend.entity.Placement;
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

    @Override
    public LogbookResponseDTO createLogbook(LogbookRequestDTO requestDTO) {
        Placement placement = placementRepository.findById(requestDTO.getPlacementId())
                .orElseThrow(() -> new RuntimeException("Placement not found"));

        Logbook logbook = Logbook.builder()
                .placement(placement)
                .recordDate(requestDTO.getRecordDate())
                .hoursWorked(requestDTO.getHoursWorked())
                .tasksCompleted(requestDTO.getTasksCompleted())
                .companyStatus(LogbookStatus.PENDING)
                .lecturerStatus(LogbookStatus.PENDING)
                .build();

        Logbook savedLogbook = logbookRepository.save(logbook);
        return mapToResponseDTO(savedLogbook);
    }

    @Override
    @Transactional(readOnly = true)
    public LogbookResponseDTO getLogbookById(UUID id) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Logbook entry not found"));
        return mapToResponseDTO(logbook);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LogbookResponseDTO> getLogbooksByPlacementId(UUID placementId) {
        return logbookRepository.findByPlacementId(placementId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LogbookResponseDTO updateLogbook(UUID id, LogbookRequestDTO requestDTO) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Logbook entry not found"));

        logbook.setRecordDate(requestDTO.getRecordDate());
        logbook.setHoursWorked(requestDTO.getHoursWorked());
        logbook.setTasksCompleted(requestDTO.getTasksCompleted());

        Logbook updatedLogbook = logbookRepository.save(logbook);
        return mapToResponseDTO(updatedLogbook);
    }

    @Override
    public LogbookResponseDTO updateCompanyStatus(UUID id, String status) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Logbook entry not found"));
        logbook.setCompanyStatus(LogbookStatus.valueOf(status));
        return mapToResponseDTO(logbookRepository.save(logbook));
    }

    @Override
    public LogbookResponseDTO updateLecturerStatus(UUID id, String status) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Logbook entry not found"));
        logbook.setLecturerStatus(LogbookStatus.valueOf(status));
        return mapToResponseDTO(logbookRepository.save(logbook));
    }

    @Override
    public void deleteLogbook(UUID id) {
        logbookRepository.deleteById(id);
    }

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
