package com.internbridge.backend.service;

import com.internbridge.backend.entity.Contract;
import java.util.List;
import java.util.UUID;

public interface ContractService {
    Contract createContract(UUID placementId, String content);
    Contract getContractByPlacementId(UUID placementId);
    List<Contract> getContractsByInternId(UUID internId);
    Contract signContract(UUID contractId);
}
