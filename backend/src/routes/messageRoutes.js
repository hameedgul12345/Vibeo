import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import sendMessage from "../controllers/messageControllers/sendMessage.js";
import getAllMessages from "../controllers/messageControllers/getAllMessages.js"
import upload from "../middlewares/multer.js";
const router = express.Router();


router.post('/send', isAuthenticated,upload.single('media'), sendMessage);
router.get('/getAll/:id',isAuthenticated,getAllMessages)
export default router;
