package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.CompanyRequestDTO;
import com.internbridge.backend.dto.response.CompanyResponseDTO;
import com.internbridge.backend.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyResponseDTO> createCompany(
            @Valid @RequestBody CompanyRequestDTO requestDTO) {
        CompanyResponseDTO response = companyService.createCompany(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CompanyResponseDTO> getCompanyById(@PathVariable UUID userId) {
        CompanyResponseDTO response = companyService.getCompanyById(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<CompanyResponseDTO>> getAllCompanies() {
        List<CompanyResponseDTO> response = companyService.getAllCompanies();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<CompanyResponseDTO> updateCompany(
            @PathVariable UUID userId,
            @Valid @RequestBody CompanyRequestDTO requestDTO) {
        CompanyResponseDTO response = companyService.updateCompany(userId, requestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteCompany(@PathVariable UUID userId) {
        companyService.deleteCompany(userId);
        return ResponseEntity.noContent().build();
    }
}
