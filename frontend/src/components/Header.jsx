import { FaRegEnvelope } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
const { userData } = useSelector((state) => state.user);
  return (
    <header className="fixed md:hidden block top-0 left-0 w-full h-14 px-4 bg-black/80 backdrop-blur-md text-white flex items-center justify-between z-50 shadow-md">

      {/* Profile */}
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src={userData?.profilePicture || "/default-profile.jpg"}   // replace with dynamic user image
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border border-white/50"
        />
        <span className="text-sm font-medium">{userData?.name || "User"}</span>
      </div>

      {/* Messages */}
      <div className="flex items-center gap-4">

       
        <BsChatDots
          size={22}
          className="cursor-pointer hover:text-gray-400 transition"
          onClick={() => navigate("/chats")}
        />
      </div>

    </header>
  );
}

export default Header;
