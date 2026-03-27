import api from './axiosConfig';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: 'INTERN' | 'COMPANY_ADMIN' | 'SUPERVISOR' | 'SUPER_ADMIN' | 'SCHOOL_ADMIN';
  status: 'ACTIVE' | 'PENDING' | 'VERIFIED' | 'SUSPENDED' | 'DEACTIVATED';
  institution?: string;
  joinedDate: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  institution?: string;
}

/**
 * User Service for Super Admin identity governance
 */
const userService = {
  /**
   * Synchronize all platform users with the central registry.
   */
  getUsers: async (): Promise<UserDTO[]> => {
    const response = await api.get<UserDTO[]>('/users');
    return response.data;
  },

  /**
   * Provision a new user manually with a secure handshake.
   */
  provisionUser: async (data: CreateUserRequest): Promise<UserDTO> => {
    const response = await api.post<UserDTO>('/users/provision', {
      ...data,
      password: data.password || 'TempPass123!' // Default fallback if not provided in UI yet
    });
    return response.data;
  },

  /**
   * Update user status (Active/Suspended/Deactivated).
   */
  updateStatus: async (userId: string, status: UserDTO['status']): Promise<UserDTO> => {
    const response = await api.patch<UserDTO>(`/users/${userId}/status`, { status });
    return response.data;
  },

  /**
   * Remove a user identity from the platform registry.
   */
  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
  }
};

export default userService;
