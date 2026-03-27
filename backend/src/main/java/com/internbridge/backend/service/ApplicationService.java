package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;
import java.util.List;
import java.util.UUID;

public interface ApplicationService {
    ApplicationResponseDTO applyForInternship(ApplicationRequestDTO requestDTO);
    ApplicationResponseDTO getApplicationById(UUID id);
    List<ApplicationResponseDTO> getApplicationsByInternshipId(UUID internshipId);
    List<ApplicationResponseDTO> getApplicationsByInternId(UUID internId);
    ApplicationResponseDTO updateApplicationStatus(UUID id, String status);
}
