import OpenAI from "openai";
import { IVacancy } from "../models/vacancy.model";

export type OpenAiAnalysisResult = {
  aiScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  aiSummary: string;
  aiRecommendation: string;
};

const safeParseJson = (text: string): OpenAiAnalysisResult => {
  try {
    const parsed = JSON.parse(text);

    return {
      aiScore: Number(parsed.aiScore) || 0,
      matchedSkills: Array.isArray(parsed.matchedSkills)
        ? parsed.matchedSkills
        : [],
      missingSkills: Array.isArray(parsed.missingSkills)
        ? parsed.missingSkills
        : [],
      aiSummary:
        typeof parsed.aiSummary === "string"
          ? parsed.aiSummary
          : "AI summary was not generated.",
      aiRecommendation:
        typeof parsed.aiRecommendation === "string"
          ? parsed.aiRecommendation
          : "Review manually",
    };
  } catch {
    return {
      aiScore: 0,
      matchedSkills: [],
      missingSkills: [],
      aiSummary: "AI response could not be parsed.",
      aiRecommendation: "Review manually",
    };
  }
};

export const generateOpenAiAnalysis = async (
  vacancy: IVacancy,
  coverLetter: string
): Promise<OpenAiAnalysisResult> => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are an AI recruitment assistant.

Analyze the candidate application against the vacancy requirements.

Return ONLY valid JSON with this exact structure:
{
  "aiScore": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "aiSummary": string,
  "aiRecommendation": string
}

Rules:
- aiScore must be between 0 and 100.
- matchedSkills should include skills found in the candidate text.
- missingSkills should include important required skills not found.
- aiRecommendation should be one of:
  "Approve for interview",
  "Review manually",
  "Reject or request more experience"

Vacancy:
Title: ${vacancy.title}
Department: ${vacancy.department}
Required Skills: ${vacancy.requiredSkills.join(", ")}
Responsibilities: ${vacancy.responsibilities.join(", ")}
Description: ${vacancy.description}

Candidate text:
${coverLetter}
`;

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: prompt,
  });

  return safeParseJson(response.output_text);
};