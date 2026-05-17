import { Request, Response } from "express";
import Vacancy from "../models/vacancy.model";

export const createVacancy = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      department,
      location,
      type,
      level,
      description,
      requiredSkills,
      responsibilities,
    } = req.body;

    if (
      !title ||
      !department ||
      !location ||
      !type ||
      !level ||
      !description ||
      !requiredSkills ||
      !responsibilities
    ) {
      res.status(400).json({
        success: false,
        message: "All vacancy fields are required",
      });
      return;
    }

    const vacancy = await Vacancy.create({
      title,
      department,
      location,
      type,
      level,
      description,
      requiredSkills,
      responsibilities,
    });

    res.status(201).json({
      success: true,
      message: "Vacancy created successfully",
      data: vacancy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create vacancy",
      error,
    });
  }
};

export const getVacancies = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const vacancies = await Vacancy.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: vacancies.length,
      data: vacancies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vacancies",
      error,
    });
  }
};

export const getVacancyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      res.status(404).json({
        success: false,
        message: "Vacancy not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: vacancy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vacancy",
      error,
    });
  }
};