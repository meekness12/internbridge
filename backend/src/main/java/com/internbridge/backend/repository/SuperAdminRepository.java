package com.internbridge.backend.repository;

import com.internbridge.backend.entity.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SuperAdminRepository extends JpaRepository<SuperAdmin, UUID> {
}
