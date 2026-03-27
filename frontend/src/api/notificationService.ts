import { legacyApi } from './axiosConfig';

export interface NotificationDTO {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const notificationService = {
  getMyNotifications: async (userId: string): Promise<NotificationDTO[]> => {
    const response = await legacyApi.get<NotificationDTO[]>(`/notifications/user/${userId}`);
    return response.data;
  },

  getUnreadNotifications: async (userId: string): Promise<NotificationDTO[]> => {
    const response = await legacyApi.get<NotificationDTO[]>(`/notifications/user/${userId}/unread`);
    return response.data;
  },

  getUnreadCount: async (userId: string): Promise<number> => {
    const response = await legacyApi.get<number>(`/notifications/user/${userId}/unread-count`);
    return response.data;
  },

  markAsRead: async (id: string): Promise<NotificationDTO> => {
    const response = await legacyApi.patch<NotificationDTO>(`/notifications/${id}/read`);
    return response.data;
  },

  deleteNotification: async (id: string): Promise<void> => {
    await legacyApi.delete(`/notifications/${id}`);
  },
};

export default notificationService;
