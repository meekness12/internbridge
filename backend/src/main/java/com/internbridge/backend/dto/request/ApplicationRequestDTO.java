package com.internbridge.backend.dto.request;

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
public class ApplicationRequestDTO {

    @NotNull(message = "Student ID is required")
    private UUID studentId;

    @NotNull(message = "Internship ID is required")
    private UUID internshipId;
}
