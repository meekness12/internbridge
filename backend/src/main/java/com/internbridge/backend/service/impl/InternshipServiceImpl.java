package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.InternshipRequestDTO;
import com.internbridge.backend.dto.response.InternshipResponseDTO;
import com.internbridge.backend.entity.Company;
import com.internbridge.backend.entity.Internship;
import com.internbridge.backend.entity.InternshipStatus;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.CompanyRepository;
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
    private final CompanyRepository companyRepository;

    @Override
    public InternshipResponseDTO createInternship(InternshipRequestDTO requestDTO) {
        Company company = companyRepository.findById(requestDTO.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", requestDTO.getCompanyId()));

        Internship internship = Internship.builder()
                .company(company)
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .requiredSkills(requestDTO.getRequiredSkills())
                .deadline(requestDTO.getDeadline())
                .build();

        if (requestDTO.getStatus() != null) {
            internship.setStatus(InternshipStatus.valueOf(requestDTO.getStatus()));
        }

        Internship saved = internshipRepository.save(internship);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public InternshipResponseDTO getInternshipById(UUID id) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship", "id", id));
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
    public List<InternshipResponseDTO> getInternshipsByCompanyId(UUID companyUserId) {
        if (!companyRepository.existsById(companyUserId)) {
            throw new ResourceNotFoundException("Company", "userId", companyUserId);
        }
        return internshipRepository.findByCompanyUserId(companyUserId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InternshipResponseDTO> searchInternships(String keyword, String status) {
        InternshipStatus parsedStatus = null;
        if (status != null && !status.isBlank()) {
            parsedStatus = InternshipStatus.valueOf(status);
        }
        String parsedKeyword = (keyword != null && !keyword.isBlank()) ? keyword : null;

        return internshipRepository.searchByKeywordAndStatus(parsedKeyword, parsedStatus).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InternshipResponseDTO updateInternship(UUID id, InternshipRequestDTO requestDTO) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship", "id", id));

        Company company = companyRepository.findById(requestDTO.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", requestDTO.getCompanyId()));

        internship.setCompany(company);
        internship.setTitle(requestDTO.getTitle());
        internship.setDescription(requestDTO.getDescription());
        internship.setRequiredSkills(requestDTO.getRequiredSkills());
        internship.setDeadline(requestDTO.getDeadline());

        if (requestDTO.getStatus() != null) {
            internship.setStatus(InternshipStatus.valueOf(requestDTO.getStatus()));
        }

        Internship updated = internshipRepository.save(internship);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteInternship(UUID id) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship", "id", id));
        internshipRepository.delete(internship);
    }

    private InternshipResponseDTO mapToResponseDTO(Internship internship) {
        return InternshipResponseDTO.builder()
                .id(internship.getId())
                .companyId(internship.getCompany().getUserId())
                .companyName(internship.getCompany().getCompanyName())
                .title(internship.getTitle())
                .description(internship.getDescription())
                .requiredSkills(internship.getRequiredSkills())
                .status(internship.getStatus().name())
                .deadline(internship.getDeadline())
                .build();
    }
}
