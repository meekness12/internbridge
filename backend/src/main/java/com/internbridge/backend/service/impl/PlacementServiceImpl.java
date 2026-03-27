package com.internbridge.backend.service.impl;
import com.internbridge.backend.dto.response.PlacementResponseDTO;
import com.internbridge.backend.entity.Placement;
import com.internbridge.backend.repository.PlacementRepository;
import com.internbridge.backend.service.PlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PlacementServiceImpl implements PlacementService {

    private final PlacementRepository placementRepository;

    @Override
    @Transactional(readOnly = true)
    public PlacementResponseDTO getPlacementById(UUID id) {
        Placement placement = placementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement not found"));
        return mapToResponseDTO(placement);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementResponseDTO> getPlacementsByInternId(UUID internId) {
        // Assume repository has this method (we will check/add it)
        return placementRepository.findByApplicationInternId(internId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementResponseDTO> getPlacementsByCompanyId(UUID companyAdminId) {
        // Assume repository has this method
        return placementRepository.findByApplicationInternshipCompanyAdminId(companyAdminId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementResponseDTO> getAllPlacements() {
        return placementRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private PlacementResponseDTO mapToResponseDTO(Placement placement) {
        String studentName = "Unknown Student";
        String internshipTitle = "Unknown Title";
        String companyName = "Unknown Company";
        UUID applicationId = null;

        if (placement.getApplication() != null) {
            applicationId = placement.getApplication().getId();
            if (placement.getApplication().getIntern() != null) {
                studentName = (placement.getApplication().getIntern().getFirstName() != null ? placement.getApplication().getIntern().getFirstName() : "") + " " + 
                             (placement.getApplication().getIntern().getLastName() != null ? placement.getApplication().getIntern().getLastName() : "");
            }
            if (placement.getApplication().getInternship() != null) {
                internshipTitle = placement.getApplication().getInternship().getTitle();
                if (placement.getApplication().getInternship().getCompanyAdmin() != null) {
                    companyName = placement.getApplication().getInternship().getCompanyAdmin().getCompanyName();
                }
            }
        }

        return PlacementResponseDTO.builder()
                .id(placement.getId())
                .applicationId(applicationId)
                .studentName(studentName.trim().isEmpty() ? "Unnamed Intern" : studentName.trim())
                .internshipTitle(internshipTitle)
                .companyName(companyName)
                .startDate(placement.getStartDate())
                .endDate(placement.getEndDate())
                .status(placement.getStatus() != null ? placement.getStatus().name() : "PENDING")
                .build();
    }
}
