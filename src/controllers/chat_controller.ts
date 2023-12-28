import { Request,Response,NextFunction } from "express";
import Chat from "../models/chatModel";

class ChatController {
    static async createChat(req:Request, res:Response, next:NextFunction){
        try{
            const {name,user} = req.body;
            const existingChat = await Chat.findOne({name:name});
            if(existingChat)return res.json({message:"this group name already exists"});
            const newChat = await Chat.create({
                name:name,
                members: [user._id],
                messages: []
            });
            const fullChat = await Chat.find({_id:newChat._id});
            res.status(200).json({message:"done",fullChat})
        }catch(err){
            return res.json({error:err});
        }
    }

    static async joinChat(req:Request, res:Response, next:NextFunction){
        try{
            const {chatId, user} = req.body;
            const chat = await Chat.findOne({_id:chatId});
            if(!chat)return res.json({message:"Invalid ChatId"});
            chat.members.push(user._id);
            await chat.save();
            const newChat = await Chat.findOne({_id:chatId});
            return res.json({message:"User added to chat",newChat});
        }catch(err){
            res.json({message:"Error occured",error:err})
        }
    }

}

export default ChatController;