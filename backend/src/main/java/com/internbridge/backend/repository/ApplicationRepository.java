package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, UUID> {

    /* 
     * SCRUBBED: Depends on deleted Student entity.
     * List<Application> findByStudentUserId(UUID studentUserId);
     */

    List<Application> findByInternshipId(UUID internshipId);

    /* 
     * SCRUBBED: Depends on deleted Student entity.
     * boolean existsByStudentUserIdAndInternshipId(UUID studentUserId, UUID internshipId);
     */
}
