import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import create from "../controllers/postControllers/create.js";
import likePost from "../controllers/postControllers/likePost.js";
import commentPost from "../controllers/postControllers/commentPost.js";
import savedPost from "../controllers/postControllers/savedPost.js";
import getAll from "../controllers/postControllers/getAll.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("media"), create);
router.get("/getAll", isAuthenticated, getAll);
router.put("/like/:postId", isAuthenticated, likePost);
router.post("/comment/:postId", isAuthenticated, commentPost);
router.put("/save/:postId", isAuthenticated, savedPost);

export default router;
