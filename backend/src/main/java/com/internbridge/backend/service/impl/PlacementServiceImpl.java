package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.PlacementRequestDTO;
import com.internbridge.backend.dto.response.PlacementResponseDTO;
import com.internbridge.backend.entity.Application;
import com.internbridge.backend.entity.Placement;
import com.internbridge.backend.entity.PlacementStatus;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.ApplicationRepository;
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
    private final ApplicationRepository applicationRepository;

    @Override
    public PlacementResponseDTO createPlacement(PlacementRequestDTO requestDTO) {
        Application application = applicationRepository.findById(requestDTO.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", requestDTO.getApplicationId()));

        Placement placement = Placement.builder()
                .application(application)
                .startDate(requestDTO.getStartDate())
                .endDate(requestDTO.getEndDate())
                .build();

        Placement saved = placementRepository.save(placement);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PlacementResponseDTO getPlacementById(UUID id) {
        Placement placement = placementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement", "id", id));
        return mapToResponseDTO(placement);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementResponseDTO> getAllPlacements() {
        return placementRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PlacementResponseDTO updatePlacementStatus(UUID id, String status) {
        Placement placement = placementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement", "id", id));

        placement.setStatus(PlacementStatus.valueOf(status));
        Placement updated = placementRepository.save(placement);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deletePlacement(UUID id) {
        Placement placement = placementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement", "id", id));
        placementRepository.delete(placement);
    }

    private PlacementResponseDTO mapToResponseDTO(Placement placement) {
        Application application = placement.getApplication();
        return PlacementResponseDTO.builder()
                .id(placement.getId())
                .applicationId(application.getId())
                .studentName(application.getStudent().getFirstName() + " " + application.getStudent().getLastName())
                .internshipTitle(application.getInternship().getTitle())
                .companyName(application.getInternship().getCompany().getCompanyName())
                .startDate(placement.getStartDate())
                .endDate(placement.getEndDate())
                .status(placement.getStatus().name())
                .build();
    }
}
