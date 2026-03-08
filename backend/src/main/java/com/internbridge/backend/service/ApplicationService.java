package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ApplicationService {

    ApplicationResponseDTO createApplication(ApplicationRequestDTO requestDTO);

    ApplicationResponseDTO getApplicationById(UUID id);

    List<ApplicationResponseDTO> getAllApplications();

    List<ApplicationResponseDTO> getApplicationsByStudentId(UUID studentUserId);

    List<ApplicationResponseDTO> getApplicationsByInternshipId(UUID internshipId);

    ApplicationResponseDTO updateApplicationStatus(UUID id, String status);

    void deleteApplication(UUID id);
}
