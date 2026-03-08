package com.internbridge.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
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
public class InternshipRequestDTO {

    @NotNull(message = "Company ID is required")
    private UUID companyId;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private String requiredSkills;

    private String status; // "OPEN" or "CLOSED" — parsed in service

    private LocalDate deadline;
}
