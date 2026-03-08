package com.internbridge.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponseDTO {

    private UUID id;
    private UUID studentId;
    private String studentName;
    private UUID internshipId;
    private String internshipTitle;
    private String status;
    private LocalDateTime appliedAt;
}
