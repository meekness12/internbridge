package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.CreateUserRequest;
import com.internbridge.backend.dto.request.UpdateUserRequest;
import com.internbridge.backend.dto.request.UpdateStatusRequest;
import com.internbridge.backend.dto.response.UserResponse;
import com.internbridge.backend.entity.CompanyAdmin;
import com.internbridge.backend.entity.*;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserResponse provisionUser(CreateUserRequest request) {
        User user;
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        switch (request.getRole()) {
            case INTERN:
                user = Intern.builder()
                        .isStudent(true)
                        .build();
                break;
            case COMPANY_ADMIN:
                user = CompanyAdmin.builder()
                        .companyName(request.getInstitution())
                        .industry(request.getIndustry())
                        .build();
                break;
            case SCHOOL_ADMIN:
                user = SchoolAdmin.builder()
                        .schoolName(request.getInstitution())
                        .build();
                break;
            case SUPERVISOR:
                user = Supervisor.builder()
                        .firstName(request.getFirstName()) // Supervisor has redundant fields in subclass
                        .lastName(request.getLastName())
                        .build();
                break;
            default:
                user = new User();
        }

        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());
        user.setStatus(UserStatus.ACTIVE);
        
        return mapToResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public UserResponse updateUser(UUID userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User identity not found in central registry"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }

        // Handle institution updates based on role
        if (request.getInstitution() != null) {
            if (user instanceof CompanyAdmin) {
                ((CompanyAdmin) user).setCompanyName(request.getInstitution());
            } else if (user instanceof SchoolAdmin) {
                ((SchoolAdmin) user).setSchoolName(request.getInstitution());
            }
        }

        return mapToResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public UserResponse updateStatus(UUID userId, UpdateStatusRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User identity not found in central registry"));
        
        user.setStatus(request.getStatus());
        return mapToResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public UserResponse updateProfileByEmail(String currentEmail, com.internbridge.backend.dto.request.UpdateProfileRequest request) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Authenticated identity not found in central registry"));
        
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        
        return mapToResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(UUID userId) {
        userRepository.deleteById(userId);
    }

    private UserResponse mapToResponse(User user) {
        String fullName = (user.getFirstName() != null ? user.getFirstName() : "") + " " + 
                         (user.getLastName() != null ? user.getLastName() : "");
        if (fullName.trim().isEmpty()) fullName = "Unknown System Identity";

        String institution = "System Management";
        
        if (user instanceof CompanyAdmin) {
            institution = ((CompanyAdmin) user).getCompanyName();
        } else if (user instanceof SchoolAdmin) {
            institution = ((SchoolAdmin) user).getSchoolName();
        } else if (user instanceof Supervisor) {
            institution = ((Supervisor) user).getSchoolAdmin() != null ? 
                        ((Supervisor) user).getSchoolAdmin().getSchoolName() : "Faculty Body";
        } else if (user instanceof Intern) {
            institution = "Academic Residencies";
        }

        return UserResponse.builder()
                .id(user.getId())
                .name(fullName)
                .email(user.getEmail())
                .role(user.getRole() != null ? user.getRole().name() : "GUEST")
                .status(user.getStatus() != null ? user.getStatus().name() : "PENDING")
                .institution(institution)
                .joinedDate(user.getCreatedAt() != null ? 
                        user.getCreatedAt().format(DateTimeFormatter.ofPattern("MMM dd, yyyy")) : 
                        "N/A")
                .build();
    }
}
