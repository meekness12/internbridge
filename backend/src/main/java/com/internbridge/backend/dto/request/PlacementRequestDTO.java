package com.internbridge.backend.dto.request;

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
public class PlacementRequestDTO {
    private UUID applicationId;
    private LocalDate startDate;
    private LocalDate endDate;
}
