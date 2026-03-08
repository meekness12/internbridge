package com.internbridge.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLogRequestDTO {

    @NotNull(message = "User ID is required")
    private UUID userId;

    @NotBlank(message = "Action is required")
    private String action;

    @NotBlank(message = "Entity name is required")
    private String entityName;

    private UUID entityId;
}
