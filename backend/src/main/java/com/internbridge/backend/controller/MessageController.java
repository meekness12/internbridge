package com.internbridge.backend.controller;

import com.internbridge.backend.dto.response.MessageResponseDTO;
import com.internbridge.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageResponseDTO> sendMessage(
            @RequestParam UUID senderId,
            @RequestParam UUID receiverId,
            @RequestBody String content) {
        return ResponseEntity.ok(messageService.sendMessage(senderId, receiverId, content));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MessageResponseDTO>> getMessagesForUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(messageService.getMessagesForUser(userId));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable UUID id) {
        messageService.markAsRead(id);
        return ResponseEntity.noContent().build();
    }
}
