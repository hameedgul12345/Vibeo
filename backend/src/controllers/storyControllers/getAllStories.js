import Story from "../../models/storyModel.js";

const getAllStories = async (req, res) => {
  try {
    const userId = req.userID; // ✅ Logged-in user's ID from middleware

    // ✅ Fetch all stories except the current user's
    const stories = await Story.find({ author: { $ne: userId } })
      .populate("author", "name userName profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ message: "Server error while fetching stories" });
  }
};

export default getAllStories;
