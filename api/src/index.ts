import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { SpaceXService } from "./application/services/SpaceXService";
import { SpaceXRepository } from "./infrastructure/repositories/SpaceXRepository";
import { GetLaunches } from "./domain/useCases/GetLaunches";
import { LaunchesController } from "./presentation/controllers/LaunchesController";
import { createLaunchRoutes } from "./presentation/routes/launchRoutes";

if (process.env.NODE_ENV !== "production") {
  console.log(dotenv.config());
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const spaceXService = new SpaceXService();
const spaceXRepository = new SpaceXRepository(spaceXService);
const getLaunchesUseCase = new GetLaunches(spaceXRepository);
const launchesController = new LaunchesController(getLaunchesUseCase);

app.use("/api/launches", createLaunchRoutes(launchesController));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
