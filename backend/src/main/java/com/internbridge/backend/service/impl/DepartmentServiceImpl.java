package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.DepartmentRequestDTO;
import com.internbridge.backend.dto.response.DepartmentResponseDTO;
import com.internbridge.backend.entity.Department;
import com.internbridge.backend.entity.School;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.DepartmentRepository;
import com.internbridge.backend.repository.SchoolRepository;
import com.internbridge.backend.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final SchoolRepository schoolRepository;

    // ── CRUD Operations ─────────────────────────────────────────────────

    @Override
    public DepartmentResponseDTO createDepartment(DepartmentRequestDTO requestDTO) {
        School school = schoolRepository.findById(requestDTO.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School", "id", requestDTO.getSchoolId()));

        Department department = Department.builder()
                .school(school)
                .name(requestDTO.getName())
                .build();

        Department saved = departmentRepository.save(department);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentResponseDTO getDepartmentById(UUID id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));
        return mapToResponseDTO(department);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponseDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponseDTO> getDepartmentsBySchoolId(UUID schoolId) {
        // Verify school exists
        if (!schoolRepository.existsById(schoolId)) {
            throw new ResourceNotFoundException("School", "id", schoolId);
        }
        return departmentRepository.findBySchoolId(schoolId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentResponseDTO updateDepartment(UUID id, DepartmentRequestDTO requestDTO) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));

        School school = schoolRepository.findById(requestDTO.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School", "id", requestDTO.getSchoolId()));

        department.setSchool(school);
        department.setName(requestDTO.getName());

        Department updated = departmentRepository.save(department);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteDepartment(UUID id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));
        departmentRepository.delete(department);
    }

    // ── Mapper ──────────────────────────────────────────────────────────

    private DepartmentResponseDTO mapToResponseDTO(Department department) {
        return DepartmentResponseDTO.builder()
                .id(department.getId())
                .schoolId(department.getSchool().getId())
                .schoolName(department.getSchool().getName())
                .name(department.getName())
                .build();
    }
}
