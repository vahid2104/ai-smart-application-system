import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import vacancyRoutes from "./routes/vacancy.routes";
import applicationRoutes from "./routes/application.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/applications", applicationRoutes);

export default app;