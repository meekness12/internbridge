package com.internbridge.backend.service.impl;

import com.internbridge.backend.dto.request.NotificationRequestDTO;
import com.internbridge.backend.dto.response.NotificationResponseDTO;
import com.internbridge.backend.entity.Notification;
import com.internbridge.backend.entity.User;
import com.internbridge.backend.exception.ResourceNotFoundException;
import com.internbridge.backend.repository.NotificationRepository;
import com.internbridge.backend.repository.UserRepository;
import com.internbridge.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public NotificationResponseDTO createNotification(NotificationRequestDTO requestDTO) {
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", requestDTO.getUserId()));

        Notification notification = Notification.builder()
                .user(user)
                .message(requestDTO.getMessage())
                .build();

        Notification saved = notificationRepository.save(notification);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public NotificationResponseDTO getNotificationById(UUID id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        return mapToResponseDTO(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponseDTO> getNotificationsByUserId(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User", "id", userId);
        }
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponseDTO> getUnreadNotificationsByUserId(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User", "id", userId);
        }
        return notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User", "id", userId);
        }
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    @Override
    public NotificationResponseDTO markAsRead(UUID id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));

        notification.setIsRead(true);
        Notification updated = notificationRepository.save(notification);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteNotification(UUID id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        notificationRepository.delete(notification);
    }

    private NotificationResponseDTO mapToResponseDTO(Notification notification) {
        return NotificationResponseDTO.builder()
                .id(notification.getId())
                .userId(notification.getUser().getId())
                .message(notification.getMessage())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
