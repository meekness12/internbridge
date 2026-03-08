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
