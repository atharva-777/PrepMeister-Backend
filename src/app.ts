import express, { Application, Express, response } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();
class App {
  public readonly app: Express;
  constructor() {
    this.app = express();
    this.routes();
    // this.app.use(path.resolve(__dirname));
    this.app.use(cors); 
    // this.app.use('/',router);
    this.app.set('view engine', 'ejs');
  }

  private routes(): void {
    this.app.get("/", (_req, res) => {
      return res.render("index");
      return res.send("Welcome Atharva!");
    });

    this.app.get("/login", (_req, res) => {
      return res.send("Login");
    });
  }
}

export const app = new App().app;
