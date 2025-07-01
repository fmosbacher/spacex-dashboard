import { Router } from "express";
import { LaunchesController } from "../controllers/LaunchesController";

export const createLaunchRoutes = (
  launchesController: LaunchesController,
): Router => {
  const router = Router();
  router.get("/", (req, res) => launchesController.getLaunches(req, res));
  return router;
};
