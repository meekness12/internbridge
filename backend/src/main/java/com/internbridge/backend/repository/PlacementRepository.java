package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Placement;
import com.internbridge.backend.entity.PlacementStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlacementRepository extends JpaRepository<Placement, UUID> {

    Optional<Placement> findByApplicationId(UUID applicationId);

    List<Placement> findByStatus(PlacementStatus status);
}
