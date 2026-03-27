package com.internbridge.backend.controller;
import com.internbridge.backend.dto.response.PlacementResponseDTO;
import com.internbridge.backend.service.PlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/placements")
@RequiredArgsConstructor
public class PlacementController {

    private final PlacementService placementService;

    @GetMapping("/{id}")
    public ResponseEntity<PlacementResponseDTO> getPlacementById(@PathVariable UUID id) {
        return ResponseEntity.ok(placementService.getPlacementById(id));
    }

    @GetMapping("/intern/{internId}")
    public ResponseEntity<List<PlacementResponseDTO>> getPlacementsByInternId(@PathVariable UUID internId) {
        return ResponseEntity.ok(placementService.getPlacementsByInternId(internId));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<PlacementResponseDTO>> getPlacementsByCompanyId(@PathVariable UUID companyId) {
        return ResponseEntity.ok(placementService.getPlacementsByCompanyId(companyId));
    }

    @GetMapping
    public ResponseEntity<List<PlacementResponseDTO>> getAllPlacements() {
        return ResponseEntity.ok(placementService.getAllPlacements());
    }
}
