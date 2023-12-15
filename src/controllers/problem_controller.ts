import { NextFunction, Request, Response } from "express";
import Question from "../models/problemModel";

class ProblemController {
  static async getAllProblems(req: Request, res: Response, next: NextFunction) {
    try {
      const { lim } = req.body;
      console.log("limit",lim)
      const problems = await Question.find({}).limit(lim);
      return res.json({ message: "success", success: true,problems });
    } catch (err) {
      return res.json({ error: err, message: "Error" });
    }
  }

  static async getProblem(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.body;
      const problem = await Question.findOne({ slug });
      if (!problem) {
        res.setHeader("not found", 400);
        return res.json({ message: "Problem not found", status: false });
      }
      return res.json({message:'Done',success:true, problem });
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async postProblem(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, tags, company, number, level, examples,slug } =
        req.body;
      const newQuestion = new Question({
        title,
        description,
        tags,
        company,
        number,
        level,
        slug,
        examples: examples,
      });
      const savedQuestion = newQuestion.save();
      return res.json({ message: "question saved", savedQuestion });
    } catch (err) {}
  }
}

export default ProblemController;
