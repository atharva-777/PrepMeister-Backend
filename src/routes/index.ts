import { error } from "console";
import { Router } from "express";

const router = Router();

router.get('/',(_req,res)=>{
    // throw error("Error")
    res.render('index',{age:21});
})

router.get('/test',(_req,res)=>{
    res.send('Test route successful')
})

export default router;