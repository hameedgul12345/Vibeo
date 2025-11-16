// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Signin from "./auth/Signin";
// import Signup from "./auth/Signup";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import ReelsViewer from "./pages/ReelsViewer";
// import SuggestedUserProfile from "./pages/SuggestedUserProfile";
// import EditProfile from "./components/EditProfile";
// import ForgotPassword from "./auth/ForgotPassword";
// import OtpVerification from "./auth/OtpVerification";
// import ResetPassword from "./auth/ResetPassword";
// import { io } from "socket.io-client";

// import useCurrentUser from "./hooks/useCurrentUser";
// import { use } from "react";
// export const serverURl = "http://localhost:5000";
// import useSuggestUsers from "./hooks/useSuggestUsers";
// import UploadMedia from "./pages/UploadMedia";
// import useGetAllPosts from "./hooks/useGetAllPosts";
// import useGetAllReels from "./hooks/useGetAllReels";
// import useGetAllStories from "./hooks/useGetAllStories";
// import useGetUserStory from "./hooks/useGetUserStory";
// import StoryViewer from "./components/StoryViewer";
// import MessageBox from "./components/MessageBox";
// import { useEffect } from "react";
// import { setOnlineUsers, setSockets } from "./redux/socketSlice";




// function App() {

//   const { userData } = useSelector((state) => state.user);
//   const dispatch=useDispatch()
//   const { sockets } = useSelector((state) => state.socket);

  
//  useEffect(() => {
//   if (!userData) return;

//   // 1️⃣ Create socket connection
//   const socketIo = io(serverURl, {
//     query: {
//       userID: userData._id,
//     },
//   });

//   // 2️⃣ Save socket in redux
//   dispatch(setSockets(socketIo));

//   // 3️⃣ Listen for online users
//   socketIo.on("getOnlineUsers", (users) => {
//     dispatch(setOnlineUsers(users));
//   });

//   // 4️⃣ Cleanup function
//   return () => {
//     socketIo.disconnect();
//     dispatch(setSockets(null));
//   };
// }, [userData]);


//   // console.log("App userData:", userData);
//   useCurrentUser();
//   useSuggestUsers();
//   useGetAllPosts();
//   useGetAllReels();
//   useGetAllStories();
//   useGetUserStory();
//   return (
//     <Routes>
//       {/* ✅ Protected Routes */}
//       <Route
//         path="/"
//         element={userData ? <Home /> : <Navigate to="/signin" replace />}
//       />
//       <Route
//         path="/upload-media"
//         element={userData ? <UploadMedia /> : <Navigate to="/signin" replace />}
//       />
//       <Route
//         path="/profile"
//         element={userData ? <Profile /> : <Navigate to="/signin" replace />}
//       />
//       <Route
//         path="/reels"
//         element={userData ? <ReelsViewer /> : <Navigate to="/signin" replace />}
//       />
//       <Route
//         path="/user/:username"
//         element={
//           userData ? (
//             <SuggestedUserProfile />
//           ) : (
//             <Navigate to="/signin" replace />
//           )
//         }
//       />
//       <Route
//         path="/story-viewer/:id"
//         element={userData ? <StoryViewer /> : <Navigate to="/signin" replace />}
//       />

//       <Route
//         path="/edit-profile"
//         element={userData ? <EditProfile /> : <Navigate to="/signin" replace />}
//       />

      
//       <Route
//         path="/chat-window/:id"
//         element={userData ? <MessageBox/> : <Navigate to="/signin" replace />}
//       />

//       {/* ✅ Public Routes */}
//       <Route
//         path="/signin"
//         element={!userData ? <Signin /> : <Navigate to="/" replace />}
//       />

//       <Route
//         path="/signup"
//         element={!userData ? <Signup /> : <Navigate to="/" replace />}
//       />

//       <Route
//         path="/forgot-password"
//         element={!userData ? <ForgotPassword /> : <Navigate to="/" replace />}
//       />

//       <Route
//         path="/otp-verification"
//         element={!userData ? <OtpVerification /> : <Navigate to="/" replace />}
//       />

//       <Route
//         path="/reset-password"
//         element={!userData ? <ResetPassword /> : <Navigate to="/" replace />}
//       />

//       {/* ✅ Catch-all Route */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;


import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ReelsViewer from "./pages/ReelsViewer";
import SuggestedUserProfile from "./pages/SuggestedUserProfile";
import EditProfile from "./components/EditProfile";
import ForgotPassword from "./auth/ForgotPassword";
import OtpVerification from "./auth/OtpVerification";
import ResetPassword from "./auth/ResetPassword";
import UploadMedia from "./pages/UploadMedia";
import StoryViewer from "./components/StoryViewer";
import MessageBox from "./components/MessageBox";

import useCurrentUser from "./hooks/useCurrentUser";
import useSuggestUsers from "./hooks/useSuggestUsers";
import useGetAllPosts from "./hooks/useGetAllPosts";
import useGetAllReels from "./hooks/useGetAllReels";
import useGetAllStories from "./hooks/useGetAllStories";
import useGetUserStory from "./hooks/useGetUserStory";

import { setOnlineUsers, setSockets } from "./redux/socketSlice";

export const serverURl = "http://localhost:5000";

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { sockets } = useSelector((state) => state.socket);

  useEffect(() => {
    if (!userData) return;

    // 1️⃣ Create socket connection
    const socketIo = io(serverURl, {
      query: { userID: userData._id },
    });

    // 2️⃣ Save socket in redux
    dispatch(setSockets(socketIo));

    // 3️⃣ Listen for online users
    socketIo.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    // 4️⃣ Cleanup function
    return () => {
      socketIo.disconnect();
      dispatch(setSockets(null));
    };
  }, [userData, dispatch]);

  // Custom hooks for fetching data
  useCurrentUser();
  useSuggestUsers();
  useGetAllPosts();
  useGetAllReels();
  useGetAllStories();
  useGetUserStory();

  return (
    <Routes>
      {/* Protected Routes */}
      <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" replace />} />
      <Route path="/upload-media" element={userData ? <UploadMedia /> : <Navigate to="/signin" replace />} />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/signin" replace />} />
      <Route path="/reels" element={userData ? <ReelsViewer /> : <Navigate to="/signin" replace />} />
      <Route path="/user/:username" element={userData ? <SuggestedUserProfile /> : <Navigate to="/signin" replace />} />
      <Route path="/story-viewer/:id" element={userData ? <StoryViewer /> : <Navigate to="/signin" replace />} />
      <Route path="/edit-profile" element={userData ? <EditProfile /> : <Navigate to="/signin" replace />} />
      <Route path="/chat-window/:id" element={userData ? <MessageBox /> : <Navigate to="/signin" replace />} />

      {/* Public Routes */}
      <Route path="/signin" element={!userData ? <Signin /> : <Navigate to="/" replace />} />
      <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/" replace />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/" replace />} />
      <Route path="/otp-verification" element={!userData ? <OtpVerification /> : <Navigate to="/" replace />} />
      <Route path="/reset-password" element={!userData ? <ResetPassword /> : <Navigate to="/" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

