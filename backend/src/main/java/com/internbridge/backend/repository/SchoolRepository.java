package com.internbridge.backend.repository;

import com.internbridge.backend.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SchoolRepository extends JpaRepository<School, UUID> {

    Optional<School> findByDomain(String domain);

    boolean existsByDomain(String domain);
}
