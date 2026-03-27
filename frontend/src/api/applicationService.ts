import { legacyApi } from './axiosConfig';

export interface ApplicationRequest {
  internshipId: string;
  studentId: string;
  cvUrl?: string;
  coverLetter?: string;
}

export interface ApplicationDTO {
  id: string;
  internshipId: string;
  internshipTitle: string;
  studentName: string;
  status: string;
  cvUrl: string;
  coverLetter: string;
  createdAt: string;
}

const applicationService = {
  applyForInternship: async (data: ApplicationRequest): Promise<ApplicationDTO> => {
    const response = await legacyApi.post<ApplicationDTO>('/applications', data);
    return response.data;
  },

  getMyApplications: async (internId: string): Promise<ApplicationDTO[]> => {
    const response = await legacyApi.get<ApplicationDTO[]>(`/applications/intern/${internId}`);
    return response.data;
  },

  getApplicationById: async (id: string): Promise<ApplicationDTO> => {
    const response = await legacyApi.get<ApplicationDTO>(`/applications/${id}`);
    return response.data;
  },

  getApplicationsByInternship: async (internshipId: string): Promise<ApplicationDTO[]> => {
    const response = await legacyApi.get<ApplicationDTO[]>(`/applications/internship/${internshipId}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<ApplicationDTO> => {
    const response = await legacyApi.patch<ApplicationDTO>(`/applications/${id}/status?status=${status}`);
    return response.data;
  },
};

export default applicationService;
