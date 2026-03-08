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
public class LecturerResponseDTO {

    private UUID userId;
    private String email;
    private UUID departmentId;
    private String departmentName;
    private String staffId;
    private String firstName;
    private String lastName;
}
