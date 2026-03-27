import { legacyApi } from './axiosConfig';

export interface MessageDTO {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const messageService = {
  getMyMessages: async (userId: string): Promise<MessageDTO[]> => {
    const response = await legacyApi.get<MessageDTO[]>(`/messages/user/${userId}`);
    return response.data;
  },

  sendMessage: async (senderId: string, receiverId: string, content: string): Promise<MessageDTO> => {
    const response = await legacyApi.post<MessageDTO>(
      `/messages?senderId=${senderId}&receiverId=${receiverId}`,
      content,
      { headers: { 'Content-Type': 'text/plain' } }
    );
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await legacyApi.patch(`/messages/${id}/read`);
  },
};

export default messageService;
