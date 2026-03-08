package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.AuditLogRequestDTO;
import com.internbridge.backend.dto.response.AuditLogResponseDTO;
import com.internbridge.backend.service.AuditLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditLogService;

    @PostMapping
    public ResponseEntity<AuditLogResponseDTO> createAuditLog(
            @Valid @RequestBody AuditLogRequestDTO requestDTO) {
        AuditLogResponseDTO response = auditLogService.createAuditLog(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditLogResponseDTO> getAuditLogById(@PathVariable UUID id) {
        return ResponseEntity.ok(auditLogService.getAuditLogById(id));
    }

    @GetMapping
    public ResponseEntity<List<AuditLogResponseDTO>> getAllAuditLogs() {
        return ResponseEntity.ok(auditLogService.getAllAuditLogs());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AuditLogResponseDTO>> getAuditLogsByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(auditLogService.getAuditLogsByUserId(userId));
    }
}
