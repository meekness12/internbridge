package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByRegNumber(String regNumber);

    List<Student> findByDepartmentId(UUID departmentId);

    boolean existsByRegNumber(String regNumber);
}
