import { Request,Response,NextFunction } from "express";
import Chat from "../models/chatModel";

class ChatController {
    static async createChat(req:Request, res:Response, next:NextFunction){
        try{
            const {name,members,messages} = req.body;
            const newChat = await Chat.create({
                name:name,
                members: members,
                messages: messages
            });
            const fullChat = await Chat.find({_id:newChat._id});
            res.status(200).json({message:"done",fullChat})
        }catch(err){
            return res.json({error:err});
        }
    }
}

export default ChatController;