package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.StudentRequestDTO;
import com.internbridge.backend.dto.response.StudentResponseDTO;
import com.internbridge.backend.service.StudentService;
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
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentResponseDTO> createStudent(
            @Valid @RequestBody StudentRequestDTO requestDTO) {
        StudentResponseDTO response = studentService.createStudent(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable UUID userId) {
        StudentResponseDTO response = studentService.getStudentById(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<StudentResponseDTO>> getAllStudents() {
        List<StudentResponseDTO> response = studentService.getAllStudents();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<StudentResponseDTO> updateStudent(
            @PathVariable UUID userId,
            @Valid @RequestBody StudentRequestDTO requestDTO) {
        StudentResponseDTO response = studentService.updateStudent(userId, requestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID userId) {
        studentService.deleteStudent(userId);
        return ResponseEntity.noContent().build();
    }
}
