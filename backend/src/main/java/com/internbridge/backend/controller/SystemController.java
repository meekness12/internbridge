package com.internbridge.backend.controller;

import com.internbridge.backend.dto.response.*;
import com.internbridge.backend.service.SystemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/system")
@RequiredArgsConstructor
public class SystemController {

    private final SystemService systemService;

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("System Oversight Reachable - Pulse Check Success");
    }

    @GetMapping("/stats")
    public ResponseEntity<PlatformStatsResponse> getStats() {
        return ResponseEntity.ok(systemService.getPlatformStats());
    }

    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics() {
        return ResponseEntity.ok(systemService.getAnalytics());
    }

    @GetMapping("/audit")
    public ResponseEntity<List<AuditLogResponse>> getAuditLogs(@RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(systemService.getAuditLogs(limit));
    }

    @GetMapping("/infrastructure")
    public ResponseEntity<List<InfrastructureMetricResponse>> getInfrastructureMetrics() {
        return ResponseEntity.ok(systemService.getInfrastructureMetrics());
    }

    @GetMapping("/alerts")
    public ResponseEntity<List<SystemAlertResponse>> getSystemAlerts() {
        return ResponseEntity.ok(systemService.getSystemAlerts());
    }

    @GetMapping("/companies")
    public ResponseEntity<List<CompanyResponse>> getCompanies() {
        return ResponseEntity.ok(systemService.getCompanies());
    }
}
