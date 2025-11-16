// import React, { useState } from "react";
// import axios from "axios";
// import { serverURl } from "../App";
// import {
//   FaHeart,
//   FaRegComment,
//   FaBookmark,
//   FaHome,
//   FaSearch,
//   FaPlusSquare,
//   FaVideo,
//   FaUser,
//   FaPaperPlane,
// } from "react-icons/fa";
// import { SiYoutubeshorts } from "react-icons/si";

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setAllPosts } from "../redux/postSlice";
// import { useEffect } from "react";

// const PostFeed = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { allPosts } = useSelector((state) => state.post);
//   const { allStories } = useSelector((state) => state.story);
//   // console.log("all stories",allStories)
//   const { stories } = useSelector((state) => state.story);
//   const { userStory } = useSelector((state) => state.story);
//   const { sockets } = useSelector((state) => state.socket);
//   console.log(userStory);

//   console.log("loggedin stories", stories);
//   const { userData } = useSelector((state) => state.user);

//   const [commentText, setCommentText] = useState("");
//   const [activePost, setActivePost] = useState(null);
//   const [commentsData, setCommentsData] = useState({});
//   const [likesData, setLikesData] = useState({});

//   // ✅ Like / Unlike (with instant UI + backend sync)
//   const handleLike = async (postId) => {
//     const userId = userData._id?.toString();

//     // 🔹 Step 1: Instant UI update (optimistic)
//     setLikesData((prev) => {
//       const currentLikes =
//         prev[postId] ||
//         (allPosts.find((p) => p._id === postId)?.likes || []).map((id) =>
//           id.toString()
//         );

//       const isLiked = currentLikes.includes(userId);
//       const updatedLikes = isLiked
//         ? currentLikes.filter((id) => id !== userId)
//         : [...currentLikes, userId];

//       return { ...prev, [postId]: updatedLikes };
//     });

//     try {
//       // 🔹 Step 2: Backend sync
//       const { data } = await axios.put(
//         `${serverURl}/api/post/like/${postId}`,
//         {},
//         { withCredentials: true }
//       );

//       const updatedPost = data?.post;
//       if (!updatedPost) return;

//       // 🔹 Step 3: Update Redux store with real data
//       const updatedPosts = allPosts.map((p) =>
//         p._id === postId ? updatedPost : p
//       );
//       dispatch(setAllPosts(updatedPosts));

//       // 🔹 Step 4: Update likesData with clean backend data
//       setLikesData((prev) => ({
//         ...prev,
//         [postId]: updatedPost.likes.map((id) => id.toString()) || [],
//       }));
//     } catch (error) {
//       console.error("Error while liking/unliking post:", error);
//     }
//   };

//   useEffect(() => {
//     sockets?.on("postLiked", (pst) => {
//       console.log("likedpot render",pst)
//       const updatedData = allPosts.map((p) =>
//         p._id === pst.postID ? { ...p, likes: pst.likes } : p
//       );
//       dispatch(setAllPosts(updatedData))
//     });
//   }, [sockets,dispatch,allPosts]);

//   // 💬 Add Comment
//   const handleAddComment = async (postId) => {
//     if (!commentText.trim()) return;

//     try {
//       const { data } = await axios.post(
//         `${serverURl}/api/post/comment/${postId}`,
//         { text: commentText },
//         { withCredentials: true }
//       );

//       const newComment = data.comment || {
//         user: userData.name,
//         text: commentText,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };

//       setCommentsData((prev) => ({
//         ...prev,
//         [postId]: [...(prev[postId] || []), newComment],
//       }));

//       setCommentText("");
//     } catch (error) {
//       console.error("Error while adding comment:", error);
//     }
//   };

//   // 🧠 Check if user liked (string-safe)
//   const hasUserLiked = (post) => {
//     const likesArray =
//       likesData[post._id] ||
//       (Array.isArray(post.likes) ? post.likes.map((id) => id.toString()) : []);
//     return likesArray.includes(userData._id?.toString());
//   };

//   return (
//     <>
//       <div className="w-full">
//         <div className="flex z-10 overflow-hidden  md:w-[50%] w-full   md:fixed top-0 left-[25%]  space-x-4 overflow-x-auto scrollbar-hide p-4 bg-[#090F1B]">
//           {userStory && userStory.length > 0 ? (
//             userStory.map((uStory, index) => (
//               <div
//                 key={uStory._id || index}
//                 onClick={() => navigate(`/story-viewer/${uStory._id}`)}
//                 className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-blue-700 relative"
//               >
//                 {/* {uStory.mediaType === "video" ? (
//                   <video
//                     src={uStory.media}
//                     className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B]"
//                     muted
//                     loop
//                     autoPlay
//                   />
//                 ) : (
//                   <img
//                     src={uStory.media}
//                     alt={uStory.author?.name || "Story"}
//                     className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B]"
//                   />
//                 )} */}
//                 <img
//                   src={uStory.author.profilePicture}
//                   className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B]"
//                   alt=""
//                 />
//                 <p className="text-xs mt-1 truncate w-16 text-center">
//                   {uStory.author?.name || "User"}
//                 </p>
//               </div>
//             ))
//           ) : (
//             // 👇 Dummy "Add Story" placeholder
//             <div className="w-16 h-16 border-2 border-blue-600 rounded-full p-[2px] bg-gradient-to-tr from-gray-500 to-gray-700 relative flex items-center justify-center">
//               {/* <img
//                 src="https://via.placeholder.com/150/090F1B/FFFFFF?text=+"
//                 alt="Add Story"
//                 className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B] opacity-80"
//               /> */}
//               {/* Plus icon overlay */}
//               <div className="absolute bottom-0 right-0 bg-blue-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-sm font-bold border-2 border-black">
//                 +
//               </div>
//               <p className="text-xs mt-1 truncate w-16 text-gray-400 text-center">
//                 Add Story
//               </p>
//             </div>
//           )}

//           {allStories.map((story, index) => (
//             <div
//               key={story._id || index}
//               onClick={() => navigate(`/story-viewer/${story._id}`)}
//               className="flex flex-col items-center text-center min-w-[70px]"
//             >
//               <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-blue-700">
//                 <video
//                   src={story.media}
//                   className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B]"
//                 ></video>
//                 {/* <img
//                 src={story.media}
//                 alt={story.author.name}
//                 className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B]"
//               /> */}
//               </div>
//               <p className="text-xs mt-1 truncate w-16">{story.author.name}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col items-center  border-2 md:w-[100%] mt-36 rounded-2xl w-full    min-h-[450px] bg-white text-white pb-20">
//           <div className="w-full flex flex-col items-center mt-2">
//             {allPosts && allPosts.length > 0 ? (
//               allPosts.map((post) => {
//                 const displayedComments = [
//                   ...(post.comments || []),
//                   ...(commentsData[post._id] || []),
//                 ];
//                 const likes =
//                   likesData[post._id] ||
//                   (Array.isArray(post.likes)
//                     ? post.likes.map((id) => id.toString())
//                     : []);
//                 const userLiked = hasUserLiked(post);

//                 return (
//                   <div
//                     key={post._id}
//                     className="md:w-[98%] sm:w-[500px] bg-[#111] rounded-2xl mb-8 p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
//                     style={{
//                       boxShadow:
//                         "rgba(255, 255, 255, 0.05) 0px 1px 3px 0px, rgba(255, 255, 255, 0.05) 0px 1px 2px 0px",
//                     }}
//                   >
//                     {/* Header */}
//                     <div className="flex items-center justify-between space-x-3 mb-3">
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={
//                             post.author?.profilePicture ||
//                             "https://via.placeholder.com/40"
//                           }
//                           alt="avatar"
//                           className="w-10 h-10 rounded-full object-cover border border-gray-600"
//                         />
//                         <span className="font-semibold text-sm text-white">
//                           {post.author?.name || "Unknown User"}
//                         </span>
//                       </div>
//                       <button className="bg-white text-black text-xs px-3 py-1 rounded-full hover:bg-gray-200">
//                         Follow
//                       </button>
//                     </div>

//                     {/* Post Image */}
//                     <div className="rounded-xl overflow-hidden">
//                       <img
//                         src={
//                           post.media ||
//                           "https://via.placeholder.com/400x400.png?text=No+Image"
//                         }
//                         alt="post"
//                         className="w-full object-cover hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>

//                     {/* Footer icons */}
//                     <div className="flex justify-between items-center mt-3 text-gray-300">
//                       <div className="flex items-center space-x-4">
//                         {/* ❤️ Like Icon */}
//                         <FaHeart
//                           className={`cursor-pointer transition-colors ${
//                             userLiked
//                               ? "text-red-500"
//                               : "text-gray-300 hover:text-red-500"
//                           }`}
//                           onClick={() => handleLike(post._id)}
//                         />

//                         {/* 💬 Comment Icon */}
//                         <FaRegComment
//                           className="hover:text-blue-500 cursor-pointer transition-colors"
//                           onClick={() =>
//                             setActivePost(
//                               activePost === post._id ? null : post._id
//                             )
//                           }
//                         />
//                       </div>

//                       {/* 🔖 Bookmark */}
//                       {userData.saved.includes(post._id) ? (
//                         <FaBookmark className="hover:text-yellow-500 cursor-pointer transition-colors" />
//                       ) : (
//                         <FaBookmark className="hover:text-gray-100 cursor-pointer transition-colors" />
//                       )}
//                     </div>

//                     {/* Likes & Comments Count */}
//                     <div className="text-sm mt-2 text-gray-400">
//                       <p>
//                         <strong className="text-white">{likes.length}</strong>{" "}
//                         likes •{" "}
//                         <strong className="text-white">
//                           {displayedComments.length}
//                         </strong>{" "}
//                         comments
//                       </p>
//                     </div>

//                     {/* --- Comment Section --- */}
//                     {activePost === post._id && (
//                       <div className="mt-3 bg-[#222] p-3 rounded-xl">
//                         <div className="max-h-40 overflow-y-auto space-y-2 mb-2">
//                           {displayedComments.map((c, i) => (
//                             <div key={i} className="text-sm text-gray-300">
//                               <strong className="text-white">{c.user}</strong>:{" "}
//                               {c.text}
//                               <span className="text-xs text-gray-500 ml-2">
//                                 {c.time}
//                               </span>
//                             </div>
//                           ))}
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           <img
//                             src={
//                               userData?.profilePicture ||
//                               "https://via.placeholder.com/40"
//                             }
//                             alt=""
//                             className="w-8 h-8 rounded-full"
//                           />
//                           <input
//                             type="text"
//                             value={commentText}
//                             onChange={(e) => setCommentText(e.target.value)}
//                             placeholder="Add a comment..."
//                             className="flex-1 p-2 rounded-lg bg-[#333] text-white placeholder-gray-500 outline-none"
//                           />
//                           <FaPaperPlane
//                             className={`text-blue-400 cursor-pointer hover:text-blue-300 ${
//                               !commentText.trim()
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : ""
//                             }`}
//                             onClick={() => handleAddComment(post._id)}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-gray-400 mt-10">No posts available yet.</p>
//             )}
//           </div>

//           {/* ✅ Floating Bottom Nav */}
//           <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[500px] bg-black/90 text-white flex justify-around items-center py-3 rounded-2xl shadow-2xl z-50 backdrop-blur-md">
//             <FaHome
//               className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110"
//               size={22}
//             />
//             <FaSearch
//               className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110"
//               size={22}
//             />
//             <FaPlusSquare
//               className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110"
//               size={22}
//               onClick={() => navigate("/upload-media")}
//             />
//             <SiYoutubeshorts
//               className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110"
//               size={24}
//               onClick={() => navigate("/reels")} // 🔥 Open Reels page
//             />

//             <FaUser
//               className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110"
//               onClick={() => navigate(`/profile`)}
//               size={22}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PostFeed;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverURl } from "../App";
import {
  FaHeart,
  FaRegComment,
  FaBookmark,
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllPosts } from "../redux/postSlice";

const PostFeed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.post);
  const { allStories, userStory } = useSelector((state) => state.story);
  const { userData } = useSelector((state) => state.user);
  const { sockets } = useSelector((state) => state.socket);

  const [commentText, setCommentText] = useState("");
  const [activePost, setActivePost] = useState(null);
  const [commentsData, setCommentsData] = useState({});
  const [likesData, setLikesData] = useState({});

  // Like / Unlike handler
  const handleLike = async (postId) => {
    const userId = userData._id?.toString();

    // Optimistic UI update
    setLikesData((prev) => {
      const currentLikes =
        prev[postId] || allPosts.find((p) => p._id === postId)?.likes.map((id) => id.toString());
      const isLiked = currentLikes.includes(userId);
      const updatedLikes = isLiked
        ? currentLikes.filter((id) => id !== userId)
        : [...currentLikes, userId];
      return { ...prev, [postId]: updatedLikes };
    });

    try {
      const { data } = await axios.put(
        `${serverURl}/api/post/like/${postId}`,
        {},
        { withCredentials: true }
      );

      const updatedPost = data?.post;
      if (!updatedPost) return;

      // Update Redux store
      dispatch(setAllPosts(allPosts.map((p) => (p._id === postId ? updatedPost : p))));

      // Sync likesData
      setLikesData((prev) => ({
        ...prev,
        [postId]: updatedPost.likes.map((id) => id.toString()) || [],
      }));
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  useEffect(() => {
    sockets?.on("postLiked", (pst) => {
      const updatedData = allPosts.map((p) =>
        p._id === pst.postID ? { ...p, likes: pst.likes } : p
      );
      dispatch(setAllPosts(updatedData));
    });
  }, [sockets, dispatch, allPosts]);

  const handleAddComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      const { data } = await axios.post(
        `${serverURl}/api/post/comment/${postId}`,
        { text: commentText },
        { withCredentials: true }
      );

      const newComment = data.comment || {
        user: userData.name,
        text: commentText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setCommentsData((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const hasUserLiked = (post) => {
    const likesArray =
      likesData[post._id] || (post.likes?.map((id) => id.toString()) || []);
    return likesArray.includes(userData._id?.toString());
  };

  return (
    <div className="w-full">
      {/* Story Carousel */}
      <div className="flex z-10 overflow-x-auto space-x-4 scrollbar-hide p-4 bg-[#090F1B] md:w-[50%] md:fixed top-0 left-[25%]">
        {/* User Stories */}
        {userStory?.length > 0
          ? userStory.map((uStory) => (
              <div
                key={uStory._id}
                onClick={() => navigate(`/story-viewer/${uStory._id}`)}
                className="flex flex-col items-center w-16 cursor-pointer"
              >
                <div className="w-16 h-16 p-[2px] rounded-full bg-gradient-to-tr from-blue-500 to-blue-700">
                  <img
                    src={uStory.author.profilePicture}
                    alt=""
                    className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B]"
                  />
                </div>
                <p className="text-xs mt-1 truncate text-center">{uStory.author?.name}</p>
              </div>
            ))
          : (
            <div className="flex flex-col items-center w-16 cursor-pointer">
              <div className="w-16 h-16 p-[2px] rounded-full bg-gray-600 flex items-center justify-center relative">
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-bold border-2 border-black">
                  +
                </div>
              </div>
              <p className="text-xs mt-1 text-gray-400 text-center truncate">Add Story</p>
            </div>
          )}

        {/* All Stories */}
        {allStories?.map((story) => (
          <div
            key={story._id}
            onClick={() => navigate(`/story-viewer/${story._id}`)}
            className="flex flex-col items-center w-16 cursor-pointer"
          >
            <div className="w-16 h-16 p-[2px] rounded-full bg-gradient-to-tr from-blue-500 to-blue-700">
              <video
                src={story.media}
                className="w-full h-full object-cover rounded-full border-[2px] border-[#090F1B]"
              />
            </div>
            <p className="text-xs mt-1 truncate text-center">{story.author.name}</p>
          </div>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="flex flex-col items-center md:w-[100%] mt-36 pb-20">
        {allPosts?.length > 0 ? (
          allPosts.map((post) => {
            const displayedComments = [...(post.comments || []), ...(commentsData[post._id] || [])];
            const likes = likesData[post._id] || post.likes?.map((id) => id.toString()) || [];
            const userLiked = hasUserLiked(post);

            return (
              <div
                key={post._id}
                className="md:w-[98%] sm:w-[500px] bg-[#111] rounded-2xl mb-8 p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author?.profilePicture || "https://via.placeholder.com/40"}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                    <span className="font-semibold text-sm text-white">{post.author?.name || "Unknown"}</span>
                  </div>
                  <button className="bg-white text-black text-xs px-3 py-1 rounded-full hover:bg-gray-200">
                    Follow
                  </button>
                </div>

                {/* Post Image */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={post.media || "https://via.placeholder.com/400x400.png?text=No+Image"}
                    alt="post"
                    className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Footer Icons */}
                <div className="flex justify-between items-center mt-3 text-gray-300">
                  <div className="flex items-center space-x-4">
                    <FaHeart
                      className={`cursor-pointer transition-colors ${userLiked ? "text-red-500" : "hover:text-red-500"}`}
                      onClick={() => handleLike(post._id)}
                    />
                    <FaRegComment
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => setActivePost(activePost === post._id ? null : post._id)}
                    />
                  </div>
                  <FaBookmark className={`cursor-pointer transition-colors ${userData.saved.includes(post._id) ? "hover:text-yellow-500" : "hover:text-gray-100"}`} />
                </div>

                {/* Likes & Comments */}
                <div className="text-sm mt-2 text-gray-400">
                  <p>
                    <strong className="text-white">{likes.length}</strong> likes •{" "}
                    <strong className="text-white">{displayedComments.length}</strong> comments
                  </p>
                </div>

                {/* Comment Section */}
                {activePost === post._id && (
                  <div className="mt-3 bg-[#222] p-3 rounded-xl">
                    <div className="max-h-40 overflow-y-auto space-y-2 mb-2">
                      {displayedComments.map((c, i) => (
                        <div key={i} className="text-sm text-gray-300">
                          <strong className="text-white">{c.user}</strong>: {c.text}
                          <span className="text-xs text-gray-500 ml-2">{c.time}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src={userData?.profilePicture || "https://via.placeholder.com/40"}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 p-2 rounded-lg bg-[#333] text-white placeholder-gray-500 outline-none"
                      />
                      <FaPaperPlane
                        className={`text-blue-400 cursor-pointer hover:text-blue-300 ${!commentText.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleAddComment(post._id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 mt-10">No posts available yet.</p>
        )}
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[500px] bg-black/90 text-white flex justify-around items-center py-3 rounded-2xl shadow-2xl z-50 backdrop-blur-md">
        <FaHome className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110" size={22} />
        <FaSearch className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110" size={22} />
        <FaPlusSquare className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110" size={22} onClick={() => navigate("/upload-media")} />
        <SiYoutubeshorts className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110" size={24} onClick={() => navigate("/reels")} />
        <FaUser className="cursor-pointer hover:text-gray-300 transition transform hover:scale-110" onClick={() => navigate("/profile")} size={22} />
      </div>
    </div>
  );
};

export default PostFeed;
