package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.InternshipRequestDTO;
import com.internbridge.backend.dto.response.InternshipResponseDTO;

import java.util.List;
import java.util.UUID;

public interface InternshipService {

    InternshipResponseDTO createInternship(InternshipRequestDTO requestDTO);

    InternshipResponseDTO getInternshipById(UUID id);

    List<InternshipResponseDTO> getAllInternships();

    List<InternshipResponseDTO> getInternshipsByCompanyId(UUID companyUserId);

    InternshipResponseDTO updateInternship(UUID id, InternshipRequestDTO requestDTO);

    void deleteInternship(UUID id);

    List<InternshipResponseDTO> searchInternships(String keyword, String status);
}
