package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.LecturerRequestDTO;
import com.internbridge.backend.dto.response.LecturerResponseDTO;
import com.internbridge.backend.service.LecturerService;
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
@RequestMapping("/api/v1/lecturers")
@RequiredArgsConstructor
public class LecturerController {

    private final LecturerService lecturerService;

    @PostMapping
    public ResponseEntity<LecturerResponseDTO> createLecturer(
            @Valid @RequestBody LecturerRequestDTO requestDTO) {
        LecturerResponseDTO response = lecturerService.createLecturer(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<LecturerResponseDTO> getLecturerById(@PathVariable UUID userId) {
        LecturerResponseDTO response = lecturerService.getLecturerById(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<LecturerResponseDTO>> getAllLecturers() {
        List<LecturerResponseDTO> response = lecturerService.getAllLecturers();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<LecturerResponseDTO> updateLecturer(
            @PathVariable UUID userId,
            @Valid @RequestBody LecturerRequestDTO requestDTO) {
        LecturerResponseDTO response = lecturerService.updateLecturer(userId, requestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteLecturer(@PathVariable UUID userId) {
        lecturerService.deleteLecturer(userId);
        return ResponseEntity.noContent().build();
    }
}
