

import Message from "../../models/messageModel.js";
import Conversation from "../../models/conversationModel.js";
import uploadOnCloudinary from "../../config/cloudinary.js"; // your uploader
import { getSocketID, io } from "../../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const senderId = req.userID;
    const { receiver, text } = req.body; // matches your schema
    // console.log("receiverID",receiver);
    let mediaUrl = null;
    let mediaType = "none";

    if (!receiver) {
      return res.status(400).json({ message: "Receiver is required" });
    }

    // ✅ Upload image if exists
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(
        req.file.path,
        req.file.mimetype
      );
      mediaUrl = uploadResult.secure_url;
      mediaType = req.file.mimetype.startsWith("image/")
        ? "image"
        : req.file.mimetype.startsWith("video/")
        ? "video"
        : "file";
    }

    // ✅ Check if conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiver],
        messages: [],
      });
    }

    // ✅ Create new message
    const newMessage = await Message.create({
      sender: senderId,
      receiver,
      text: text || "",
      media: mediaUrl || "",
      mediaType,
      conversationId: conversation._id,
    });

    // ✅ Push message to conversation
    conversation.messages = conversation.messages || [];
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // ✅ Populate sender details
    const populatedMessage = await newMessage.populate(
      "sender",
      "username profilePicture"
    );

     const receiverSocketID=getSocketID(receiver);

    if(receiverSocketID){
       io.to(receiverSocketID).emit("newMessage",populatedMessage);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: populatedMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default sendMessage;
