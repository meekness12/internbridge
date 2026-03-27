package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.CreateReportRequest;
import com.internbridge.backend.dto.response.ReportResponse;
import com.internbridge.backend.entity.User;

import java.util.List;
import java.util.UUID;

public interface ReportService {
    List<ReportResponse> getAllReports();
    ReportResponse generateReport(CreateReportRequest request, User generatedBy);
    void deleteReport(UUID id);
}
