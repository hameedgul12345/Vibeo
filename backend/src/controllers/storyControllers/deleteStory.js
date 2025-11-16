import Story from "../../models/storyModel.js";

const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.userID;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.author.toString() !== userId) {
      return res.status(403).json({ message: "You can delete only your own story" });
    }

    await story.deleteOne();
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ message: "Server error while deleting story" });
  }
};

export default deleteStory;
