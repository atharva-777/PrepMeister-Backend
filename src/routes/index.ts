import { Router } from "express";

const router = Router();

router.get('/',(_req,res)=>{
    return res.render('index');
})

router.get('/test',(_req,res)=>{
    res.send('Test route successful')
})

export default router;