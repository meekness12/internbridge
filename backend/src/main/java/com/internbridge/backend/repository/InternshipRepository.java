package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Internship;
import com.internbridge.backend.entity.InternshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, UUID> {

    List<Internship> findByCompanyUserId(UUID companyUserId);

    List<Internship> findByStatus(InternshipStatus status);
}
