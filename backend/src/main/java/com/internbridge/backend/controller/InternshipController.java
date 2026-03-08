package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.InternshipRequestDTO;
import com.internbridge.backend.dto.response.InternshipResponseDTO;
import com.internbridge.backend.service.InternshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
public class InternshipController {

    private final InternshipService internshipService;

    @PostMapping
    public ResponseEntity<InternshipResponseDTO> createInternship(
            @Valid @RequestBody InternshipRequestDTO requestDTO) {
        InternshipResponseDTO response = internshipService.createInternship(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipResponseDTO> getInternshipById(@PathVariable UUID id) {
        return ResponseEntity.ok(internshipService.getInternshipById(id));
    }

    @GetMapping
    public ResponseEntity<List<InternshipResponseDTO>> getAllInternships() {
        return ResponseEntity.ok(internshipService.getAllInternships());
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<InternshipResponseDTO>> getInternshipsByCompanyId(
            @PathVariable UUID companyId) {
        return ResponseEntity.ok(internshipService.getInternshipsByCompanyId(companyId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipResponseDTO> updateInternship(
            @PathVariable UUID id,
            @Valid @RequestBody InternshipRequestDTO requestDTO) {
        return ResponseEntity.ok(internshipService.updateInternship(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable UUID id) {
        internshipService.deleteInternship(id);
        return ResponseEntity.noContent().build();
    }
}
