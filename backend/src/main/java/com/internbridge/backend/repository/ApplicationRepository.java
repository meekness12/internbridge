package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, UUID> {

    @Query("SELECT a FROM Application a WHERE a.intern.id = :internId")
    List<Application> findByInternId(@Param("internId") UUID internId);

    @Query("SELECT a FROM Application a WHERE a.internship.id = :internshipId")
    List<Application> findByInternshipId(@Param("internshipId") UUID internshipId);

    @Query("SELECT COUNT(a) > 0 FROM Application a WHERE a.intern.id = :internId AND a.internship.id = :internshipId")
    boolean existsByInternIdAndInternshipId(@Param("internId") UUID internId, @Param("internshipId") UUID internshipId);
}
