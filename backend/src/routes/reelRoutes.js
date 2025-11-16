import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import createReel from "../controllers/reelControllers/createReel.js";
import getAllReels from "../controllers/reelControllers/getAllReels.js";
import likeReel from "../controllers/reelControllers/likeReel.js";
import commentReel from "../controllers/reelControllers/commentReel.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("media"), createReel);
router.get("/getAll", isAuthenticated, getAllReels);
router.put("/like/:reelId", isAuthenticated, likeReel);
router.post("/comment/:reelId", isAuthenticated, commentReel);

export default router;
