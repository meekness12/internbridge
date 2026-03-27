import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8080';

/**
 * Axios instance for the InternBridge API (v1 endpoints).
 * Used for: /api/v1/users, /api/v1/reports, /api/v1/system, /api/v1/auth
 */
const api = axios.create({
  baseURL: `${API_HOST}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios instance for legacy API routes.
 * Used for: /api/internships, /api/applications, /api/placements, /api/logbooks
 */
export const legacyApi = axios.create({
  baseURL: `${API_HOST}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Shared interceptor logic
const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleError = (error: AxiosError) => Promise.reject(error);

const handleResponseError = (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

// Apply interceptors to both instances
api.interceptors.request.use(attachToken, handleError);
api.interceptors.response.use((r: AxiosResponse) => r, handleResponseError);

legacyApi.interceptors.request.use(attachToken, handleError);
legacyApi.interceptors.response.use((r: AxiosResponse) => r, handleResponseError);

export default api;

