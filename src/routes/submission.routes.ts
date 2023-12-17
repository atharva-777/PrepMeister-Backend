import { SubmissionController } from "../controllers";
import { Router } from "express";

const submissionRouter = Router();

submissionRouter
  .route("/postSubmission")
  .post(SubmissionController.postSubmission);

submissionRouter
  .route("/getSubmission")
  .post(SubmissionController.getSubmission);

export default submissionRouter;
