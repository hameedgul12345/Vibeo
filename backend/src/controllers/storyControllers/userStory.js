import Story from "../../models/storyModel.js";

const userStory = async (req, res) => {
  try {
    const userID = req.userID; // ✅ Logged-in user's ID from middleware

    if (!userID) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    // ✅ Find all stories created by this user
    const stories = await Story.find({ author: userID })
      .populate("author", "name userName profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching user stories:", error);
    res.status(500).json({ message: "Server error while fetching user stories" });
  }
};

export default userStory;
