import { Request, Response, NextFunction } from "express";
import user from "../models/userModel";
import Chat from "../models/chatModel";
import Message from "../models/messageModel";

class MessageController{
    static async sendMessage(req:Request, res:Response, next:NextFunction){
        try{
            const {content, chatId, userId} = req.body;
            if(!content || !chatId){
                return res.sendStatus(400);
            }
            let newMessage = {
                chat: chatId,
                from: userId,
                type: "text",
                content: content,
                deleted: false,
            }

            let message = await Message.create(newMessage);
            await Chat.findByIdAndUpdate(chatId, { messages: [{user:userId, text:content}] });
            message.save();
            let savedChat = await Chat.findById(chatId);
            return res.json({message:message,chat:savedChat});

        }catch(err){
            res.status(400);
            return res.json({Error:err});
        }
    }
}

export default MessageController;