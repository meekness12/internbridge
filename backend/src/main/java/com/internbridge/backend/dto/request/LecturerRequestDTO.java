package com.internbridge.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LecturerRequestDTO {

    // ── User credentials (used during creation) ─────────────────────────
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // ── Lecturer profile fields ─────────────────────────────────────────
    @NotNull(message = "Department ID is required")
    private UUID departmentId;

    @NotBlank(message = "Staff ID is required")
    private String staffId;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;
}
