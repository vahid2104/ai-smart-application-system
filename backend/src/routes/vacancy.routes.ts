import { Router } from "express";
import {
  createVacancy,
  getVacancies,
  getVacancyById,
} from "../controllers/vacancy.controller";

const router = Router();

router.get("/", getVacancies);
router.get("/:id", getVacancyById);
router.post("/", createVacancy);

export default router;