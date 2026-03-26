import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user is required"],
    },
    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },
  },
  { timestamps: true },
);

const chatModel = mongoose.model("chats", chatSchema);

export default chatModel;
