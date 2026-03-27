package com.internbridge.backend.controller;

import com.internbridge.backend.entity.Contract;
import com.internbridge.backend.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping
    public ResponseEntity<Contract> createContract(@RequestParam UUID placementId, @RequestBody String content) {
        return ResponseEntity.ok(contractService.createContract(placementId, content));
    }

    @GetMapping("/placement/{placementId}")
    public ResponseEntity<Contract> getContractByPlacementId(@PathVariable UUID placementId) {
        return ResponseEntity.ok(contractService.getContractByPlacementId(placementId));
    }

    @GetMapping("/intern/{internId}")
    public ResponseEntity<List<Contract>> getContractsByInternId(@PathVariable UUID internId) {
        return ResponseEntity.ok(contractService.getContractsByInternId(internId));
    }

    @PatchMapping("/{id}/sign")
    public ResponseEntity<Contract> signContract(@PathVariable UUID id) {
        return ResponseEntity.ok(contractService.signContract(id));
    }
}
