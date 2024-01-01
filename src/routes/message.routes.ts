import MessageController from "../controllers/message_controller";
import { Router } from "express";

const messageRouter = Router();

messageRouter.route('/sendMessage')
    .post(MessageController.sendMessage);

export default messageRouter;