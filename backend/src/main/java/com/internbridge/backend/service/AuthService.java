package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.InternRegisterRequest;
import com.internbridge.backend.dto.request.LoginRequestDTO;
import com.internbridge.backend.dto.response.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO registerIntern(InternRegisterRequest request);
    AuthResponseDTO login(LoginRequestDTO request);
}
