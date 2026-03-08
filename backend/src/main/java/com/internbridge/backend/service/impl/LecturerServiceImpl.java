package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.LecturerRequestDTO;
import com.internbridge.backend.dto.response.LecturerResponseDTO;
import com.internbridge.backend.entity.Department;
import com.internbridge.backend.entity.Lecturer;
import com.internbridge.backend.entity.Role;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.DepartmentRepository;
import com.internbridge.backend.repository.LecturerRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.LecturerService;
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
public class LecturerServiceImpl implements LecturerService {

    private final LecturerRepository lecturerRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    // ── CRUD Operations ─────────────────────────────────────────────────

    @Override
    public LecturerResponseDTO createLecturer(LecturerRequestDTO requestDTO) {
        Department department = departmentRepository.findById(requestDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", requestDTO.getDepartmentId()));

        // 1. Create the base User entity
        User user = User.builder()
                .email(requestDTO.getEmail())
                .passwordHash(passwordEncoder.encode(requestDTO.getPassword()))
                .role(Role.LECTURER)
                .build();
        User savedUser = userRepository.save(user);

        // 2. Create the Lecturer profile linked to the User
        Lecturer lecturer = Lecturer.builder()
                .user(savedUser)
                .department(department)
                .staffId(requestDTO.getStaffId())
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .build();

        Lecturer saved = lecturerRepository.save(lecturer);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public LecturerResponseDTO getLecturerById(UUID userId) {
        Lecturer lecturer = lecturerRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Lecturer", "userId", userId));
        return mapToResponseDTO(lecturer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LecturerResponseDTO> getAllLecturers() {
        return lecturerRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LecturerResponseDTO updateLecturer(UUID userId, LecturerRequestDTO requestDTO) {
        Lecturer lecturer = lecturerRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Lecturer", "userId", userId));

        Department department = departmentRepository.findById(requestDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", requestDTO.getDepartmentId()));

        // Update profile fields only (not User credentials)
        lecturer.setDepartment(department);
        lecturer.setStaffId(requestDTO.getStaffId());
        lecturer.setFirstName(requestDTO.getFirstName());
        lecturer.setLastName(requestDTO.getLastName());

        Lecturer updated = lecturerRepository.save(lecturer);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteLecturer(UUID userId) {
        Lecturer lecturer = lecturerRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Lecturer", "userId", userId));

        lecturerRepository.delete(lecturer);
        userRepository.deleteById(userId);
    }

    // ── Mapper ──────────────────────────────────────────────────────────

    private LecturerResponseDTO mapToResponseDTO(Lecturer lecturer) {
        return LecturerResponseDTO.builder()
                .userId(lecturer.getUserId())
                .email(lecturer.getUser().getEmail())
                .departmentId(lecturer.getDepartment().getId())
                .departmentName(lecturer.getDepartment().getName())
                .staffId(lecturer.getStaffId())
                .firstName(lecturer.getFirstName())
                .lastName(lecturer.getLastName())
                .build();
    }
}
