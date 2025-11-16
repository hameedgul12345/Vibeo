import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);


const io = new Server(server, {
 cors: {
    origin: [
      "https://vibeo1.netlify.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

const userSocketMap = {}; // userID → socketID

export const getSocketID=(receiverID)=>{
    return userSocketMap[receiverID];
}


io.on("connection", (socket) => {
  const userID = socket.handshake.query.userID;

  if (userID) {
    userSocketMap[userID] = socket.id;
    console.log("User connected:", userSocketMap);
  }

  // send active users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // handle disconnect
  socket.on("disconnect", () => {
    if (userID) {
      delete userSocketMap[userID];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("User disconnected:", userSocketMap);
  });
});

export { app, server, io };
