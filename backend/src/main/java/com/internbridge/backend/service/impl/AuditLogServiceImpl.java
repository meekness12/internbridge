package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.AuditLogRequestDTO;
import com.internbridge.backend.dto.response.AuditLogResponseDTO;
import com.internbridge.backend.entity.AuditLog;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.AuditLogRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;

    @Override
    public AuditLogResponseDTO createAuditLog(AuditLogRequestDTO requestDTO) {
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", requestDTO.getUserId()));

        AuditLog auditLog = AuditLog.builder()
                .user(user)
                .action(requestDTO.getAction())
                .entityName(requestDTO.getEntityName())
                .entityId(requestDTO.getEntityId())
                .build();

        AuditLog saved = auditLogRepository.save(auditLog);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public AuditLogResponseDTO getAuditLogById(UUID id) {
        AuditLog auditLog = auditLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AuditLog", "id", id));
        return mapToResponseDTO(auditLog);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getAllAuditLogs() {
        return auditLogRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getAuditLogsByUserId(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User", "id", userId);
        }
        return auditLogRepository.findByUserIdOrderByTimestampDesc(userId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private AuditLogResponseDTO mapToResponseDTO(AuditLog auditLog) {
        return AuditLogResponseDTO.builder()
                .id(auditLog.getId())
                .userId(auditLog.getUser().getId())
                .userEmail(auditLog.getUser().getEmail())
                .action(auditLog.getAction())
                .entityName(auditLog.getEntityName())
                .entityId(auditLog.getEntityId())
                .timestamp(auditLog.getTimestamp())
                .build();
    }
}
