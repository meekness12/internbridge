package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;
import com.internbridge.backend.entity.Application;
import com.internbridge.backend.entity.ApplicationStatus;
import com.internbridge.backend.entity.Internship;
import com.internbridge.backend.entity.Student;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.ApplicationRepository;
import com.internbridge.backend.repository.InternshipRepository;
import com.internbridge.backend.repository.StudentRepository;
import com.internbridge.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;

    @Override
    public ApplicationResponseDTO createApplication(ApplicationRequestDTO requestDTO) {
        Student student = studentRepository.findById(requestDTO.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", requestDTO.getStudentId()));

        Internship internship = internshipRepository.findById(requestDTO.getInternshipId())
                .orElseThrow(() -> new ResourceNotFoundException("Internship", "id", requestDTO.getInternshipId()));

        // Prevent duplicate applications
        if (applicationRepository.existsByStudentUserIdAndInternshipId(
                requestDTO.getStudentId(), requestDTO.getInternshipId())) {
            throw new IllegalStateException("Student has already applied to this internship");
        }

        Application application = Application.builder()
                .student(student)
                .internship(internship)
                .build();

        Application saved = applicationRepository.save(application);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationResponseDTO getApplicationById(UUID id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));
        return mapToResponseDTO(application);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByStudentId(UUID studentUserId) {
        if (!studentRepository.existsById(studentUserId)) {
            throw new ResourceNotFoundException("Student", "userId", studentUserId);
        }
        return applicationRepository.findByStudentUserId(studentUserId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByInternshipId(UUID internshipId) {
        if (!internshipRepository.existsById(internshipId)) {
            throw new ResourceNotFoundException("Internship", "id", internshipId);
        }
        return applicationRepository.findByInternshipId(internshipId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationResponseDTO updateApplicationStatus(UUID id, String status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));

        application.setStatus(ApplicationStatus.valueOf(status));
        Application updated = applicationRepository.save(application);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteApplication(UUID id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));
        applicationRepository.delete(application);
    }

    private ApplicationResponseDTO mapToResponseDTO(Application application) {
        return ApplicationResponseDTO.builder()
                .id(application.getId())
                .studentId(application.getStudent().getUserId())
                .studentName(application.getStudent().getFirstName() + " " + application.getStudent().getLastName())
                .internshipId(application.getInternship().getId())
                .internshipTitle(application.getInternship().getTitle())
                .status(application.getStatus().name())
                .appliedAt(application.getAppliedAt())
                .build();
    }
}
