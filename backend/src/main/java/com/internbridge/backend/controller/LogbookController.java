package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.LogbookRequestDTO;
import com.internbridge.backend.dto.response.LogbookResponseDTO;
import com.internbridge.backend.service.LogbookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/logbooks")
@RequiredArgsConstructor
public class LogbookController {

    private final LogbookService logbookService;

    @PostMapping
    public ResponseEntity<LogbookResponseDTO> createLogbook(
            @Valid @RequestBody LogbookRequestDTO requestDTO) {
        LogbookResponseDTO response = logbookService.createLogbook(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogbookResponseDTO> getLogbookById(@PathVariable UUID id) {
        return ResponseEntity.ok(logbookService.getLogbookById(id));
    }

    @GetMapping("/placement/{placementId}")
    public ResponseEntity<List<LogbookResponseDTO>> getLogbooksByPlacementId(
            @PathVariable UUID placementId) {
        return ResponseEntity.ok(logbookService.getLogbooksByPlacementId(placementId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LogbookResponseDTO> updateLogbook(
            @PathVariable UUID id,
            @Valid @RequestBody LogbookRequestDTO requestDTO) {
        return ResponseEntity.ok(logbookService.updateLogbook(id, requestDTO));
    }

    @PatchMapping("/{id}/company-status")
    public ResponseEntity<LogbookResponseDTO> updateCompanyStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(logbookService.updateCompanyStatus(id, status));
    }

    @PatchMapping("/{id}/lecturer-status")
    public ResponseEntity<LogbookResponseDTO> updateLecturerStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(logbookService.updateLecturerStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogbook(@PathVariable UUID id) {
        logbookService.deleteLogbook(id);
        return ResponseEntity.noContent().build();
    }
}
