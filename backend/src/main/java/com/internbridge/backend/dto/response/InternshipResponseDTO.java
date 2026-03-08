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
public class InternshipResponseDTO {

    private UUID id;
    private UUID companyId;
    private String companyName;
    private String title;
    private String description;
    private String requiredSkills;
    private String status;
    private LocalDate deadline;
}
