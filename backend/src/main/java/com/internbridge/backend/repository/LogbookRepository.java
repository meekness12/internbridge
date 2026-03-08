package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Logbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LogbookRepository extends JpaRepository<Logbook, UUID> {

    List<Logbook> findByPlacementId(UUID placementId);

    List<Logbook> findByPlacementIdOrderByRecordDateDesc(UUID placementId);
}
