
import Message from "../../models/messageModel.js";
import Conversation from "../../models/conversationModel.js";

// // Get all messages between logged-in user and another user
//  const getAllMessages = async (req, res) => {
//   try {
//     const senderId = req.userID; // from auth middleware
//     const { receiverId } = req.params;

//     if (!receiverId) {
//       return res.status(400).json({ message: "Receiver ID is required" });
//     }

//     // Find the conversation between sender and receiver
//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     }).populate({
//       path: "messages",
//       populate: { path: "senderId", select: "username profilePicture" },
//       options: { sort: { createdAt: 1 } }, // oldest first
//     });

//     if (!conversation) {
//       return res.status(200).json({
//         success: true,
//         message: "No conversation found",
//         data: [],
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Messages fetched successfully",
//       data: conversation.messages,
//     });
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching messages",
//     });
//   }
// };


// export default getAllMessages;



// Get all messages between logged-in user and another user
const getAllMessages = async (req, res) => {
  try {
    const senderId = req.userID; // from auth middleware
    const receiverId = req.params.id; // <-- use 'id' from route

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    // Find the conversation between sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: { path: "sender", select: "username profilePicture" }, // match your schema
      options: { sort: { createdAt: 1 } },
    });

    if (!conversation) {
      return res.status(200).json({
        success: true,
        message: "No conversation found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: conversation.messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching messages",
    });
  }
};

export default getAllMessages;
