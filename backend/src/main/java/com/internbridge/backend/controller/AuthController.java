package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.InternRegisterRequest;
import com.internbridge.backend.dto.request.LoginRequestDTO;
import com.internbridge.backend.dto.response.AuthResponseDTO;
import com.internbridge.backend.service.AuthService;
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

    private final AuthService authService;

    @PostMapping("/register/intern")
    public ResponseEntity<AuthResponseDTO> registerIntern(@Valid @RequestBody InternRegisterRequest request) {
        return ResponseEntity.ok(authService.registerIntern(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
