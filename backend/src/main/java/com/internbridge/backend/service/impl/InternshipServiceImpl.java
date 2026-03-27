package com.internbridge.backend.service.impl;
import com.internbridge.backend.dto.request.InternshipRequestDTO;
import com.internbridge.backend.dto.response.InternshipResponseDTO;
import com.internbridge.backend.entity.CompanyAdmin;
import com.internbridge.backend.entity.Internship;
import com.internbridge.backend.entity.InternshipStatus;
import com.internbridge.backend.repository.CompanyAdminRepository;
import com.internbridge.backend.repository.InternshipRepository;
import com.internbridge.backend.service.InternshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InternshipServiceImpl implements InternshipService {

    private final InternshipRepository internshipRepository;
    private final CompanyAdminRepository companyAdminRepository;

    @Override
    public InternshipResponseDTO createInternship(InternshipRequestDTO requestDTO) {
        CompanyAdmin companyAdmin = companyAdminRepository.findById(requestDTO.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company Admin not found"));

        Internship internship = Internship.builder()
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .requiredSkills(requestDTO.getRequiredSkills())
                .deadline(requestDTO.getDeadline())
                .companyAdmin(companyAdmin)
                .status(InternshipStatus.OPEN)
                .build();

        Internship savedInternship = internshipRepository.save(internship);
        return mapToResponseDTO(savedInternship);
    }

    @Override
    @Transactional(readOnly = true)
    public InternshipResponseDTO getInternshipById(UUID id) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
        return mapToResponseDTO(internship);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InternshipResponseDTO> getAllInternships() {
        return internshipRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InternshipResponseDTO> getInternshipsByCompanyId(UUID companyAdminId) {
        return internshipRepository.findByCompanyAdminId(companyAdminId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InternshipResponseDTO updateInternship(UUID id, InternshipRequestDTO requestDTO) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        internship.setTitle(requestDTO.getTitle());
        internship.setDescription(requestDTO.getDescription());
        internship.setRequiredSkills(requestDTO.getRequiredSkills());
        internship.setDeadline(requestDTO.getDeadline());

        Internship updatedInternship = internshipRepository.save(internship);
        return mapToResponseDTO(updatedInternship);
    }

    @Override
    public void deleteInternship(UUID id) {
        internshipRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InternshipResponseDTO> searchInternships(String keyword, String status) {
        InternshipStatus internshipStatus = status != null ? InternshipStatus.valueOf(status) : null;
        return internshipRepository.searchByKeywordAndStatus(keyword, internshipStatus).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private InternshipResponseDTO mapToResponseDTO(Internship internship) {
        return InternshipResponseDTO.builder()
                .id(internship.getId())
                .title(internship.getTitle())
                .description(internship.getDescription())
                .requiredSkills(internship.getRequiredSkills())
                .deadline(internship.getDeadline())
                .status(internship.getStatus() != null ? internship.getStatus().name() : "UNKNOWN")
                .companyName(internship.getCompanyAdmin() != null ? 
                        internship.getCompanyAdmin().getCompanyName() : "Unknown Company")
                .build();
    }
}
