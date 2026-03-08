package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.StudentRequestDTO;
import com.internbridge.backend.dto.response.StudentResponseDTO;
import com.internbridge.backend.entity.Department;
import com.internbridge.backend.entity.Role;
import com.internbridge.backend.entity.Student;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.DepartmentRepository;
import com.internbridge.backend.repository.StudentRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.StudentService;
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
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    // ── CRUD Operations ─────────────────────────────────────────────────

    @Override
    public StudentResponseDTO createStudent(StudentRequestDTO requestDTO) {
        Department department = departmentRepository.findById(requestDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", requestDTO.getDepartmentId()));

        // 1. Create the base User entity
        User user = User.builder()
                .email(requestDTO.getEmail())
                .passwordHash(passwordEncoder.encode(requestDTO.getPassword()))
                .role(Role.STUDENT)
                .build();
        User savedUser = userRepository.save(user);

        // 2. Create the Student profile linked to the User
        Student student = Student.builder()
                .user(savedUser)
                .department(department)
                .regNumber(requestDTO.getRegNumber())
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .headline(requestDTO.getHeadline())
                .bio(requestDTO.getBio())
                .githubUrl(requestDTO.getGithubUrl())
                .build();

        Student saved = studentRepository.save(student);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentById(UUID userId) {
        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", userId));
        return mapToResponseDTO(student);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponseDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StudentResponseDTO updateStudent(UUID userId, StudentRequestDTO requestDTO) {
        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", userId));

        Department department = departmentRepository.findById(requestDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", requestDTO.getDepartmentId()));

        // Update profile fields only (not User credentials)
        student.setDepartment(department);
        student.setRegNumber(requestDTO.getRegNumber());
        student.setFirstName(requestDTO.getFirstName());
        student.setLastName(requestDTO.getLastName());
        student.setHeadline(requestDTO.getHeadline());
        student.setBio(requestDTO.getBio());
        student.setGithubUrl(requestDTO.getGithubUrl());

        Student updated = studentRepository.save(student);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteStudent(UUID userId) {
        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", userId));

        // Delete the student profile first, then the base user
        studentRepository.delete(student);
        userRepository.deleteById(userId);
    }

    // ── Mapper ──────────────────────────────────────────────────────────

    private StudentResponseDTO mapToResponseDTO(Student student) {
        return StudentResponseDTO.builder()
                .userId(student.getUserId())
                .email(student.getUser().getEmail())
                .departmentId(student.getDepartment().getId())
                .departmentName(student.getDepartment().getName())
                .regNumber(student.getRegNumber())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .headline(student.getHeadline())
                .bio(student.getBio())
                .githubUrl(student.getGithubUrl())
                .build();
    }
}
