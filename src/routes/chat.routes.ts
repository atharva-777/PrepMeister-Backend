import { Router } from "express";
import { ChatController } from "../controllers";

const chatRouter = Router();

chatRouter.route('/createChat')
    .post(ChatController.createChat);

    chatRouter.route('/joinChat')
    .post(ChatController.joinChat);

export default chatRouter;