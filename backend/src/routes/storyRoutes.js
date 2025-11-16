import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import createStory from "../controllers/storyControllers/createStory.js";
import getAllStories from "../controllers/storyControllers/getAllStories.js";
import viewStory from "../controllers/storyControllers/viewStory.js";
import deleteStory from "../controllers/storyControllers/deleteStory.js";
import userStory from "../controllers/storyControllers/userStory.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("media"), createStory);
router.get('/userStory',isAuthenticated,userStory)
router.get("/getAll", isAuthenticated, getAllStories);
router.put("/view/:storyId", isAuthenticated, viewStory);
router.delete("/delete/:storyId", isAuthenticated, deleteStory);

export default router;
