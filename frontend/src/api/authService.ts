import api from './axiosConfig';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  role: 'INTERN' | 'COMPANY_ADMIN' | 'SUPERVISOR' | 'SUPER_ADMIN' | 'SCHOOL_ADMIN';
  email: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  institution?: string;
  companyId?: string;
}

/**
 * Authentication Service
 */
const authService = {
  /**
   * Authenticate user and return session data.
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Clear session and sensitive data.
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('companyId');
    localStorage.removeItem('userName');
    localStorage.removeItem('institution');
    window.location.href = '/login';
  },

  /**
   * Get current session status.
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get current user profile.
   */
  getMe: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/auth/me');
    return response.data;
  },

  /**
   * Update current user profile.
   */
  updateMe: async (data: { firstName: string; lastName: string; email: string }): Promise<UserProfile> => {
    const response = await api.patch<UserProfile>('/auth/me', data);
    return response.data;
  }
};

export default authService;
