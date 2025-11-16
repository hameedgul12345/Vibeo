// import React from "react";
// import { useEffect } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import FollowButton from "../components/FollowButton";

// const LeftSidebar = () => {
//   const navigate=useNavigate();

//   // const user = {
//   //   username: "theayushsahu__",
//   //   name: "Ayush Sahu",
//   //   avatar: "https://via.placeholder.com/50", // replace with actual user image
//   // };
//   const { userData: user } = useSelector((state) => state.user);
//   useEffect(()=>{
//     // console.log("suggested users in sidebar",user)
//   },[user])

//   // const suggested = [
//   //   { id: 1, username: "ankush123", name: "Ankush", avatar: "https://via.placeholder.com/45" },
//   //   { id: 2, username: "theadityasahu__", name: "Aditya Sahu", avatar: "https://via.placeholder.com/45" },
//   //   { id: 3, username: "janvi123", name: "Janvi Sahu", avatar: "https://via.placeholder.com/45" },
//   // ];

//   const { suggestUsers: suggested } = useSelector((state) => state.user);
//   return (
//     <div className="flex flex-col w-[25%] bg-black  text-white fixed left-0 top-0  h-screen rounded-2xl overflow-hidden">
//       {/* Top Section */}
//       <div className="p-4">
//         {/* Logo */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold italic tracking-wide">VYBE</h1>
         
//         </div>

//         {/* Profile */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <img
//               src={user.profilePicture || "https://via.placeholder.com/45"}
//               alt={user.username}
//               className="w-10 h-10 rounded-full border border-gray-700 object-cover"
//             />

//             <div>
//               <p className="text-sm font-semibold">{user.username}</p>
//               <p className="text-xs text-gray-400">{user.name}</p>
//             </div>
//           </div>
      
//         </div>

//         {/* Suggested Users */}
//         <div>
//           <h2 className="text-sm font-semibold text-gray-400 mb-3">
//             Suggested Users
//           </h2>
//           <div className="flex flex-col gap-4">
//             {suggested.map((user,index) => (
            
//               <div key={user.id||index} className="flex justify-between items-center">
//                 <div className="flex items-center gap-3" onClick={() => navigate(`/user/${user.userName}`)}
// >
//                   <img
//                     src={user.profilePicture}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full border border-gray-700 object-cover"
//                   />
//                   <div>
//                     <p className="text-sm font-semibold">{user.username}</p>
//                     <p className="text-xs text-gray-400">{user.name}</p>
//                   </div>
//                 </div>
//                 {/* <button className="bg-white text-black text-xs px-3 py-1 rounded-full hover:bg-gray-200">
//                   Follow
//                 </button> */}
//                    <FollowButton targetUserId={user._id} />
//               </div>
//             ))}
//           </div>
//         </div>
//           <button className="fixed bottom-8 left-8 text-sm text-blue-400 hover:underline">
//             Log Out
//           </button>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowButton from "../components/FollowButton";
import axios from "axios";
import { serverURl } from "../App";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { userData: user, suggestUsers: suggested } = useSelector((state) => state.user);
  
const signout = async () => {
   alert("alert")
  try {
    await axios.post(
      `${serverURl}/api/auth/signout`,
      {},
      { withCredentials: true }
    );

    dispatch(clearUserData()); // remove user from Redux
    
    navigate("/login"); // go to login page
  } catch (error) {
    console.log("Logout failed:", error);
  }
};


  useEffect(() => {
    // console.log("Sidebar user data:", user);
  }, [user]);

  return (
    <div className="flex flex-col w-[25%] bg-black text-white fixed left-0 top-0 h-screen rounded-2xl overflow-hidden p-4">
      
      {/* Logo */}
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-extrabold italic tracking-widest text-gradient bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
         VIBEO
        </h1>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 mb-10 p-3 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all cursor-pointer"
           onClick={() => navigate(`/profile`)}>
        <img
          src={user?.profilePicture || "https://via.placeholder.com/50"}
          alt={user?.username}
          className="w-12 h-12 rounded-full border border-gray-700 object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{user?.username}</p>
          <p className="text-xs text-gray-400">{user?.name}</p>
        </div>
      </div>

      {/* Suggested Users */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-4">Suggested Users</h2>
        <div className="flex flex-col gap-4">
          {suggested.map((u, index) => (
            <div
              key={u._id || index}
              className="flex justify-between items-center p-3 rounded-xl bg-gray-900 hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-3" onClick={() => navigate(`/user/${u.userName}`)}>
                <img
                  src={u.profilePicture || "https://via.placeholder.com/45"}
                  alt={u.name}
                  className="w-12 h-12 rounded-full border border-gray-700 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{u.username}</p>
                  <p className="text-xs text-gray-300">{u.name}</p>
                </div>
              </div>

              {/* Follow Button */}
              <FollowButton targetUserId={u._id} />
            </div>
          ))}
        </div>
      </div>

      {/* Log Out */}
      <button
        className="mt-auto px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg hover:from-pink-500 hover:to-red-500 transition-all duration-300"
        onClick={()=>signout()}
     >
        Log Out
      </button>
    </div>
  );
};

export default LeftSidebar;
