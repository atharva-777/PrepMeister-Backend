import express, {Express,Request,Response,Application} from "express";
import dotenv from 'dotenv';

dotenv.config();

const app:Application = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname))

app.get('/',(req:Request,res:Response)=>{
    res.send("Welcome to Node.js & Typescript Backend Server");
});

app.get('/test',(req:Request,res:Response)=>{
    res.sendFile(__dirname + "/index.html");
})


app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
})

export default app;