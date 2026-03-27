import api from './axiosConfig';

export type ReportType = 'ANALYTICAL' | 'GOVERNANCE' | 'STRATEGIC' | 'ACADEMIC' | 'PLACEMENT' | 'INDIVIDUAL';
export type ReportStatus = 'GENERATING' | 'READY' | 'FAILED' | 'ARCHIVED';

export interface ReportResponse {
  id: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  date: string;
  size: string;
  format: string;
  generatedBy: string;
  createdAt?: string;
}

export interface CreateReportRequest {
  title: string;
  type: ReportType;
}

const reportService = {
  getAllReports: async (): Promise<ReportResponse[]> => {
    const response = await api.get('/reports');
    return response.data;
  },

  generateReport: async (request: CreateReportRequest): Promise<ReportResponse> => {
    const response = await api.post('/reports/generate', request);
    return response.data;
  },

  deleteReport: async (id: string): Promise<void> => {
    await api.delete(`/reports/${id}`);
  }
};

export default reportService;
