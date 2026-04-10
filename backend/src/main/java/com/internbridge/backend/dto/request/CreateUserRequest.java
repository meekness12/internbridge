package com.internbridge.backend.dto.request;

import com.internbridge.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
    private String institution; // Optional, for context
    private String industry;    // Capturing sector for corporate partners
}
