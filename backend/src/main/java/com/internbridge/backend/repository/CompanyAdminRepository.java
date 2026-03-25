package com.internbridge.backend.repository;

import com.internbridge.backend.entity.CompanyAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CompanyAdminRepository extends JpaRepository<CompanyAdmin, UUID> {
}
