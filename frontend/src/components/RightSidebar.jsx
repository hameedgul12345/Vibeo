import React from "react";
import { useSelector } from "react-redux";

function RightSidebar() {
  const { onlineUsers } = useSelector((state) => state.socket);
  const { suggestUsers } = useSelector((state) => state.user);
  console.log("online users'",onlineUsers)

  // Show only online users
  const onlineOnly = suggestUsers.filter((user) =>
    onlineUsers.includes(user._id)
  );

  return (
    <div className="w-full border-y border-gray-800 py-4 bg-[#0d0d0d]">
      <h1>Messsages</h1>
  <div className="flex flex-row gap-6 px-4 overflow-x-auto no-scrollbar">
    {onlineOnly.map((user) => (
      <div
        key={user._id}
        className="relative group cursor-pointer transition"
      >
        {/* Profile Image */}
        <img
          src={user.profilePicture}
          alt="online user"
          className="w-14 h-14 rounded-full object-cover border border-gray-700 
                     group-hover:scale-110 transition-transform duration-200"
        />

        {/* Online Dot */}
        <span
          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 
                     rounded-full border-2 border-black shadow-md"
        ></span>
      </div>
    ))}
  </div>
</div>

  );
}

export default RightSidebar;


// import React from "react";
// import { useSelector } from "react-redux";

// function RightSidebar() {
//   const { onlineUsers } = useSelector((state) => state.socket);
//   const { suggestUsers } = useSelector((state) => state.user);

//   const onlineOnly = suggestUsers.filter((user) =>
//     onlineUsers.includes(user._id)
//   );

//   return (
//     <div className="fixed right-0 top-0 h-full w-[90px] bg-[#111] border-l border-gray-800 flex flex-col p-4">

//       {/* Title */}
//       <h2 className="text-gray-300 text-sm font-semibold mb-3 text-center">
//         Online
//       </h2>

//       {/* Online Users Row */}
//       <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar items-center">

//         {onlineOnly.map((user) => (
//           <div
//             key={user._id}
//             className="relative group cursor-pointer flex flex-col items-center"
//           >
//             {/* Avatar */}
//             <img
//               src={user.profilePicture}
//               alt="online user"
//               className="w-12 h-12 rounded-full object-cover border border-gray-700 group-hover:scale-110 transition-all duration-150"
//             />

//             {/* Online Dot */}
//             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black"></span>
//           </div>
//         ))}

//         {/* If no online users */}
//         {onlineOnly.length === 0 && (
//           <p className="text-xs text-gray-500 text-center mt-4">No one online</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RightSidebar;




// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function RightSidebar() {
//   const { onlineUsers } = useSelector((state) => state.socket);
//   const { suggestUsers } = useSelector((state) => state.user);

//   return (
//     <div className="fixed right-3 top-20 flex flex-col gap-4">
//       {suggestUsers.map((user) => (
//         <div key={user._id} className="relative group">
//           {/* Profile Image */}
//           <img
//             src={user.profilePicture}
//             alt={user.username}
//             className="w-12 h-12 rounded-full object-cover border-2 
//                        border-gray-600 group-hover:border-green-500 
//                        transition duration-200 cursor-pointer"
//           />

//           {/* Online Dot */}
//           {onlineUsers.includes(user._id) && (
//             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
//                              rounded-full border-2 border-black"></span>
//           )}

//           {/* Hover Tooltip */}
//           <div
//             className="absolute right-14 top-1/2 -translate-y-1/2 
//                        bg-black text-white px-3 py-1 rounded-lg text-sm 
//                        opacity-0 group-hover:opacity-100 transition 
//                        pointer-events-none whitespace-nowrap shadow-lg"
//           >
//             {user.name || user.userName}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RightSidebar;
