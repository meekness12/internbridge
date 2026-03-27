package com.internbridge.backend.service;

import com.internbridge.backend.dto.response.PlatformStatsResponse;
import com.internbridge.backend.dto.response.AuditLogResponse;
import com.internbridge.backend.dto.response.InfrastructureMetricResponse;
import com.internbridge.backend.dto.response.SystemAlertResponse;
import com.internbridge.backend.dto.response.CompanyResponse;
import com.internbridge.backend.dto.response.AnalyticsResponse;
import java.util.List;

public interface SystemService {
    PlatformStatsResponse getPlatformStats();
    AnalyticsResponse getAnalytics();
    List<AuditLogResponse> getAuditLogs(int limit);
    List<InfrastructureMetricResponse> getInfrastructureMetrics();
    List<SystemAlertResponse> getSystemAlerts();
    List<CompanyResponse> getCompanies();
}
