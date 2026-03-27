package com.internbridge.backend.service;

import com.internbridge.backend.dto.response.PlacementResponseDTO;
import java.util.List;
import java.util.UUID;

public interface PlacementService {
    PlacementResponseDTO getPlacementById(UUID id);
    List<PlacementResponseDTO> getPlacementsByInternId(UUID internId);
    List<PlacementResponseDTO> getPlacementsByCompanyId(UUID companyAdminId);
    List<PlacementResponseDTO> getAllPlacements();
}
