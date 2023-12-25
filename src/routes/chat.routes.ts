import { Router } from "express";
import { ChatController } from "../controllers";

const chatRouter = Router();

chatRouter.route('/createChat')
    .post(ChatController.createChat);

export default chatRouter;