package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.DepartmentRequestDTO;
import com.internbridge.backend.dto.response.DepartmentResponseDTO;
import com.internbridge.backend.service.DepartmentService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<DepartmentResponseDTO> createDepartment(
            @Valid @RequestBody DepartmentRequestDTO requestDTO) {
        DepartmentResponseDTO response = departmentService.createDepartment(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> getDepartmentById(@PathVariable UUID id) {
        DepartmentResponseDTO response = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponseDTO>> getAllDepartments(
            @RequestParam(required = false) UUID schoolId) {
        List<DepartmentResponseDTO> response;
        if (schoolId != null) {
            response = departmentService.getDepartmentsBySchoolId(schoolId);
        } else {
            response = departmentService.getAllDepartments();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> updateDepartment(
            @PathVariable UUID id,
            @Valid @RequestBody DepartmentRequestDTO requestDTO) {
        DepartmentResponseDTO response = departmentService.updateDepartment(id, requestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable UUID id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }
}
