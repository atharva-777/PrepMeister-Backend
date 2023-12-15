import express, {
  Application,
  Express,
  Request,
  Response,
  NextFunction,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { problemRouter } from "./routes";
import errorHandler from "./middlewares/error_handler";
import { connectToDB } from "./db/dbConfig";
import path from "path";
import bodyParser from "body-parser";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

class App {
  public readonly app: Express;
  constructor() {
    this.app = express();
    dotenv.config({ path: path.resolve(__dirname, "./.env") });
    connectToDB();
    // this.routes();
    // this.app.use(path.resolve(__dirname));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use("/api/v1/problems", problemRouter);
    this.app.set("view engine", "ejs");
    this.app.use(errorHandler);
  }

  private routes(): void {
    this.app.get("/", (_req, res) => {
      return res.render("index");
    });

    this.app.get("/login", (_req, res) => {
      return res.send("<h1>Login</h1>");
    });
  }
}

export const app = new App().app;
