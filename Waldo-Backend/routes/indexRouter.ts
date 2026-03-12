import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.get("/get-targets/:gameTitle", indexController.getTargets);

export default indexRouter;
