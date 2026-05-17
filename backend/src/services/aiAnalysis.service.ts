import { IVacancy } from "../models/vacancy.model";

type AiAnalysisResult = {
  aiScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  aiSummary: string;
  aiRecommendation: string;
};

export const generateFakeAiAnalysis = (
  vacancy: IVacancy,
  coverLetter: string
): AiAnalysisResult => {
  const normalizedCoverLetter = coverLetter.toLowerCase();

  const matchedSkills = vacancy.requiredSkills.filter((skill) =>
    normalizedCoverLetter.includes(skill.toLowerCase())
  );

  const missingSkills = vacancy.requiredSkills.filter(
    (skill) => !normalizedCoverLetter.includes(skill.toLowerCase())
  );

  const skillMatchRatio =
    vacancy.requiredSkills.length > 0
      ? matchedSkills.length / vacancy.requiredSkills.length
      : 0;

  const aiScore = Math.round(skillMatchRatio * 100);

  let aiRecommendation = "Review manually";
  let aiSummary =
    "The candidate partially matches the vacancy requirements. Manual review is recommended.";

  if (aiScore >= 80) {
    aiRecommendation = "Approve for interview";
    aiSummary =
      "The candidate is a strong match for this vacancy. The application shows strong alignment with the required skills.";
  } else if (aiScore >= 50) {
    aiRecommendation = "Review manually";
    aiSummary =
      "The candidate has some relevant skills, but several important requirements are missing. A manual review is recommended.";
  } else {
    aiRecommendation = "Reject or request more experience";
    aiSummary =
      "The candidate does not strongly match the main requirements for this vacancy. The application lacks several key skills.";
  }

  return {
    aiScore,
    matchedSkills,
    missingSkills,
    aiSummary,
    aiRecommendation,
  };
};