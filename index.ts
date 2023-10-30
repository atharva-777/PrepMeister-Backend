import express,{Express,Application,Response} from 'express';
import { resolve } from 'path';

class App {
    public readonly app:Express;
    constructor() {
        this.app = express();
        this.routes();
        console.log('app init');
    }

    private routes(): void {
        this.app.get('/',(_req,res)=>{
            // res.render(resolve(__dirname,'views'));
            res.send('Welcome to the Node.js & TypeScript Server -> ');
        })
        this.app.get('/test',(_req,res)=>{
            res.send('<!DOCTYPE html><html lang="en"><head><metaharset="UTF-8">    <meta name="viewport"ontent="width=device-width, initial-scale=1.0">    <title>Document</title></head><body>    <h1>Welcome to Typescript Nodejs Backend</h1></body></html>')
        })
    }   
}

const app = new App().app;

app.listen(8080,()=>{
    console.log(`Server listening on port http://localhost:8080`)
})