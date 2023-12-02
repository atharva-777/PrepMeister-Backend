import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.render("index");
});

router.route('/jsonData').get((_req,res)=>{
    res.json({'name':'Atharva','roll':38})
})

router.get("/youtube", (_req, res) => {
  res.send("<h1>Chai Aur Code</h1>");
});

router.get("/test", (_req, res) => {
  res.send("Test route successful");
});

export default router;
