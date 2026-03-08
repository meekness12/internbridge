package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.PlacementRequestDTO;
import com.internbridge.backend.dto.response.PlacementResponseDTO;

import java.util.List;
import java.util.UUID;

public interface PlacementService {

    PlacementResponseDTO createPlacement(PlacementRequestDTO requestDTO);

    PlacementResponseDTO getPlacementById(UUID id);

    List<PlacementResponseDTO> getAllPlacements();

    PlacementResponseDTO updatePlacementStatus(UUID id, String status);

    void deletePlacement(UUID id);
}
