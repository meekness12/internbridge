import api from './axiosConfig';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: 'INTERN' | 'COMPANY_ADMIN' | 'SUPERVISOR' | 'SUPER_ADMIN' | 'SCHOOL_ADMIN';
  status: 'ACTIVE' | 'PENDING' | 'VERIFIED' | 'SUSPENDED';
  institution?: string;
  joinedDate: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
}

/**
 * User Service for Super Admin
 */
const userService = {
  /**
   * Fetch all platform users.
   */
  getUsers: async (): Promise<UserDTO[]> => {
    const response = await api.get<UserDTO[]>('/users');
    return response.data;
  },

  /**
   * Provision a new user manually.
   */
  provisionUser: async (data: CreateUserRequest): Promise<UserDTO> => {
    const response = await api.post<UserDTO>('/users/provision', data);
    return response.data;
  },

  /**
   * Update user status.
   */
  updateStatus: async (userId: string, status: string): Promise<void> => {
    await api.patch(`/users/${userId}/status`, { status });
  }
};

export default userService;
