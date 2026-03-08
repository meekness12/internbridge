package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;
import com.internbridge.backend.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationResponseDTO> createApplication(
            @Valid @RequestBody ApplicationRequestDTO requestDTO) {
        ApplicationResponseDTO response = applicationService.createApplication(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponseDTO> getApplicationById(@PathVariable UUID id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    @GetMapping
    public ResponseEntity<List<ApplicationResponseDTO>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByStudentId(
            @PathVariable UUID studentId) {
        return ResponseEntity.ok(applicationService.getApplicationsByStudentId(studentId));
    }

    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByInternshipId(
            @PathVariable UUID internshipId) {
        return ResponseEntity.ok(applicationService.getApplicationsByInternshipId(internshipId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponseDTO> updateApplicationStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable UUID id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
