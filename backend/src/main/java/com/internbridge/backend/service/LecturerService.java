package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.LecturerRequestDTO;
import com.internbridge.backend.dto.response.LecturerResponseDTO;

import java.util.List;
import java.util.UUID;

public interface LecturerService {

    LecturerResponseDTO createLecturer(LecturerRequestDTO requestDTO);

    LecturerResponseDTO getLecturerById(UUID userId);

    List<LecturerResponseDTO> getAllLecturers();

    LecturerResponseDTO updateLecturer(UUID userId, LecturerRequestDTO requestDTO);

    void deleteLecturer(UUID userId);
}
