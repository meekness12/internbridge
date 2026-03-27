package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.LogbookRequestDTO;
import com.internbridge.backend.dto.response.LogbookResponseDTO;
import java.util.List;
import java.util.UUID;

public interface LogbookService {
    LogbookResponseDTO createLogbook(LogbookRequestDTO requestDTO);
    LogbookResponseDTO getLogbookById(UUID id);
    List<LogbookResponseDTO> getLogbooksByPlacementId(UUID placementId);
    LogbookResponseDTO updateLogbook(UUID id, LogbookRequestDTO requestDTO);
    LogbookResponseDTO updateCompanyStatus(UUID id, String status);
    LogbookResponseDTO updateLecturerStatus(UUID id, String status);
    void deleteLogbook(UUID id);
}
