"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importDefault(require("./middlewares/error_handler"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        // this.routes();
        // this.app.use(path.resolve(__dirname));
        this.app.use((0, cors_1.default)());
        this.app.use('/', routes_1.default);
        this.app.set('view engine', 'ejs');
        this.app.use(error_handler_1.default);
    }
    routes() {
        this.app.get("/", (_req, res) => {
            return res.render("index", { age: 12 });
        });
        this.app.get("/login", (_req, res) => {
            return res.send("<h1>Login</h1>");
        });
    }
}
exports.app = new App().app;
