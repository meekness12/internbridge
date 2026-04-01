package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;
import com.internbridge.backend.service.ApplicationService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.OPTIONS}, allowCredentials = "true")
public class ApplicationController {

    private final ApplicationService applicationService;

    @PersistenceContext
    private EntityManager entityManager;

    @PostMapping
    public ResponseEntity<ApplicationResponseDTO> applyForInternship(@Valid @RequestBody ApplicationRequestDTO requestDTO) {
        return ResponseEntity.ok(applicationService.applyForInternship(requestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponseDTO> getApplicationById(@PathVariable UUID id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByInternshipId(@PathVariable UUID internshipId) {
        return ResponseEntity.ok(applicationService.getApplicationsByInternshipId(internshipId));
    }

    @GetMapping("/intern/{internId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByInternId(@PathVariable UUID internId) {
        return ResponseEntity.ok(applicationService.getApplicationsByInternId(internId));
    }

    @RequestMapping(value = "/{id}/status", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.GET})
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        try {
            return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", e.getMessage() != null ? e.getMessage() : "Unknown error",
                "type", e.getClass().getName()
            ));
        }
    }

    /**
     * TEMPORARY: Repair database constraints for applications and placements.
     * Visit: http://localhost:8080/api/applications/system/repair-db
     */
    @GetMapping("/system/repair-db")
    @Transactional
    public ResponseEntity<String> repairDatabase() {
        StringBuilder result = new StringBuilder();
        try {
            // Applications table
            entityManager.createNativeQuery("ALTER TABLE applications ALTER COLUMN cover_letter DROP NOT NULL").executeUpdate();
            result.append("✓ applications.cover_letter: NOT NULL dropped\n");
        } catch (Exception e) { result.append("○ applications.cover_letter: ").append(e.getMessage()).append("\n"); }

        try {
            entityManager.createNativeQuery("ALTER TABLE applications ALTER COLUMN cv_url DROP NOT NULL").executeUpdate();
            result.append("✓ applications.cv_url: NOT NULL dropped\n");
        } catch (Exception e) { result.append("○ applications.cv_url: ").append(e.getMessage()).append("\n"); }

        try {
            entityManager.createNativeQuery("ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check").executeUpdate();
            result.append("✓ applications_status_check: constraint dropped\n");
        } catch (Exception e) { result.append("○ applications_status_check: ").append(e.getMessage()).append("\n"); }

        // Placements table
        try {
            entityManager.createNativeQuery("ALTER TABLE placements DROP CONSTRAINT IF EXISTS placements_status_check").executeUpdate();
            result.append("✓ placements_status_check: constraint dropped\n");
        } catch (Exception e) { result.append("○ placements_status_check: ").append(e.getMessage()).append("\n"); }

        // Contracts table
        try {
            entityManager.createNativeQuery("ALTER TABLE contracts DROP CONSTRAINT IF EXISTS contracts_status_check").executeUpdate();
            result.append("✓ contracts_status_check: constraint dropped\n");
        } catch (Exception e) { result.append("○ contracts_status_check: ").append(e.getMessage()).append("\n"); }

        // Logbooks table
        try {
            entityManager.createNativeQuery("ALTER TABLE logbooks DROP CONSTRAINT IF EXISTS logbooks_company_status_check").executeUpdate();
            result.append("✓ logbooks_company_status_check: constraint dropped\n");
        } catch (Exception e) { result.append("○ logbooks_company_status_check: ").append(e.getMessage()).append("\n"); }

        try {
            entityManager.createNativeQuery("ALTER TABLE logbooks DROP CONSTRAINT IF EXISTS logbooks_lecturer_status_check").executeUpdate();
            result.append("✓ logbooks_lecturer_status_check: constraint dropped\n");
        } catch (Exception e) { result.append("○ logbooks_lecturer_status_check: ").append(e.getMessage()).append("\n"); }

        return ResponseEntity.ok("DATABASE REPAIR COMPLETE:\n\n" + result);
    }
}
