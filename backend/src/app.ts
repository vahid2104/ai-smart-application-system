import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import vacancyRoutes from "./routes/vacancy.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/vacancies", vacancyRoutes);

export default app;