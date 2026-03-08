package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.SchoolRequestDTO;
import com.internbridge.backend.dto.response.SchoolResponseDTO;
import com.internbridge.backend.service.SchoolService;
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
@RequestMapping("/api/v1/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;

    @PostMapping
    public ResponseEntity<SchoolResponseDTO> createSchool(
            @Valid @RequestBody SchoolRequestDTO requestDTO) {
        SchoolResponseDTO response = schoolService.createSchool(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchoolResponseDTO> getSchoolById(@PathVariable UUID id) {
        SchoolResponseDTO response = schoolService.getSchoolById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<SchoolResponseDTO>> getAllSchools() {
        List<SchoolResponseDTO> response = schoolService.getAllSchools();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchoolResponseDTO> updateSchool(
            @PathVariable UUID id,
            @Valid @RequestBody SchoolRequestDTO requestDTO) {
        SchoolResponseDTO response = schoolService.updateSchool(id, requestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchool(@PathVariable UUID id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }
}
