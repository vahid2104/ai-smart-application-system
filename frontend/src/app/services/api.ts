const API_BASE_URL = "http://localhost:5000/api";

export type ApiVacancy = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requiredSkills: string[];
  responsibilities: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  count?: number;
  message?: string;
  data: T;
};

export const getVacancies = async (): Promise<ApiVacancy[]> => {
  const response = await fetch(`${API_BASE_URL}/vacancies`);

  if (!response.ok) {
    throw new Error("Failed to fetch vacancies");
  }

  const result: ApiResponse<ApiVacancy[]> = await response.json();

  return result.data;
};