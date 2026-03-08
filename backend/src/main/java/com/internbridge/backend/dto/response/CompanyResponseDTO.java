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
public class CompanyResponseDTO {

    private UUID userId;
    private String email;
    private String companyName;
    private String tinNumber;
    private String industry;
    private String websiteUrl;
}
