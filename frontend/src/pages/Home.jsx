import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div className="flex gap-6 bg-[#090F1B] text-white min-h-screen w-full">
      {/* Left Sidebar */}
      <div className="hidden  md:block md:w-[25%] lg:w-[25%] bg-[#0B1221]">
        <LeftSidebar />
      </div>

      {/* Feed Section */}
      <div className="w-full  md:w-[50%] flex justify-center">
        <Feed />
      </div>

      {/* Right Sidebar */}
      <div className="hidden  md:block md:w-[25%] lg:w-[25%] bg-[#0B1221]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
