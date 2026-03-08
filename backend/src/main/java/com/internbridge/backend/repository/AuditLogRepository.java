package com.internbridge.backend.repository;

import com.internbridge.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {

    List<AuditLog> findByUserIdOrderByTimestampDesc(UUID userId);

    List<AuditLog> findByEntityNameAndEntityId(String entityName, UUID entityId);
}
