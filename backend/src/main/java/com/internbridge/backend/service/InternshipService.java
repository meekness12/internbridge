package com.internbridge.backend.service;

/* 
 * SCRUBBED: Service contract for Internship.
 * Depends on deleted Company entity.
 */
import com.internbridge.backend.dto.request.InternshipRequestDTO;
import com.internbridge.backend.dto.response.InternshipResponseDTO;
import java.util.List;
import java.util.UUID;

public interface InternshipService {
    InternshipResponseDTO createInternship(InternshipRequestDTO requestDTO);
    InternshipResponseDTO getInternshipById(UUID id);
    List<InternshipResponseDTO> getAllInternships();
    List<InternshipResponseDTO> getInternshipsByCompanyId(UUID companyAdminId);
    InternshipResponseDTO updateInternship(UUID id, InternshipRequestDTO requestDTO);
    void deleteInternship(UUID id);
    List<InternshipResponseDTO> searchInternships(String keyword, String status);
}
