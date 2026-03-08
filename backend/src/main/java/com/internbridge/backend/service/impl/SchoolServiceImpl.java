package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.SchoolRequestDTO;
import com.internbridge.backend.dto.response.SchoolResponseDTO;
import com.internbridge.backend.entity.School;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.SchoolRepository;
import com.internbridge.backend.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;

    // ── CRUD Operations ─────────────────────────────────────────────────

    @Override
    public SchoolResponseDTO createSchool(SchoolRequestDTO requestDTO) {
        School school = School.builder()
                .name(requestDTO.getName())
                .domain(requestDTO.getDomain())
                .build();

        School saved = schoolRepository.save(school);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public SchoolResponseDTO getSchoolById(UUID id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School", "id", id));
        return mapToResponseDTO(school);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SchoolResponseDTO> getAllSchools() {
        return schoolRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SchoolResponseDTO updateSchool(UUID id, SchoolRequestDTO requestDTO) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School", "id", id));

        school.setName(requestDTO.getName());
        school.setDomain(requestDTO.getDomain());

        School updated = schoolRepository.save(school);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteSchool(UUID id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School", "id", id));
        schoolRepository.delete(school);
    }

    // ── Mapper ──────────────────────────────────────────────────────────

    private SchoolResponseDTO mapToResponseDTO(School school) {
        return SchoolResponseDTO.builder()
                .id(school.getId())
                .name(school.getName())
                .domain(school.getDomain())
                .build();
    }
}
