import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverURl } from "../App";

function RightSidebar() {
  const { onlineUsers } = useSelector((state) => state.socket);
  const { suggestUsers } = useSelector((state) => state.user);

  const [recentUsers, setRecentUsers] = useState([]);

  // Show only online users from recent chats
  const onlineOnly = recentUsers.filter((user) =>
    onlineUsers.includes(user._id)
  );

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await axios.get(
          `${serverURl}/api/user/recentUsers`,
          { withCredentials: true }
        );

        setRecentUsers(res.data);
        console.log("chat with these users",res.data)
      } catch (error) {
        console.error("Failed to load recent users:", error);
      }
    };

    fetchRecentUsers(); // ✅ YOU FORGOT THIS
  }, []);

  return (
    <div className="w-full border-y border-gray-800 py-4 bg-[#0d0d0d]">
      <h1>Messages</h1>

      <div className="flex flex-row gap-6 px-4 overflow-x-auto no-scrollbar">
        {onlineOnly.map((user) => (
          <div key={user._id} className="relative group cursor-pointer transition">
            <img
              src={user.profilePicture}
              alt="online user"
              className="w-14 h-14 rounded-full object-cover border border-gray-700 
                         group-hover:scale-110 transition-transform duration-200"
            />

            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 
                         rounded-full border-2 border-black shadow-md"
            ></span>
          </div>
        ))}

        {onlineOnly.length === 0 && (
          <p className="text-gray-500 text-sm">No friends online</p>
        )}
      </div>
      {recentUsers.map((user,index)=>{
        return(<div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg mt-4 cursor-pointer">
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-700"
          />
          <span className="text-white">{user.name}</span>
        </div>
        )
      })}
    </div>
  );
}

export default RightSidebar;
