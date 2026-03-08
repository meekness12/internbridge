package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.CompanyRequestDTO;
import com.internbridge.backend.dto.response.CompanyResponseDTO;

import java.util.List;
import java.util.UUID;

public interface CompanyService {

    CompanyResponseDTO createCompany(CompanyRequestDTO requestDTO);

    CompanyResponseDTO getCompanyById(UUID userId);

    List<CompanyResponseDTO> getAllCompanies();

    CompanyResponseDTO updateCompany(UUID userId, CompanyRequestDTO requestDTO);

    void deleteCompany(UUID userId);
}
