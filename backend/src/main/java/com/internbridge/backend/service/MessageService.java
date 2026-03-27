package com.internbridge.backend.service;

import com.internbridge.backend.dto.response.MessageResponseDTO;
import java.util.List;
import java.util.UUID;

public interface MessageService {
    MessageResponseDTO sendMessage(UUID senderId, UUID receiverId, String content);
    List<MessageResponseDTO> getMessagesForUser(UUID userId);
    void markAsRead(UUID messageId);
}
