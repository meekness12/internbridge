package com.internbridge.backend.service.impl;

import com.internbridge.backend.entity.Contract;
import com.internbridge.backend.entity.Placement;
import com.internbridge.backend.repository.ContractRepository;
import com.internbridge.backend.repository.PlacementRepository;
import com.internbridge.backend.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;
    private final PlacementRepository placementRepository;

    @Override
    public Contract createContract(UUID placementId, String content) {
        Placement placement = placementRepository.findById(placementId)
                .orElseThrow(() -> new RuntimeException("Placement not found"));

        Contract contract = Contract.builder()
                .placement(placement)
                .content(content)
                .status(Contract.ContractStatus.PENDING)
                .build();

        return contractRepository.save(contract);
    }

    @Override
    @Transactional(readOnly = true)
    public Contract getContractByPlacementId(UUID placementId) {
        return contractRepository.findByPlacementId(placementId)
                .orElseThrow(() -> new RuntimeException("Contract not found for placement"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Contract> getContractsByInternId(UUID internId) {
        return contractRepository.findByPlacementApplicationInternId(internId);
    }

    @Override
    public Contract signContract(UUID contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contract not found"));

        contract.setStatus(Contract.ContractStatus.SIGNED);
        contract.setSignedDate(LocalDateTime.now());

        return contractRepository.save(contract);
    }
}
