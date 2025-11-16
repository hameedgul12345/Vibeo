import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    // 🔹 The sender of the message
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 The receiver of the message
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Optional: if messages belong to a chat room or conversation
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: false,
    },

    // 🔹 The actual text of the message
    text: {
      type: String,
      trim: true,
    },

    // 🔹 Optional: media message (image, video, audio, etc.)
    media: {
      type: String,
      default: "",
    },

    // 🔹 Media type (useful if media is sent)
    mediaType: {
      type: String,
      enum: ["image", "video", "audio", "file", "none"],
      default: "none",
    },

    // 🔹 Seen / Delivered Status
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

export default mongoose.model("Message", messageSchema);
