import api from './axiosConfig';

export interface FacultyDTO {
  id: number;
  name: string;
  dean: string;
  departmentCount: number;
  studentCount: number;
  placementRate: number;
  departments: string[];
}

/**
 * Faculty Service for School Admin
 */
const facultyService = {
  /**
   * Fetch all faculties for the current school.
   */
  getFaculties: async (): Promise<FacultyDTO[]> => {
    const response = await api.get<FacultyDTO[]>('/faculties');
    return response.data;
  },

  /**
   * Register a new faculty node.
   */
  createFaculty: async (data: Partial<FacultyDTO>): Promise<FacultyDTO> => {
    const response = await api.post<FacultyDTO>('/faculties', data);
    return response.data;
  }
};

export default facultyService;
