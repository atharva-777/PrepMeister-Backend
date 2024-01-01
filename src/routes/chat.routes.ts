import { Router } from "express";
import { ChatController } from "../controllers";

const chatRouter = Router();

chatRouter.route('/createChat')
    .post(ChatController.createChat);

    chatRouter.route('/joinChat')
    .post(ChatController.joinChat);

    chatRouter.route('/leaveChat')
    .post(ChatController.leaveChat);

    chatRouter.route('/deleteChat')
    .post(ChatController.deleteChat);

    chatRouter.route('/accessChat')
    .post(ChatController.accessChat);

export default chatRouter;