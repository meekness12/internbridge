package com.internbridge.backend.dto.request;

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
public class InternshipRequestDTO {
    private String title;
    private String description;
    private String requiredSkills;
    private LocalDate deadline;
    private UUID companyId;
    private String location;
    private String stipend;
    private String duration;
    private InternshipType type;
}
