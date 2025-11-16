
// import React, { useState, useRef, useEffect } from "react";
// import { FaPaperPlane, FaImage } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { serverURl } from "../App";
// import { setMessages, addMessage } from "../redux/messageSlice";

// const MessageBox = () => {
//   const { id } = useParams(); // target user id
//   const dispatch = useDispatch();
//   const messages = useSelector((state) => state.message.messages);
//   console.log("new Messages",messages)

//   // Updated to use 'sockets' from Redux
//   const { sockets } = useSelector((state) => state.socket);

//   const suggestUsers = useSelector((state) => state.user.suggestUsers);
//   const selectedUser = suggestUsers.find((user) => user._id === id);

//   const scrollRef = useRef();
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Scroll to bottom on new message
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Fetch all messages on mount
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${serverURl}/api/message/getAll/${id}`, { withCredentials: true });
//         dispatch(setMessages(res.data.data));
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };
//     fetchMessages();
//   }, [id, dispatch]);

//   // Handle image selection
//   const handleImageChange = (e) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   // Send message
//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!newMessage && !selectedImage) return;

//     const formData = new FormData();
//     formData.append("receiver", id);
//     if (newMessage) formData.append("text", newMessage);
//     if (selectedImage) formData.append("media", selectedImage);

//     try {
//       const res = await axios.post(`${serverURl}/api/message/send`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const sentMessage = res.data.data;
//       dispatch(addMessage(sentMessage));
//       setNewMessage("");
//       setSelectedImage(null);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Listen for real-time incoming messages
//   useEffect(() => {
//     if (!sockets) return;

//     // const handleNewMessage = (msg) => {
//     //   // Only add messages related to this chat
//     //   if (msg.sender === id || msg.receiver === id) {
//     //     // dispatch(addMessage(msg));
//     //     // dispatch(addMessage(msg));
//     //     dispatch(setMessages([...messages,msg]));
//     //   }
//     // };

//     sockets.on("newMessage", (mesg)=>{
//       dispatch(setMessages([...messages,mesg]))
//     });

//     return () => {
//       sockets.off("newMessage");
//     };
//   }, [messages,setMessages]);

//   return (
//     <div className="flex flex-col min-h-screen bg-[#0b0b0b] text-gray-200 overflow-hidden relative">
//       {/* Header */}
//       <div className="bg-[#1a1a1a] fixed top-0 left-0 w-full z-10 p-4 border-b border-gray-700 flex items-center gap-3">
//         <img
//           src={selectedUser?.profilePicture}
//           alt="User"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <h2 className="font-semibold text-white">{selectedUser?.name}</h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-3 pb-24">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             ref={scrollRef}
//             className={`flex ${msg.receiver === id ? "justify-start" : "justify-end"}`}
//           >
//             <div
//               className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
//                 msg.sender === id
//                   ? "bg-[#1f1f1f] text-gray-200"
//                   : "bg-green-600 text-white"
//               }`}
//             >
//               {msg.text && <div className="flex flex-col"><img className="w-10 h-10 rounded-full object-cover" src={msg.sender.profilePicture} alt="" /><p>{msg.text}</p></div>}
//               {msg.media && (
//                 <img src={msg.media} alt="sent" className="mt-2 w-60 rounded-lg" />
//               )}
//               <p className="text-xs mt-1 opacity-70 text-right text-gray-200">
//                 {new Date(msg.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <form
//         onSubmit={handleSend}
//         className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] bg-[#1a1a1a] border border-gray-700 rounded-full p-2 flex items-center gap-3 shadow-md"
//       >
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 p-3 bg-transparent text-white focus:outline-none"
//         />

//         <label className="cursor-pointer">
//           <FaImage className="text-gray-400 text-2xl hover:text-green-400 transition" />
//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             onChange={handleImageChange}
//           />
//         </label>

//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full transition"
//         >
//           <FaPaperPlane />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageBox;



import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaImage } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURl } from "../App";
import { setMessages, addMessage } from "../redux/messageSlice";

const MessageBox = () => {
  const { id } = useParams(); // target user id
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const { sockets } = useSelector((state) => state.socket);
  const suggestUsers = useSelector((state) => state.user.suggestUsers);
  const selectedUser = suggestUsers.find((user) => user._id === id);

  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (e) => setSelectedImage(e.target.files[0]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage && !selectedImage) return;

    const formData = new FormData();
    formData.append("receiver", id);
    if (newMessage) formData.append("text", newMessage);
    if (selectedImage) formData.append("media", selectedImage);

    try {
      const res = await axios.post(`${serverURl}/api/message/send`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addMessage(res.data.data));
      setNewMessage("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Real-time messages
  useEffect(() => {
    if (!sockets) return;
    sockets.on("newMessage", (mesg) => {
      dispatch(setMessages([...messages, mesg]));
    });
    return () => sockets.off("newMessage");
  }, [messages, sockets, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0b0b] text-gray-200 relative">
      
      {/* Header */}
      <div className="bg-[#1a1a1a] fixed top-0 left-0 w-full z-10 p-4 border-b border-gray-700 flex items-center gap-3 shadow-md">
        <img
          src={selectedUser?.profilePicture}
          alt="User"
          className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
        />
        <h2 className="font-semibold text-white text-lg">{selectedUser?.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 pt-24 pb-28">
        {messages.map((msg, index) => {
          const isSent = msg.receiver !== id;
          return (
            <div
              key={index}
              ref={scrollRef}
              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words shadow-md ${
                  isSent
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-[#1f1f1f] text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.media && (
                  <img
                    src={msg.media}
                    alt="sent"
                    className="mt-2 w-60 max-w-full rounded-lg shadow-sm"
                  />
                )}
                <p className="text-xs mt-1 opacity-70 text-right text-gray-200">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-3/4 bg-[#1a1a1a] border border-gray-700 rounded-full p-2 flex items-center gap-3 shadow-lg"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <label className="cursor-pointer">
          <FaImage className="text-gray-400 text-2xl hover:text-green-400 transition" />
          <input type="file" accept="image/*" hidden onChange={handleImageChange} />
        </label>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full transition shadow-md"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
