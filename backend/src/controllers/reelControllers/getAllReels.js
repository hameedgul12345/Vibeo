import Reel from "../../models/reelModel.js";

const getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find()
      .populate("author", "name userName profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(reels);
  } catch (error) {
    console.error("Error fetching reels:", error);
    res.status(500).json({ message: "Server error while fetching reels" });
  }
};

export default getAllReels;
