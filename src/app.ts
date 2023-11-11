import express, { Application, Express, response } from "express";
import dotenv from "dotenv";
import cors from "cors";

class App {
    public readonly app:Express;
    constructor() {
        this.app = express();
        this.routes();
    }

    private routes() : void {
        this.app.get('/',(_req,res)=>{
            return res.send('Welcome Atharva!');
        })

        this.app.get('/login',(_req,res)=>{
            return res.send('Login');
        })

    }
}

export const app = new App().app;
