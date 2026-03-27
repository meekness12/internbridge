package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.response.MessageResponseDTO;
import com.internbridge.backend.entity.Message;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.repository.MessageRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Override
    public MessageResponseDTO sendMessage(UUID senderId, UUID receiverId, String content) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(content)
                .timestamp(LocalDateTime.now())
                .isRead(false)
                .build();

        Message savedMessage = messageRepository.save(message);
        return mapToResponseDTO(savedMessage);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageResponseDTO> getMessagesForUser(UUID userId) {
        return messageRepository.findBySenderIdOrReceiverIdOrderByTimestampDesc(userId, userId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void markAsRead(UUID messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setIsRead(true);
        messageRepository.save(message);
    }

    private MessageResponseDTO mapToResponseDTO(Message message) {
        return MessageResponseDTO.builder()
                .id(message.getId())
                .senderId(message.getSender().getId())
                .senderName(message.getSender().getUsername())
                .receiverId(message.getReceiver().getId())
                .receiverName(message.getReceiver().getUsername())
                .content(message.getContent())
                .timestamp(message.getTimestamp())
                .read(message.getIsRead())
                .build();
    }
}
