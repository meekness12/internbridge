package com.internbridge.backend.controller;

import com.internbridge.backend.dto.request.CompanyAdminRegisterRequest;
import com.internbridge.backend.dto.request.InternRegisterRequest;
import com.internbridge.backend.dto.request.LoginRequestDTO;
import com.internbridge.backend.dto.request.SuperAdminRegisterRequest;
import com.internbridge.backend.dto.response.AuthResponseDTO;
import com.internbridge.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/register/company-admin")
    public ResponseEntity<AuthResponseDTO> registerCompanyAdmin(@Valid @RequestBody CompanyAdminRegisterRequest request) {
        return ResponseEntity.ok(authService.registerCompanyAdmin(request));
    }

    @PostMapping("/register/super-admin")
    public ResponseEntity<AuthResponseDTO> registerSuperAdmin(@Valid @RequestBody SuperAdminRegisterRequest request) {
        return ResponseEntity.ok(authService.registerSuperAdmin(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @org.springframework.web.bind.annotation.GetMapping("/me")
    public ResponseEntity<com.internbridge.backend.dto.response.UserResponse> getMe(java.security.Principal principal) {
        return ResponseEntity.ok(authService.getMe(principal.getName()));
    }

    @org.springframework.web.bind.annotation.PatchMapping("/me")
    public ResponseEntity<com.internbridge.backend.dto.response.UserResponse> updateMe(
            java.security.Principal principal, 
            @jakarta.validation.Valid @RequestBody com.internbridge.backend.dto.request.UpdateProfileRequest request) {
        return ResponseEntity.ok(authService.updateProfileByEmail(principal.getName(), request));
    }
}
