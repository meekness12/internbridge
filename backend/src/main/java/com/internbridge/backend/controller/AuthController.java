package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.LoginRequestDTO;
import com.internbridge.backend.dto.response.AuthResponseDTO;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.security.CustomUserDetails;
import com.internbridge.backend.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        // 1. Authenticate credentials via Spring Security's AuthenticationManager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 2. Extract the authenticated user
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        // 3. Generate JWT token with user claims
        String token = jwtService.generateToken(
                user.getEmail(),
                user.getId(),
                user.getRole().name()
        );

        // 4. Build and return the response
        AuthResponseDTO response = AuthResponseDTO.builder()
                .token(token)
                .userId(user.getId())
                .role(user.getRole().name())
                .build();

        return ResponseEntity.ok(response);
    }
}
