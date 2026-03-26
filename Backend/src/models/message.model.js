import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
      required: [true, "chat is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    role: {
      type: String,
      enum: ["user", "ai"],
      required: [true, "role is required"],
    },
  },
  { timestamps: true },
);

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
