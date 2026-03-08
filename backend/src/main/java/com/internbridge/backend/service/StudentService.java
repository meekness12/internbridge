package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.StudentRequestDTO;
import com.internbridge.backend.dto.response.StudentResponseDTO;

import java.util.List;
import java.util.UUID;

public interface StudentService {

    StudentResponseDTO createStudent(StudentRequestDTO requestDTO);

    StudentResponseDTO getStudentById(UUID userId);

    List<StudentResponseDTO> getAllStudents();

    StudentResponseDTO updateStudent(UUID userId, StudentRequestDTO requestDTO);

    void deleteStudent(UUID userId);
}
