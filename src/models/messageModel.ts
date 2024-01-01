import mongoose from "mongoose";
import Chat from "./chatModel";
import user from "./userModel";

const MessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    createTime: {
      type: Date,
      default: Date.now,
      index: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    to: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "file", "code"],
      default: "text",
    },
    content: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
