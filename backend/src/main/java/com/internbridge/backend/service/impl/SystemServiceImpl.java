package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.response.*;
import com.internbridge.backend.repository.CompanyAdminRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.SystemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SystemServiceImpl implements SystemService {

    private final UserRepository userRepository;
    private final CompanyAdminRepository companyAdminRepository;

    @Override
    @Transactional(readOnly = true)
    public PlatformStatsResponse getPlatformStats() {
        return PlatformStatsResponse.builder()
                .totalUsers(userRepository.count())
                .totalPartners(companyAdminRepository.count())
                .systemUptime("99.9% 14d 05h")
                .securityAlerts(0)
                .resourceUsage(42)
                .userTrend("+12% from last cycle")
                .partnerTrend("+2 new this week")
                .build();
    }

    @Override
    public AnalyticsResponse getAnalytics() {
        List<AnalyticsResponse.PlacementVelocity> velocity = new ArrayList<>();
        int[] rates = {45, 32, 58, 41, 62, 78, 55, 68, 82, 71, 94, 88};
        for (int i = 0; i < rates.length; i++) {
            velocity.add(new AnalyticsResponse.PlacementVelocity("M" + (i + 1), rates[i]));
        }

        List<AnalyticsResponse.SectorDistribution> sectors = new ArrayList<>();
        sectors.add(new AnalyticsResponse.SectorDistribution("Software & Engineering", 42, "var(--color-gold)"));
        sectors.add(new AnalyticsResponse.SectorDistribution("Design & Creative", 28, "#f8fafc"));
        sectors.add(new AnalyticsResponse.SectorDistribution("Finance & Business", 18, "rgba(255,255,255,0.4)"));
        sectors.add(new AnalyticsResponse.SectorDistribution("Others", 12, "rgba(255,255,255,0.1)"));

        List<AnalyticsResponse.NodeStatus> nodes = new ArrayList<>();
        nodes.add(new AnalyticsResponse.NodeStatus("Europe Cluster", "Frankfurt", "12ms", "Optimal"));
        nodes.add(new AnalyticsResponse.NodeStatus("West Africa", "Accra", "24ms", "Optimal"));
        nodes.add(new AnalyticsResponse.NodeStatus("US-East", "N. Virginia", "82ms", "Active"));

        return AnalyticsResponse.builder()
                .placementVelocity(velocity)
                .sectorDistribution(sectors)
                .nodeAwareness(nodes)
                .totalPlacements(4280)
                .placementTrend("↑ 18.2%")
                .certificationRate(94.2)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditLogResponse> getAuditLogs(int limit) {
        List<AuditLogResponse> logs = new ArrayList<>();
        // In a real scenario, we would have an AuditLog entity and repository
        // For now, we provide realistic mockup data from the backend
        logs.add(AuditLogResponse.builder()
                .id(UUID.randomUUID().toString())
                .userName("Admin_Sarah")
                .action("Identity Validation")
                .details("New Company: CloudSphere")
                .timestamp(LocalDateTime.now().minusMinutes(12).toString())
                .status("SUCCESS")
                .severity("INFO")
                .build());
        return logs;
    }

    @Override
    public List<InfrastructureMetricResponse> getInfrastructureMetrics() {
        List<InfrastructureMetricResponse> metrics = new ArrayList<>();
        metrics.add(InfrastructureMetricResponse.builder().timestamp("00h").cpuLoad(15).memoryUsage(20).build());
        metrics.add(InfrastructureMetricResponse.builder().timestamp("04h").cpuLoad(12).memoryUsage(18).build());
        metrics.add(InfrastructureMetricResponse.builder().timestamp("08h").cpuLoad(45).memoryUsage(30).build());
        metrics.add(InfrastructureMetricResponse.builder().timestamp("12h").cpuLoad(82).memoryUsage(12).build());
        metrics.add(InfrastructureMetricResponse.builder().timestamp("16h").cpuLoad(65).memoryUsage(25).build());
        metrics.add(InfrastructureMetricResponse.builder().timestamp("20h").cpuLoad(40).memoryUsage(20).build());
        metrics.add(InfrastructureMetricResponse.builder().timestamp("24h").cpuLoad(25).memoryUsage(15).build());
        return metrics;
    }

    @Override
    public List<SystemAlertResponse> getSystemAlerts() {
        List<SystemAlertResponse> alerts = new ArrayList<>();
        alerts.add(SystemAlertResponse.builder()
                .id(UUID.randomUUID().toString())
                .message("Incomplete Security Handshake")
                .severity("CRITICAL")
                .timestamp(LocalDateTime.now().minusMinutes(12).toString())
                .acknowledged(false)
                .build());
        return alerts;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompanyResponse> getCompanies() {
        List<CompanyResponse> companies = new ArrayList<>();
        // In a real scenario, map from CompanyAdmin entity or a dedicated Company entity
        companies.add(CompanyResponse.builder()
                .id(UUID.randomUUID().toString())
                .name("Techwave Technologies")
                .industry("Software Engineering")
                .location("Accra, Ghana")
                .status("VERIFIED")
                .interns(12)
                .rating("4.8")
                .logo("LW")
                .website("www.techwave.com")
                .build());
        companies.add(CompanyResponse.builder()
                .id(UUID.randomUUID().toString())
                .name("CloudSphere")
                .industry("Cloud Infrastructure")
                .location("Kumasi, Ghana")
                .status("PENDING")
                .interns(0)
                .rating("N/A")
                .logo("CS")
                .website("www.cloudsphere.com")
                .build());
        return companies;
    }
}
