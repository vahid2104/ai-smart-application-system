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

export type ApiApplicationStatus = "pending" | "approved" | "rejected";

export type ApiApplication = {
  _id: string;
  vacancy: ApiVacancy;
  candidateName: string;
  candidateEmail: string;
  coverLetter: string;
  cvFileName: string;
  cvFileUrl?: string;
  status: ApiApplicationStatus;
  aiScore?: number;
  matchedSkills: string[];
  missingSkills: string[];
  aiSummary?: string;
  aiRecommendation?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateApplicationPayload = {
  vacancy: string;
  candidateName: string;
  candidateEmail: string;
  coverLetter: string;
  cvFileName: string;
  cvFileUrl?: string;
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

export const getVacancyById = async (
  vacancyId: string
): Promise<ApiVacancy> => {
  const response = await fetch(`${API_BASE_URL}/vacancies/${vacancyId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch vacancy");
  }

  const result: ApiResponse<ApiVacancy> = await response.json();

  return result.data;
};

export const createApplication = async (
  payload: CreateApplicationPayload
): Promise<ApiApplication> => {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  const result: ApiResponse<ApiApplication> = await response.json();

  return result.data;
};