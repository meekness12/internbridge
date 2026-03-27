import api from './axiosConfig';

export interface PlatformStats {
  totalUsers: number;
  totalPartners: number;
  systemUptime: string;
  securityAlerts: number;
  resourceUsage: number;
  userTrend: string;
  partnerTrend: string;
}

export interface AuditLogDTO {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED' | 'INFO';
  details: string;
}

export interface InfrastructureMetric {
  timestamp: string;
  cpuLoad: number;
  memoryUsage: number;
}

export interface SystemAlert {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface CompanyDTO {
  id: string;
  name: string;
  industry: string;
  location: string;
  status: 'VERIFIED' | 'PENDING' | 'SUSPENDED';
  interns: number;
  rating: string;
  logo: string;
  website: string;
}

export interface AnalyticsResponse {
  placementVelocity: { month: string; rate: number }[];
  sectorDistribution: { sector: string; percentage: number; color: string }[];
  nodeAwareness: { label: string; city: string; ping: string; status: string }[];
  totalPlacements: number;
  placementTrend: string;
  certificationRate: number;
}

/**
 * System Service for Super Admin Oversight
 */
const systemService = {
  /**
   * Fetch global platform statistics.
   */
  getPlatformStats: async (): Promise<PlatformStats> => {
    const response = await api.get<PlatformStats>('/system/stats');
    return response.data;
  },

  /**
   * Fetch global analytical inventory.
   */
  getAnalytics: async (): Promise<AnalyticsResponse> => {
    const response = await api.get<AnalyticsResponse>('/system/analytics');
    return response.data;
  },

  /**
   * Fetch system audit logs.
   */
  getAuditLogs: async (limit: number = 50): Promise<AuditLogDTO[]> => {
    const response = await api.get<AuditLogDTO[]>(`/system/audit?limit=${limit}`);
    return response.data;
  },

  /**
   * Fetch infrastructure load metrics for the last 24h.
   */
  getInfrastructureMetrics: async (): Promise<InfrastructureMetric[]> => {
    const response = await api.get<InfrastructureMetric[]>('/system/infrastructure');
    return response.data;
  },

  /**
   * Fetch active system alerts.
   */
  getSystemAlerts: async (): Promise<SystemAlert[]> => {
    const response = await api.get<SystemAlert[]>('/system/alerts');
    return response.data;
  },

  /**
   * Fetch institutional partners.
   */
  getCompanies: async (): Promise<CompanyDTO[]> => {
    const response = await api.get<CompanyDTO[]>('/system/companies');
    return response.data;
  }
};

export default systemService;
