package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.PlacementRequestDTO;
import com.internbridge.backend.dto.response.PlacementResponseDTO;
import com.internbridge.backend.service.PlacementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/placements")
@RequiredArgsConstructor
public class PlacementController {

    private final PlacementService placementService;

    @PostMapping
    public ResponseEntity<PlacementResponseDTO> createPlacement(
            @Valid @RequestBody PlacementRequestDTO requestDTO) {
        PlacementResponseDTO response = placementService.createPlacement(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlacementResponseDTO> getPlacementById(@PathVariable UUID id) {
        return ResponseEntity.ok(placementService.getPlacementById(id));
    }

    @GetMapping
    public ResponseEntity<List<PlacementResponseDTO>> getAllPlacements() {
        return ResponseEntity.ok(placementService.getAllPlacements());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PlacementResponseDTO> updatePlacementStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(placementService.updatePlacementStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlacement(@PathVariable UUID id) {
        placementService.deletePlacement(id);
        return ResponseEntity.noContent().build();
    }
}
