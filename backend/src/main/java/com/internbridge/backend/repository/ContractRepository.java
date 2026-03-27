package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ContractRepository extends JpaRepository<Contract, UUID> {
    Optional<Contract> findByPlacementId(UUID placementId);
    List<Contract> findByPlacementApplicationInternId(UUID internId);
}
