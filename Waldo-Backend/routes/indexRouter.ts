import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.get("/get-targets/:gameTitle", indexController.getTargets);
indexRouter.post("/:gameTitle/submit-score", indexController.submitScore);
indexRouter.get("/get-leaderboard", indexController.getLeaderboard);

export default indexRouter;
