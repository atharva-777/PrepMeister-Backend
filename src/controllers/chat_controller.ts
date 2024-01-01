import { Request, Response, NextFunction } from "express";
import Chat from "../models/chatModel";
import user from "../models/userModel";

class ChatController {

  static async accessChat(req: Request,res: Response, next:NextFunction){
    try{
      const {userId} = req.body;

      const chats = await Chat.find({
        $and:[
          {members: {$elemMatch: {$eq: userId}}},
        ],
      })
      .populate("messages");

      return res.json({message:"Chats fetched",chats});

    }catch(err){
      return res.json({Error:err});
    }
  }

  static async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, user } = req.body;
      const existingChat = await Chat.findOne({ name: name });
      if (existingChat)
        return res.json({ message: "this group name already exists" });
      const newChat = await Chat.create({
        name: name,
        creator: user._id,
        members: [user._id],
        messages: [],
      });
      const fullChat = await Chat.find({ _id: newChat._id });
      res.status(200).json({ message: "done", fullChat });
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async joinChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId, user } = req.body;
      const chat = await Chat.findOne({ _id: chatId });
      if (!chat) return res.json({ message: "Invalid ChatId" });
      chat.members.push(user._id);
      await chat.save();
      const newChat = await Chat.findOne({ _id: chatId });
      return res.json({ message: "User added to chat", newChat });
    } catch (err) {
      res.json({ message: "Error occured", error: err });
    }
  }

  static async leaveChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId, userId } = req.body;
      const chat = await Chat.findById(chatId);
      if (!chat) return res.json({ message: "Chat not found" });
      if (chat.creator) {
        if (chat.creator === userId)
          return res.json({
            message: "Admin Can't leave the group, delete it!",
          });
      }
      const idx = chat.members.indexOf(userId);
      if (idx === -1) return res.json({ message: "Unexpected error occured" });
      chat.members.splice(idx, 1);
      await chat.save();
      const currUser = await user.findById(userId);
      return res.json({
        message: "User left the chat",
        user: currUser,
        chat: chat,
      });
    } catch (err) {
      return res.json({ Error: err });
    }
  }

  static async deleteChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId, userId } = req.body;
      const chat = await Chat.findById(chatId);
      if (!chat) return res.json({ message: "Chat not found" });
      if (chat.creator) {
        if (chat.creator !== userId) {
          return res.json({
            message: "Only admin can delete group chat",
            creator: chat.creator,
            userId,
          });
        }
      }
      await Chat.deleteOne({ _id: chatId });
      const allChats = await Chat.find();
      return res.json({
        message: "Chat deleted successsfully",
        allChats: allChats,
      });
    } catch (err) {
      return res.json({ Error: err });
    }
  }
}

export default ChatController;
