package com.internbridge.backend.dto.response;

import com.internbridge.backend.entity.ReportType;
import com.internbridge.backend.entity.ReportStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReportResponse {
    private String id;
    private String title;
    private ReportType type;
    private ReportStatus status;
    private String date;
    private String size;
    private String format;
    private String generatedBy;
    private LocalDateTime createdAt;
}
