package com.internbridge.backend.config;

import com.internbridge.backend.entity.*;
import com.internbridge.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SuperAdminRepository superAdminRepository;
    private final CompanyAdminRepository companyAdminRepository;
    private final InternRepository internRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedUsers();
        }
    }

    private void seedUsers() {
        // Seed Super Admin
        SuperAdmin superAdmin = SuperAdmin.builder()
                .email("admin@internbridge.com")
                .password(passwordEncoder.encode("Password123!"))
                .role(Role.SUPER_ADMIN)
                .adminName("Sarah Jenkins")
                .systemClearanceLevel("L5_ULTIMATE")
                .build();
        superAdminRepository.save(superAdmin);

        // Seed Company Admin
        CompanyAdmin companyAdmin = CompanyAdmin.builder()
                .email("daniel@techwave.com")
                .password(passwordEncoder.encode("Password123!"))
                .role(Role.COMPANY_ADMIN)
                .companyName("Techwave Technologies")
                .industry("Artificial Intelligence")
                .tinNumber("TW-99887766")
                .build();
        companyAdminRepository.save(companyAdmin);

        // Seed Intern
        Intern intern = Intern.builder()
                .email("aisha.i@student.ug.edu.gh")
                .password(passwordEncoder.encode("Password123!"))
                .role(Role.INTERN)
                .firstName("Aisha")
                .lastName("Ibrahim")
                .isStudent(true)
                .regNumber("UG-2024-8891")
                .build();
        internRepository.save(intern);
    }
}
