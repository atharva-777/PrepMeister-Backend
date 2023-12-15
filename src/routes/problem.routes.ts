import { Router } from "express";
import { ProblemController } from "../controllers";

const problemRouter = Router();

problemRouter.route("/getAllProblems").post(ProblemController.getAllProblems);

problemRouter.route("/getProblem").post(ProblemController.getProblem);

problemRouter.route("/postProblem").post(ProblemController.postProblem);

export default problemRouter;
