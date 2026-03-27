import com.internbridge.backend.dto.request.ApplicationRequestDTO;
import com.internbridge.backend.dto.response.ApplicationResponseDTO;
import com.internbridge.backend.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationResponseDTO> applyForInternship(@Valid @RequestBody ApplicationRequestDTO requestDTO) {
        return ResponseEntity.ok(applicationService.applyForInternship(requestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponseDTO> getApplicationById(@PathVariable UUID id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByInternshipId(@PathVariable UUID internshipId) {
        return ResponseEntity.ok(applicationService.getApplicationsByInternshipId(internshipId));
    }

    @GetMapping("/intern/{internId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByInternId(@PathVariable UUID internId) {
        return ResponseEntity.ok(applicationService.getApplicationsByInternId(internId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponseDTO> updateApplicationStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }
}
