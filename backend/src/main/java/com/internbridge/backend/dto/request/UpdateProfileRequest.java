package com.internbridge.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    
    @NotBlank(message = "First name is strictly required for identity records")
    private String firstName;
    
    @NotBlank(message = "Last name is strictly required for identity records")
    private String lastName;
    
    @Email(message = "Standardized email format is required")
    @NotBlank(message = "Email is required for credential synchronization")
    private String email;
}
