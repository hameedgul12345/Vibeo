// import React, { useEffect, useState } from "react";
// import FollowButton from "../components/FollowButton";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setProfileData } from "../redux/userSlice";
// import { serverURl } from "../App";
// import { FaArrowLeft, FaHome, FaSearch, FaPlusSquare, FaRegHeart, FaUser } from "react-icons/fa";

// const Profile = () => {
//   const { userName } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { selectedUser, userData, suggestedUsers } = useSelector((state) => state.user);

//   const [activeTab, setActiveTab] = useState("posts");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!userName) return;

//       try {
//         // ✅ 1. Check if it's the logged-in user
//         if (userName === userData?.userName) {
//           dispatch(setProfileData(userData));
//           return;
//         }

//         // ✅ 2. Check if the user exists in suggestedUsers
//         const matchedUser = suggestedUsers?.find(
//           (user) => user.userName === userName
//         );

//         if (matchedUser) {
//           // If user found in suggested list, fetch that user's profile
//           const { data } = await axios.get(
//             `${serverURl}/api/user/profile/${matchedUser.userName}`,
//             { withCredentials: true }
//           );
//           dispatch(setProfileData(data.user));
//         } else {
//           // ✅ 3. Otherwise, fallback to fetching directly by username
//           const { data } = await axios.get(
//             `${serverURl}/api/user/profile/${userName}`,
//             { withCredentials: true }
//           );
//           dispatch(setProfileData(data.user));
//         }
//       } catch (err) {
//         console.error("❌ Error fetching profile data:", err);
//       }
//     };

//     fetchProfile();
//   }, [userName, userData, suggestedUsers, dispatch]);

//   if (!selectedUser) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-300">
//         Loading profile...
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-black">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-white justify-center w-8 h-8 rounded-full hover:bg-gray-800 transition"
//         >
//           <FaArrowLeft size={18} />
//         </button>
//       </div>

//       <div className="bg-black min-h-screen flex justify-center text-white">
//         <div className="w-full max-w-[430px] relative pb-24">
//           <h1 className="text-sm text-center font-semibold">
//             {selectedUser.userName}
//           </h1>

//           {/* --- Profile Header --- */}
//           <div className="flex flex-col items-center mt-4">
//             <img
//               src={
//                 selectedUser.profilePicture ||
//                 "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               }
//               alt="Profile"
//               className="w-28 h-28 rounded-full object-cover border border-gray-700"
//             />
//             <h2 className="text-xl font-semibold mt-2">{selectedUser.name}</h2>
//             <p className="text-gray-400 text-sm">
//               {selectedUser.bio || "Youtuber | MERN DEVELOPER"}
//             </p>

//             {/* --- Stats --- */}
//             <div className="flex justify-center gap-10 mt-4">
//               <div className="text-center">
//                 <p className="text-lg font-semibold">
//                   {selectedUser.posts?.length || 0}
//                 </p>
//                 <p className="text-xs text-gray-400">Posts</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-lg font-semibold">
//                   {selectedUser.followers?.length || 0}
//                 </p>
//                 <p className="text-xs text-gray-400">Followers</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-lg font-semibold">
//                   {selectedUser.following?.length || 0}
//                 </p>
//                 <p className="text-xs text-gray-400">Following</p>
//               </div>
//             </div>

//             {/* --- Follow / Edit Button --- */}
//             {userData?.userName === selectedUser?.userName ? (
//               <div className="mt-4">
//                 <button
//                   className="px-4 py-1 border border-gray-500 rounded-full text-sm hover:bg-gray-800 transition"
//                   onClick={() => navigate("/edit-profile")}
//                 >
//                   Edit Profile
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-4 flex gap-3">
//                 <FollowButton targetUserId={selectedUser._id} />
//                 {/* <FollowButton targetUserId={matchedUser.following.includes(userData._id)? matchedUser._id : null} /> */}
//                 <button className="px-4 py-1 border border-gray-500 rounded-full text-sm hover:bg-gray-800 transition">
//                   Message
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* --- Content Container --- */}
//           <div className="bg-white rounded-t-3xl mt-8 pt-6 pb-20 text-black">
//             {/* Tabs */}
//             <div className="flex justify-center gap-6">
//               <button
//                 onClick={() => setActiveTab("posts")}
//                 className={`px-6 py-2 rounded-full font-medium ${
//                   activeTab === "posts"
//                     ? "bg-black text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 Posts
//               </button>
//               <button
//                 onClick={() => setActiveTab("saved")}
//                 className={`px-6 py-2 rounded-full font-medium ${
//                   activeTab === "saved"
//                     ? "bg-black text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 Saved
//               </button>
//             </div>

//             {/* Posts Section */}
//             <div className="mt-8 px-4">
//               {activeTab === "posts" ? (
//                 selectedUser.posts?.length ? (
//                   <div className="grid grid-cols-3 gap-1">
//                     {selectedUser.posts.map((post, i) => (
//                       <img
//                         key={i}
//                         src={post.media || "https://via.placeholder.com/150"}
//                         alt="post"
//                         className="w-full h-32 object-cover"
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-600 text-center mt-10">
//                     No posts yet
//                   </p>
//                 )
//               ) : (
//                 <p className="text-gray-600 text-center mt-10">
//                   No saved posts
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* --- Bottom Navigation --- */}
//           <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black text-white flex justify-around items-center py-3 rounded-t-2xl shadow-lg">
//             <FaHome size={22} className="cursor-pointer hover:text-gray-300" />
//             <FaSearch
//               size={22}
//               className="cursor-pointer hover:text-gray-300"
//             />
//             <FaPlusSquare
//               size={22}
//               className="cursor-pointer hover:text-gray-300"
//             />
//             <FaRegHeart
//               size={22}
//               className="cursor-pointer hover:text-gray-300"
//             />
//             <FaUser size={22} className="cursor-pointer hover:text-gray-300" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setProfileData } from "../redux/userSlice";
// import { serverURl } from "../App";
// import { FaArrowLeft, FaHome, FaSearch, FaPlusSquare, FaRegHeart, FaUser } from "react-icons/fa";

// const Profile = () => {
//   const { userName } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { profileData, userData } = useSelector((state) => state.user);
//   const [activeTab, setActiveTab] = useState("posts");
//   const [loading, setLoading] = useState(true);

//   // Fetch profile data based on userName
//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       try {
//         // If userName matches logged-in user, use userData
//         if (userName === userData.userName) {
//           dispatch(setProfileData(userData));
//         } else {
//           const { data } = await axios.get(`${serverURl}/api/user/profile/${userName}`, {
//             withCredentials: true,
//           });
//           dispatch(setProfileData(data.user));
//         }
//       } catch (err) {
//         console.error("Error fetching profile data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [userName, dispatch, userData]);

//   // Check if profile belongs to logged-in user
//   const isMyProfile = profileData?.userName === userData?.userName;

//   // Check if logged-in user is following this profile
//   const isFollowing = profileData?.followers?.some(f => f._id === userData?._id);

//   // Handle follow/unfollow
//   const handleFollow = async (targetUserId) => {
//     try {
//       const { data } = await axios.put(
//         `${serverURl}/api/user/follow/${targetUserId}`,
//         {},
//         { withCredentials: true }
//       );
//       // Refresh profile data after follow/unfollow
//       dispatch(setProfileData(data.user));
//     } catch (err) {
//       console.error("Error following/unfollowing:", err);
//     }
//   };

//   if (loading || !profileData) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-300">
//         Loading profile...
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Back Button */}
//       <div className="bg-black p-2">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-white justify-center w-8 h-8 rounded-full hover:bg-gray-800 transition"
//         >
//           <FaArrowLeft size={18} />
//         </button>
//       </div>

//       <div className="bg-black min-h-screen flex justify-center text-white">
//         <div className="w-full max-w-[430px] relative pb-24">
//           <h1 className="text-sm text-center font-semibold">{profileData.userName}</h1>

//           {/* Profile Header */}
//           <div className="flex flex-col items-center mt-4">
//             <img
//               src={profileData.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//               alt="Profile"
//               className="w-28 h-28 rounded-full object-cover border border-gray-700"
//             />
//             <h2 className="text-xl font-semibold mt-2">{profileData.name}</h2>
//             <p className="text-gray-400 text-sm">
//               {profileData.bio || "Youtuber | MERN DEVELOPER"}
//             </p>

//             {/* Stats */}
//             <div className="flex justify-center gap-10 mt-4">
//               <div className="text-center">
//                 <p className="text-lg font-semibold">{profileData.posts?.length || 0}</p>
//                 <p className="text-xs text-gray-400">Posts</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-lg font-semibold">{profileData.followers?.length || 0}</p>
//                 <p className="text-xs text-gray-400">Followers</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-lg font-semibold">{profileData.following?.length || 0}</p>
//                 <p className="text-xs text-gray-400">Following</p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             {isMyProfile ? (
//               <button
//                 className="mt-4 px-4 py-1 border border-gray-500 rounded-full text-sm hover:bg-gray-800 transition"
//                 onClick={() => navigate("/edit-profile")}
//               >
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="mt-4 flex gap-3">
//                 <button
//                   className="px-4 py-1 border border-gray-500 rounded-full text-sm hover:bg-gray-800 transition"
//                   onClick={() => handleFollow(profileData._id)}
//                 >
//                   {isFollowing ? "Unfollow" : "Follow"}
//                 </button>
//                 <button
//                   className="px-4 py-1 border border-gray-500 rounded-full text-sm hover:bg-gray-800 transition"
//                 >
//                   Message
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Content */}
//           <div className="bg-white rounded-t-3xl mt-8 pt-6 pb-20 text-black">
//             <div className="flex justify-center gap-6">
//               <button
//                 onClick={() => setActiveTab("posts")}
//                 className={`px-6 py-2 rounded-full font-medium ${
//                   activeTab === "posts" ? "bg-black text-white" : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 Posts
//               </button>
//               <button
//                 onClick={() => setActiveTab("saved")}
//                 className={`px-6 py-2 rounded-full font-medium ${
//                   activeTab === "saved" ? "bg-black text-white" : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 Saved
//               </button>
//             </div>

//             {/* Posts Grid */}
//             <div className="mt-8 px-4">
//               {activeTab === "posts" ? (
//                 profileData.posts?.length ? (
//                   <div className="grid grid-cols-3 gap-1">
//                     {profileData.posts.map((post, i) => (
//                       <img
//                         key={i}
//                         src={post.image || "https://via.placeholder.com/150"}
//                         alt="post"
//                         className="w-full h-32 object-cover"
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-600 text-center mt-10">No posts yet</p>
//                 )
//               ) : (
//                 <p className="text-gray-600 text-center mt-10">No saved posts</p>
//               )}
//             </div>
//           </div>

//           {/* Bottom Navigation */}
//           <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black text-white flex justify-around items-center py-3 rounded-t-2xl shadow-lg">
//             <FaHome size={22} className="cursor-pointer hover:text-gray-300" />
//             <FaSearch size={22} className="cursor-pointer hover:text-gray-300" />
//             <FaPlusSquare size={22} className="cursor-pointer hover:text-gray-300" />
//             <FaRegHeart size={22} className="cursor-pointer hover:text-gray-300" />
//             <FaUser size={22} className="cursor-pointer hover:text-gray-300" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaRegHeart,
  FaUser,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("posts");

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-[430px] p-3 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition"
        >
          <FaArrowLeft size={18} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="w-full max-w-[430px] flex flex-col items-center bg-gray-900 rounded-xl p-6 shadow-md">
        <img
          src={
            userData.profilePicture ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-gray-700 object-cover shadow-lg"
        />
        <h2 className="text-2xl font-bold mt-3">{userData.name}</h2>
        <p className="text-gray-400 text-center mt-1">{userData.bio || "Youtuber | MERN DEVELOPER"}</p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-4 w-full">
          <div className="text-center">
            <p className="text-lg font-semibold">{userData.posts?.length || 0}</p>
            <p className="text-xs text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{userData.followers?.length || 0}</p>
            <p className="text-xs text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{userData.following?.length || 0}</p>
            <p className="text-xs text-gray-400">Following</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          className="mt-4 px-6 py-2 rounded-full border border-gray-500 text-sm font-medium hover:bg-gray-800 transition shadow-md"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-[430px] mt-6 px-4 flex justify-center gap-6">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-6 py-2 rounded-full font-medium ${
            activeTab === "posts"
              ? "bg-black text-white shadow-md"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-6 py-2 rounded-full font-medium ${
            activeTab === "saved"
              ? "bg-black text-white shadow-md"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Saved
        </button>
      </div>

      {/* Posts Grid */}
      <div className="w-full max-w-[430px] mt-4 px-2">
        {activeTab === "posts" ? (
          userData.posts?.length ? (
            <div className="grid grid-cols-3 gap-1">
              {userData.posts.map((post, i) => (
                <img
                  key={i}
                  src={post.media || "https://via.placeholder.com/150"}
                  alt="post"
                  className="w-full h-32 object-cover rounded-md hover:scale-105 transition-transform"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-10">No posts yet</p>
          )
        ) : (
          <p className="text-gray-600 text-center mt-10">No saved posts</p>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black text-white flex justify-around items-center py-3 rounded-t-2xl shadow-lg">
        <FaHome size={22} className="cursor-pointer hover:text-gray-300" />
        <FaSearch size={22} className="cursor-pointer hover:text-gray-300" />
        <FaPlusSquare size={22} className="cursor-pointer hover:text-gray-300" />
        <FaRegHeart size={22} className="cursor-pointer hover:text-gray-300" />
        <FaUser size={22} className="cursor-pointer hover:text-gray-300" />
      </div>
    </div>
  );
};

export default Profile;
