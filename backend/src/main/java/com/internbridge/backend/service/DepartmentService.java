package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.DepartmentRequestDTO;
import com.internbridge.backend.dto.response.DepartmentResponseDTO;

import java.util.List;
import java.util.UUID;

public interface DepartmentService {

    DepartmentResponseDTO createDepartment(DepartmentRequestDTO requestDTO);

    DepartmentResponseDTO getDepartmentById(UUID id);

    List<DepartmentResponseDTO> getAllDepartments();

    List<DepartmentResponseDTO> getDepartmentsBySchoolId(UUID schoolId);

    DepartmentResponseDTO updateDepartment(UUID id, DepartmentRequestDTO requestDTO);

    void deleteDepartment(UUID id);
}
