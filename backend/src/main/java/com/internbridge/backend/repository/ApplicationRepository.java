package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, UUID> {

    List<Application> findByInternId(UUID internId);

    List<Application> findByInternshipId(UUID internshipId);

    boolean existsByInternIdAndInternshipId(UUID internId, UUID internshipId);
}
