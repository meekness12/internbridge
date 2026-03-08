package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.CompanyRequestDTO;
import com.internbridge.backend.dto.response.CompanyResponseDTO;
import com.internbridge.backend.entity.Company;
import com.internbridge.backend.entity.Role;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.CompanyRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ── CRUD Operations ─────────────────────────────────────────────────

    @Override
    public CompanyResponseDTO createCompany(CompanyRequestDTO requestDTO) {
        // 1. Create the base User entity
        User user = User.builder()
                .email(requestDTO.getEmail())
                .passwordHash(passwordEncoder.encode(requestDTO.getPassword()))
                .role(Role.COMPANY)
                .build();
        User savedUser = userRepository.save(user);

        // 2. Create the Company profile linked to the User
        Company company = Company.builder()
                .user(savedUser)
                .companyName(requestDTO.getCompanyName())
                .tinNumber(requestDTO.getTinNumber())
                .industry(requestDTO.getIndustry())
                .websiteUrl(requestDTO.getWebsiteUrl())
                .build();

        Company saved = companyRepository.save(company);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyResponseDTO getCompanyById(UUID userId) {
        Company company = companyRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", userId));
        return mapToResponseDTO(company);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompanyResponseDTO> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CompanyResponseDTO updateCompany(UUID userId, CompanyRequestDTO requestDTO) {
        Company company = companyRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", userId));

        // Update profile fields only (not User credentials)
        company.setCompanyName(requestDTO.getCompanyName());
        company.setTinNumber(requestDTO.getTinNumber());
        company.setIndustry(requestDTO.getIndustry());
        company.setWebsiteUrl(requestDTO.getWebsiteUrl());

        Company updated = companyRepository.save(company);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteCompany(UUID userId) {
        Company company = companyRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", userId));

        companyRepository.delete(company);
        userRepository.deleteById(userId);
    }

    // ── Mapper ──────────────────────────────────────────────────────────

    private CompanyResponseDTO mapToResponseDTO(Company company) {
        return CompanyResponseDTO.builder()
                .userId(company.getUserId())
                .email(company.getUser().getEmail())
                .companyName(company.getCompanyName())
                .tinNumber(company.getTinNumber())
                .industry(company.getIndustry())
                .websiteUrl(company.getWebsiteUrl())
                .build();
    }
}
