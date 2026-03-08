package com.internbridge.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogbookRequestDTO {

    @NotNull(message = "Placement ID is required")
    private UUID placementId;

    @NotNull(message = "Record date is required")
    private LocalDate recordDate;

    @NotNull(message = "Hours worked is required")
    private Double hoursWorked;

    private String tasksCompleted;
}
