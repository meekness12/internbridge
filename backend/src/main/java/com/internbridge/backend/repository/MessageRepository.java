package com.internbridge.backend.repository;

import com.internbridge.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    List<Message> findBySenderIdOrReceiverIdOrderByTimestampDesc(UUID senderId, UUID receiverId);
    List<Message> findByReceiverIdAndIsReadFalse(UUID receiverId);
}
