import Conversation from "../../models/conversationModel.js";

export const recentUsers = async (req, res) => {
  try {
    const userId = req.userID; // coming from auth middleware

    // Find conversations where logged-in user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "name profilePicture email") // get user details
      .sort({ updatedAt: -1 }); // most recent first

    // Extract the "other user" from each conversation
    const users = conversations.map((conv) => {
      return conv.participants.find(
        (p) => p._id.toString() !== userId.toString()
      );
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("recentUsers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
