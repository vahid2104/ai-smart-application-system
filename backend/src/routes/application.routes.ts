import { Router } from "express";
import {
  createApplication,
  getApplicationById,
  getApplications,
  updateApplicationStatus,
} from "../controllers/application.controller";

const router = Router();

router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);
router.patch("/:id/status", updateApplicationStatus);

export default router;