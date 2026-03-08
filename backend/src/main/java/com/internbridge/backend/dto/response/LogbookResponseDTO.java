package com.internbridge.backend.dto.response;

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
public class LogbookResponseDTO {

    private UUID id;
    private UUID placementId;
    private LocalDate recordDate;
    private Double hoursWorked;
    private String tasksCompleted;
    private String companyStatus;
    private String lecturerStatus;
}
