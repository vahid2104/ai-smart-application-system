import { Request, Response } from "express";
import Application from "../models/application.model";
import Vacancy from "../models/vacancy.model";
import { generateFakeAiAnalysis } from "../services/aiAnalysis.service";
import { generateOpenAiAnalysis } from "../services/openaiAnalysis.service";

export const createApplication = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      vacancy,
      candidateName,
      candidateEmail,
      coverLetter,
      cvFileName,
      cvFileUrl,
    } = req.body;

    if (
      !vacancy ||
      !candidateName ||
      !candidateEmail ||
      !coverLetter ||
      !cvFileName
    ) {
      res.status(400).json({
        success: false,
        message:
          "Vacancy, candidateName, candidateEmail, coverLetter, and cvFileName are required",
      });
      return;
    }

    const existingVacancy = await Vacancy.findById(vacancy);

    if (!existingVacancy) {
      res.status(404).json({
        success: false,
        message: "Selected vacancy was not found",
      });
      return;
    }

 const useRealAi = process.env.USE_REAL_AI === "true";

let aiAnalysis;

if (useRealAi) {
  try {
    aiAnalysis = await generateOpenAiAnalysis(existingVacancy, coverLetter);
  } catch (aiError) {
    console.warn(
      "OpenAI analysis failed. Falling back to fake AI analysis:",
      aiError
    );

    aiAnalysis = generateFakeAiAnalysis(existingVacancy, coverLetter);
  }
} else {
  aiAnalysis = generateFakeAiAnalysis(existingVacancy, coverLetter);
}

    const application = await Application.create({
      vacancy,
      candidateName,
      candidateEmail,
      coverLetter,
      cvFileName,
      cvFileUrl,
      status: "pending",
      aiScore: aiAnalysis.aiScore,
      matchedSkills: aiAnalysis.matchedSkills,
      missingSkills: aiAnalysis.missingSkills,
      aiSummary: aiAnalysis.aiSummary,
      aiRecommendation: aiAnalysis.aiRecommendation,
    });

    const populatedApplication = await application.populate("vacancy");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: populatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error,
    });
  }
};

export const getApplications = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const applications = await Application.find()
      .populate("vacancy")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error,
    });
  }
};

export const getApplicationById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "vacancy",
    );

    if (!application) {
      res.status(404).json({
        success: false,
        message: "Application not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
      error,
    });
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Status must be pending, approved, or rejected",
      });
      return;
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("vacancy");

    if (!application) {
      res.status(404).json({
        success: false,
        message: "Application not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      error,
    });
  }
};
