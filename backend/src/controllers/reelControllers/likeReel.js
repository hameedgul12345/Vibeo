import Reel from "../../models/reelModel.js";

const likeReel = async (req, res) => {
  try {
    const { reelId } = req.params;
    const userId = req.userID;

    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    const alreadyLiked = reel.likes.includes(userId);
    if (alreadyLiked) {
      reel.likes = reel.likes.filter((id) => id.toString() !== userId);
    } else {
      reel.likes.push(userId);
    }

    await reel.save();

    res.status(200).json({
      message: alreadyLiked ? "Unliked reel" : "Liked reel",
      likesCount: reel.likes.length,
    });
  } catch (error) {
    console.error("Error liking reel:", error);
    res.status(500).json({ message: "Server error while liking reel" });
  }
};

export default likeReel;
