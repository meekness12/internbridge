package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.InternRegisterRequest;
import com.internbridge.backend.dto.request.LoginRequestDTO;
import com.internbridge.backend.dto.response.AuthResponseDTO;
import com.internbridge.backend.entity.Intern;
import com.internbridge.backend.entity.Role;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.repository.InternRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.security.JwtService;
import com.internbridge.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final InternRepository internRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthResponseDTO registerIntern(InternRegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Intern intern = Intern.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .isStudent(request.getIsStudent())
                .role(Role.INTERN)
                .build();

        Intern savedIntern = internRepository.save(intern);

        String token = jwtService.generateToken(
                savedIntern.getEmail(),
                savedIntern.getId(),
                savedIntern.getRole().name()
        );

        return AuthResponseDTO.builder()
                .token(token)
                .userId(savedIntern.getId())
                .role(savedIntern.getRole().name())
                .build();
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getId(),
                user.getRole().name()
        );

        return AuthResponseDTO.builder()
                .token(token)
                .userId(user.getId())
                .role(user.getRole().name())
                .build();
    }
}
