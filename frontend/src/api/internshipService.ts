import { legacyApi } from './axiosConfig';

export interface InternshipDTO {
  id: string;
  title: string;
  description: string;
  requiredSkills: string;
  status: string;
  deadline: string;
  companyName: string;
}

export interface InternshipRequest {
  title: string;
  description: string;
  requiredSkills: string;
  deadline: string;
  companyId: string;
}


const internshipService = {
  getAllInternships: async (): Promise<InternshipDTO[]> => {
    const response = await legacyApi.get<InternshipDTO[]>('/internships');
    return response.data;
  },

  getInternshipById: async (id: string): Promise<InternshipDTO> => {
    const response = await legacyApi.get<InternshipDTO>(`/internships/${id}`);
    return response.data;
  },

  searchInternships: async (keyword?: string, status?: string): Promise<InternshipDTO[]> => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (status) params.append('status', status);
    const response = await legacyApi.get<InternshipDTO[]>(`/internships/search?${params}`);
    return response.data;
  },

  getInternshipsByCompany: async (companyId: string): Promise<InternshipDTO[]> => {
    const response = await legacyApi.get<InternshipDTO[]>(`/internships/company/${companyId}`);
    return response.data;
  },

  createInternship: async (data: InternshipRequest): Promise<InternshipDTO> => {
    const response = await legacyApi.post<InternshipDTO>('/internships', data);
    return response.data;
  },

  updateInternship: async (id: string, data: InternshipRequest): Promise<InternshipDTO> => {
    const response = await legacyApi.put<InternshipDTO>(`/internships/${id}`, data);
    return response.data;
  },

  deleteInternship: async (id: string): Promise<void> => {
    await legacyApi.delete(`/internships/${id}`);
  },
};

export default internshipService;
