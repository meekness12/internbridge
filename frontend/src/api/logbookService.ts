import { legacyApi } from './axiosConfig';

export interface LogbookRequest {
  placementId: string;
  recordDate: string;
  hoursWorked: number;
  tasksCompleted: string;
}

export interface LogbookDTO {
  id: string;
  placementId: string;
  recordDate: string;
  hoursWorked: number;
  tasksCompleted: string;
  companyStatus: string;
  lecturerStatus: string;
}

const logbookService = {
  createLogbook: async (data: LogbookRequest): Promise<LogbookDTO> => {
    const response = await legacyApi.post<LogbookDTO>('/logbooks', data);
    return response.data;
  },

  getLogbooksByPlacement: async (placementId: string): Promise<LogbookDTO[]> => {
    const response = await legacyApi.get<LogbookDTO[]>(`/logbooks/placement/${placementId}`);
    return response.data;
  },

  getLogbookById: async (id: string): Promise<LogbookDTO> => {
    const response = await legacyApi.get<LogbookDTO>(`/logbooks/${id}`);
    return response.data;
  },

  updateLogbook: async (id: string, data: LogbookRequest): Promise<LogbookDTO> => {
    const response = await legacyApi.put<LogbookDTO>(`/logbooks/${id}`, data);
    return response.data;
  },

  deleteLogbook: async (id: string): Promise<void> => {
    await legacyApi.delete(`/logbooks/${id}`);
  },

  updateCompanyStatus: async (id: string, status: string): Promise<LogbookDTO> => {
    const response = await legacyApi.patch<LogbookDTO>(`/logbooks/${id}/company-status?status=${status}`);
    return response.data;
  },

  updateLecturerStatus: async (id: string, status: string): Promise<LogbookDTO> => {
    const response = await legacyApi.patch<LogbookDTO>(`/logbooks/${id}/lecturer-status?status=${status}`);
    return response.data;
  },
};

export default logbookService;
