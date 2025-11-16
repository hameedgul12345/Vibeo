import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaCommentDots, FaShare, FaSyncAlt } from "react-icons/fa";
import axios from "axios";
import { serverURl } from "../App";

const ReelsViewer = () => {
  const { allReels } = useSelector((state) => state.reel);
  const [currentReel, setCurrentReel] = useState(0);
  const [reelsData, setReelsData] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [openComments, setOpenComments] = useState(null); // store reelId

  useEffect(() => {
    if (allReels?.length > 0) {
      setReelsData(allReels);
    }
  }, [allReels]);

  // Auto play current reel
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentReel) video.play().catch(() => {});
      else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentReel]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const newIndex = Math.round(container.scrollTop / window.innerHeight);
    if (newIndex !== currentReel) setCurrentReel(newIndex);
  };

  // Handle Like
  const handleLike = async (reelId) => {
    try {
      setReelsData((prev) =>
        prev.map((reel) =>
          reel._id === reelId
            ? {
                ...reel,
                liked: !reel.liked,
                likes: reel.liked
                  ? reel.likes.filter((l) => l !== "tempUser")
                  : [...reel.likes, "tempUser"],
              }
            : reel
        )
      );

      await axios.put(
        `${serverURl}/api/reel/like/${reelId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error liking reel:", error);
    }
  };

  if (!reelsData || reelsData.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-20">
        No reels available 🎥
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none bg-black"
    >
      {reelsData.map((reel, index) => (
        <div
          key={reel._id || index}
          className="h-screen w-full snap-start flex justify-center items-center"
        >
          <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-xl overflow-hidden shadow-xl">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={reel.video}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted
            />

            {/* Overlay */}
            <div className="absolute bottom-6 left-4 right-4 text-white">
              <div className="flex flex-row justify-start items-center">
                <img
                  src={reel.author?.profilePicture}
                  alt={reel.author?.userName || "User"}
                  className="w-10 h-10 rounded-full object-cover border border-gray-400 mb-2"
                />
                <p className="text-sm font-semibold ml-2">
                  @{reel.author?.userName}
                </p>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">
                {reel.caption || "No caption"}
              </p>
            </div>

            {/* Comments Section */}
            {openComments === reel._id && (
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/80 p-4 flex flex-col overflow-y-auto">
                <h2 className="text-white text-lg font-semibold mb-2">Comments</h2>

                {/* Existing comments */}
                {reel.comments.length === 0 ? (
                  <p className="text-gray-300 text-sm">No comments yet.</p>
                ) : (
                  reel.comments.map((comment, idx) => (
                    <div key={idx} className="flex items-start mb-2">
                      <p className="text-white text-sm">{comment}</p>
                    </div>
                  ))
                )}

                {/* Add new comment */}
                <div className="mt-auto flex">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 p-2 rounded-l bg-gray-800 text-white outline-none"
                    value={reel.newComment || ""}
                    onChange={(e) => {
                      setReelsData((prev) =>
                        prev.map((r) =>
                          r._id === reel._id ? { ...r, newComment: e.target.value } : r
                        )
                      );
                    }}
                  />
                  <button
                    className="bg-blue-600 px-4 rounded-r hover:bg-blue-700 transition"
                    onClick={async () => {
                      if (!reel.newComment) return;

                      // Update UI instantly
                      setReelsData((prev) =>
                        prev.map((r) =>
                          r._id === reel._id
                            ? {
                                ...r,
                                comments: [...r.comments, r.newComment],
                                newComment: "",
                              }
                            : r
                        )
                      );

                      // Send to backend
                      try {
                        await axios.post(
                          `${serverURl}/api/reel/comment/${reel._id}`,
                          { comment: reel.newComment },
                          { withCredentials: true }
                        );
                      } catch (error) {
                        console.error("Error adding comment:", error);
                      }
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            {/* Right Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
              {/* ❤️ Like */}
              <div
                className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                onClick={() => handleLike(reel._id)}
              >
                <FaHeart
                  size={24}
                  className={
                    reel.liked
                      ? "text-red-500"
                      : "text-gray-300 hover:text-red-400"
                  }
                />
                <p className="text-xs text-gray-400">{reel.likes.length}</p>
              </div>

              {/* 💬 Comments */}
              <div
                className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                onClick={() =>
                  setOpenComments(openComments === reel._id ? null : reel._id)
                }
              >
                <FaCommentDots size={22} className="text-gray-300 hover:text-blue-400" />
                <p className="text-xs text-gray-400">{reel.comments.length}</p>
              </div>

              {/* 🔄 Share */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer">
                <FaShare size={22} className="text-gray-300 hover:text-green-400" />
                <p className="text-xs text-gray-400">Share</p>
              </div>

              {/* 🔁 Remix */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer">
                <FaSyncAlt size={22} className="text-gray-300 hover:text-yellow-400" />
                <p className="text-xs text-gray-400">Remix</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelsViewer;
