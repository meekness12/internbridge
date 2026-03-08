package com.internbridge.backend.service;

import com.internbridge.backend.dto.request.NotificationRequestDTO;
import com.internbridge.backend.dto.response.NotificationResponseDTO;

import java.util.List;
import java.util.UUID;

public interface NotificationService {

    NotificationResponseDTO createNotification(NotificationRequestDTO requestDTO);

    NotificationResponseDTO getNotificationById(UUID id);

    List<NotificationResponseDTO> getNotificationsByUserId(UUID userId);

    List<NotificationResponseDTO> getUnreadNotificationsByUserId(UUID userId);

    long getUnreadCount(UUID userId);

    NotificationResponseDTO markAsRead(UUID id);

    void deleteNotification(UUID id);
}
