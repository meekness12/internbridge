package com.internbridge.backend.dto.response;

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
public class PlacementResponseDTO {
    private UUID id;
    private UUID applicationId;
    private String studentName;
    private String internshipTitle;
    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
