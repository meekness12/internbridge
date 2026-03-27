package com.internbridge.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponseDTO {
    private UUID id;
    private UUID internshipId;
    private String internshipTitle;
    private String studentName;
    private String status;
    private String cvUrl;
    private String coverLetter;
    private LocalDateTime createdAt;
}
