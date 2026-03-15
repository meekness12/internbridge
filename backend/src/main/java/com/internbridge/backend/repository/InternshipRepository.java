package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Internship;
import com.internbridge.backend.entity.InternshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, UUID> {

    List<Internship> findByCompanyUserId(UUID companyUserId);

    List<Internship> findByStatus(InternshipStatus status);

    @Query("SELECT i FROM Internship i WHERE " +
           "(:keyword IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:status IS NULL OR i.status = :status)")
    List<Internship> searchByKeywordAndStatus(
            @Param("keyword") String keyword,
            @Param("status") InternshipStatus status
    );
}
