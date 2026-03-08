package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.AuditLogRequestDTO;
import com.internbridge.backend.dto.response.AuditLogResponseDTO;

import java.util.List;
import java.util.UUID;

public interface AuditLogService {

    AuditLogResponseDTO createAuditLog(AuditLogRequestDTO requestDTO);

    AuditLogResponseDTO getAuditLogById(UUID id);

    List<AuditLogResponseDTO> getAllAuditLogs();

    List<AuditLogResponseDTO> getAuditLogsByUserId(UUID userId);
}
