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
  getMe: async (): Promise<any> => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export default authService;
