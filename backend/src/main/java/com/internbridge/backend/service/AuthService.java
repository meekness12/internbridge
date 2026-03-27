package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.CompanyAdminRegisterRequest;
import com.internbridge.backend.dto.request.InternRegisterRequest;
import com.internbridge.backend.dto.request.LoginRequestDTO;
import com.internbridge.backend.dto.request.SuperAdminRegisterRequest;
import com.internbridge.backend.dto.response.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO registerIntern(InternRegisterRequest request);
    AuthResponseDTO registerCompanyAdmin(CompanyAdminRegisterRequest request);
    AuthResponseDTO registerSuperAdmin(SuperAdminRegisterRequest request);
    AuthResponseDTO login(LoginRequestDTO request);
    com.internbridge.backend.dto.response.UserResponse getMe(String email);
}
