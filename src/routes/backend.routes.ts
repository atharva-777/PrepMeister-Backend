import { Router } from "express";

const backendRouter = Router();

backendRouter
    .route('/')
    .get((_req,res)=>{
        res.render('index');
    })

export default backendRouter;