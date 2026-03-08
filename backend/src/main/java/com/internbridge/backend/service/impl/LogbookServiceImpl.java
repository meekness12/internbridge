package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.LogbookRequestDTO;
import com.internbridge.backend.dto.response.LogbookResponseDTO;
import com.internbridge.backend.entity.Logbook;
import com.internbridge.backend.entity.LogbookStatus;
import com.internbridge.backend.entity.Placement;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.LogbookRepository;
import com.internbridge.backend.repository.PlacementRepository;
import com.internbridge.backend.service.LogbookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LogbookServiceImpl implements LogbookService {

    private final LogbookRepository logbookRepository;
    private final PlacementRepository placementRepository;

    @Override
    public LogbookResponseDTO createLogbook(LogbookRequestDTO requestDTO) {
        Placement placement = placementRepository.findById(requestDTO.getPlacementId())
                .orElseThrow(() -> new ResourceNotFoundException("Placement", "id", requestDTO.getPlacementId()));

        Logbook logbook = Logbook.builder()
                .placement(placement)
                .recordDate(requestDTO.getRecordDate())
                .hoursWorked(requestDTO.getHoursWorked())
                .tasksCompleted(requestDTO.getTasksCompleted())
                .build();

        Logbook saved = logbookRepository.save(logbook);
        return mapToResponseDTO(saved);
    }

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

    @Override
    public LogbookResponseDTO updateLogbook(UUID id, LogbookRequestDTO requestDTO) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));

        Placement placement = placementRepository.findById(requestDTO.getPlacementId())
                .orElseThrow(() -> new ResourceNotFoundException("Placement", "id", requestDTO.getPlacementId()));

        logbook.setPlacement(placement);
        logbook.setRecordDate(requestDTO.getRecordDate());
        logbook.setHoursWorked(requestDTO.getHoursWorked());
        logbook.setTasksCompleted(requestDTO.getTasksCompleted());

        Logbook updated = logbookRepository.save(logbook);
        return mapToResponseDTO(updated);
    }

    @Override
    public LogbookResponseDTO updateCompanyStatus(UUID id, String status) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));

        logbook.setCompanyStatus(LogbookStatus.valueOf(status));
        Logbook updated = logbookRepository.save(logbook);
        return mapToResponseDTO(updated);
    }

    @Override
    public LogbookResponseDTO updateLecturerStatus(UUID id, String status) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));

        logbook.setLecturerStatus(LogbookStatus.valueOf(status));
        Logbook updated = logbookRepository.save(logbook);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteLogbook(UUID id) {
        Logbook logbook = logbookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Logbook", "id", id));
        logbookRepository.delete(logbook);
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
