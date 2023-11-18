"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
        console.log('app init');
    }
    routes() {
        this.app.get('/', (_req, res) => {
            // res.render(resolve(__dirname,'views'));
            res.send('Welcome to the Node.js & TypeScript Server -> ');
        });
        this.app.get('/test', (_req, res) => {
            res.send('<!DOCTYPE html><html lang="en"><head><metaharset="UTF-8">    <meta name="viewport"ontent="width=device-width, initial-scale=1.0">    <title>Document</title></head><body>    <h1>Welcome to Typescript Nodejs Backend</h1></body></html>');
        });
    }
}
const app = new App().app;
app.listen(8080, () => {
    console.log(`Server listening on port http://localhost:8080`);
});
