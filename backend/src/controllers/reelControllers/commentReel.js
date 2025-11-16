import Reel from "../../models/reelModel.js";

const commentReel = async (req, res) => {
  try {
    const { reelId } = req.params;
    const { text } = req.body;
    const userId = req.userID;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    reel.comments.push({ user: userId, text });
    await reel.save();

    const updatedReel = await Reel.findById(reelId).populate({
      path: "comments.user",
      select: "name userName profilePicture",
    });

    res.status(200).json({
      message: "Comment added successfully",
      reel: updatedReel,
    });
  } catch (error) {
    console.error("Error commenting on reel:", error);
    res.status(500).json({ message: "Server error while commenting" });
  }
};

export default commentReel;
