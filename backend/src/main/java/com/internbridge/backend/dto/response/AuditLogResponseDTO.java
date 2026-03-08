package com.internbridge.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLogResponseDTO {

    private UUID id;
    private UUID userId;
    private String userEmail;
    private String action;
    private String entityName;
    private UUID entityId;
    private LocalDateTime timestamp;
}
