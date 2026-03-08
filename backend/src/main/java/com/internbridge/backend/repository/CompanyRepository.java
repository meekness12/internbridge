package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {

    Optional<Company> findByTinNumber(String tinNumber);

    boolean existsByTinNumber(String tinNumber);
}
