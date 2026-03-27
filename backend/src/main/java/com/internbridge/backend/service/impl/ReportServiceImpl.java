package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.CreateReportRequest;
import com.internbridge.backend.dto.response.ReportResponse;
import com.internbridge.backend.entity.Report;
import com.internbridge.backend.entity.ReportStatus;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.repository.ReportRepository;
import com.internbridge.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy");

    @Override
    public List<ReportResponse> getAllReports() {
        return reportRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReportResponse generateReport(CreateReportRequest request, User generatedBy) {
        // Pseudo-generation logic: Immediate creation of a "READY" report record
        Report report = Report.builder()
                .title(request.getTitle())
                .type(request.getType())
                .status(ReportStatus.READY)
                .fileUrl("#") // Placeholder for actual storage bucket link
                .fileSize("2.4MB") // Simulated size
                .fileFormat("PDF") // Default format
                .generatedBy(generatedBy)
                .build();

        Report savedReport = reportRepository.save(report);
        return mapToResponse(savedReport);
    }

    @Override
    @Transactional
    public void deleteReport(UUID id) {
        reportRepository.deleteById(id);
    }

    private ReportResponse mapToResponse(Report report) {
        return ReportResponse.builder()
                .id(report.getId().toString())
                .title(report.getTitle())
                .type(report.getType())
                .status(report.getStatus())
                .date(report.getCreatedAt() != null ? report.getCreatedAt().format(DATE_FORMATTER) : "Just now")
                .size(report.getFileSize())
                .format(report.getFileFormat())
                .generatedBy(report.getGeneratedBy() != null ? 
                        report.getGeneratedBy().getFirstName() + " " + report.getGeneratedBy().getLastName() : "System")
                .createdAt(report.getCreatedAt())
                .build();
    }
}
