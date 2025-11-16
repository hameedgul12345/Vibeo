import Story from "../../models/storyModel.js";

const viewStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.userID;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Add viewer only once
    if (!story.viewers.includes(userId)) {
      story.viewers.push(userId);
      await story.save();
    }

    res.status(200).json({ message: "Story viewed", viewers: story.viewers });
  } catch (error) {
    console.error("Error viewing story:", error);
    res.status(500).json({ message: "Server error while viewing story" });
  }
};

export default viewStory;
