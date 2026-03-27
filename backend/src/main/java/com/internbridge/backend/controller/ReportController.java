package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.CreateReportRequest;
import com.internbridge.backend.dto.response.ReportResponse;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<List<ReportResponse>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @PostMapping("/generate")
    public ResponseEntity<ReportResponse> generateReport(
            @RequestBody CreateReportRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(reportService.generateReport(request, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable UUID id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
