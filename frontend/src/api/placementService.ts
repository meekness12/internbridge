import { legacyApi } from './axiosConfig';

export interface PlacementDTO {
  id: string;
  applicationId: string;
  studentName: string;
  internshipTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  status: string;
}

const placementService = {
  getMyPlacements: async (internId: string): Promise<PlacementDTO[]> => {
    const response = await legacyApi.get<PlacementDTO[]>(`/placements/intern/${internId}`);
    return response.data;
  },

  getPlacementById: async (id: string): Promise<PlacementDTO> => {
    const response = await legacyApi.get<PlacementDTO>(`/placements/${id}`);
    return response.data;
  },

  getPlacementsByCompany: async (companyId: string): Promise<PlacementDTO[]> => {
    const response = await legacyApi.get<PlacementDTO[]>(`/placements/company/${companyId}`);
    return response.data;
  },

  getAllPlacements: async (): Promise<PlacementDTO[]> => {
    const response = await legacyApi.get<PlacementDTO[]>('/placements');
    return response.data;
  },
};

export default placementService;
