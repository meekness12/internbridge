package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, UUID> {

    Optional<Lecturer> findByStaffId(String staffId);

    List<Lecturer> findByDepartmentId(UUID departmentId);

    boolean existsByStaffId(String staffId);
}
