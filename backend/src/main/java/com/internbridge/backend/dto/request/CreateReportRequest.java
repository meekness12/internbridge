package com.internbridge.backend.dto.request;

import com.internbridge.backend.entity.ReportType;
import lombok.Data;

@Data
public class CreateReportRequest {
    private String title;
    private ReportType type;
}
