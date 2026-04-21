package com.internbridge.backend.dto.response;

import com.internbridge.backend.entity.InternshipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InternshipResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private String requiredSkills;
    private String status;
    private LocalDate deadline;
    private String companyName;
    private String location;
    private String stipend;
    private String duration;
    private InternshipType type;
}
