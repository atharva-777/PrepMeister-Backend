import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { api } from "../config/api";

class SubmissionController {
  static postSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { language_id, source_code, stdin } = req.body;
      console.log("here",req.body);

      const sub = await axios({
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: {
          base64_encoded: "false",
          wait: "false",
          fields: "*",
        },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
          "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
        },
        data: {
          language_id: language_id,
          source_code: source_code,
          stdin: stdin,
        },
      });

      console.log(sub.data);
      return res.json({message:'submission done',success:true,res:sub.data})
    } catch (err: any) {
      return res.json({error:err,message:'failed'})
      throw new Error(err);
    }
  };

  static getSubmission = async (req:Request,res:Response,next:NextFunction) => {
    try{
      const {submissionToken} = req.body;

      const sub = await axios({
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`,
        params: {
          base64_encoded: "true",
          wait: "false",
          fields: "*",
        },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
          "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
        },
      });

      return res.json({output:sub.data});

    }catch(err){
      return res.json({message:"error",error:err});
    }
  }

}


export default SubmissionController;