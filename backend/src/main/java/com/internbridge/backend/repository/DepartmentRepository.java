package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, UUID> {

    List<Department> findBySchoolId(UUID schoolId);
}
