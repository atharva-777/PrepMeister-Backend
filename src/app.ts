import express, { Application, Express,Request,Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import errorHandler from "./middlewares/error_handler";

dotenv.config();
class App {
  public readonly app: Express;
  constructor() {
    this.app = express();
    // this.routes();
    // this.app.use(path.resolve(__dirname));
    this.app.use(cors()); 
    this.app.use('/',router);
    this.app.set('view engine', 'ejs');
    this.app.use(errorHandler);
  }

  private routes(): void {
    this.app.get("/", (_req, res) => {
      return res.render("index",{age:12});
    });

    this.app.get("/login", (_req, res) => {
      return res.send("<h1>Login</h1>");
    });
  }


}

export const app = new App().app;
