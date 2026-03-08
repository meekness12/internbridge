package com.internbridge.backend.dto.response;

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
public class StudentResponseDTO {

    private UUID userId;
    private String email;
    private UUID departmentId;
    private String departmentName;
    private String regNumber;
    private String firstName;
    private String lastName;
    private String headline;
    private String bio;
    private String githubUrl;
}
