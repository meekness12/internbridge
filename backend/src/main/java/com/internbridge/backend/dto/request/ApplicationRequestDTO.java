package com.internbridge.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequestDTO {
    private UUID internshipId;
    private UUID studentId;
    private String cvUrl;
    private String coverLetter;
}
