package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Intern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InternRepository extends JpaRepository<Intern, UUID> {
}
