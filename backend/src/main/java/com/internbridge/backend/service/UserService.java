package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.CreateUserRequest;
import com.internbridge.backend.dto.request.UpdateStatusRequest;
import com.internbridge.backend.dto.response.UserResponse;
import com.internbridge.backend.entity.UserStatus;
import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse provisionUser(CreateUserRequest request);
    UserResponse updateStatus(UUID userId, UpdateStatusRequest request);
    UserResponse updateProfileByEmail(String email, com.internbridge.backend.dto.request.UpdateProfileRequest request);
    void deleteUser(UUID userId);
}
