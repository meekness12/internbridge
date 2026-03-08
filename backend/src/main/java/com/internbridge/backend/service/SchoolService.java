package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.SchoolRequestDTO;
import com.internbridge.backend.dto.response.SchoolResponseDTO;

import java.util.List;
import java.util.UUID;

public interface SchoolService {

    SchoolResponseDTO createSchool(SchoolRequestDTO requestDTO);

    SchoolResponseDTO getSchoolById(UUID id);

    List<SchoolResponseDTO> getAllSchools();

    SchoolResponseDTO updateSchool(UUID id, SchoolRequestDTO requestDTO);

    void deleteSchool(UUID id);
}
