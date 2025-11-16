import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import reelRouter from "./routes/reelRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import messageRouter from './routes/messageRoutes.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config();




// ✅ CORS must come FIRST (before routes)
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/reel", reelRouter);
app.use("/api/story", storyRouter);
app.use("/api/message",messageRouter)

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Social Media API running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
