import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StoryViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allStories, userStory } = useSelector((state) => state.story);

  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const combinedStories = [...userStory, ...allStories];
    setStories(combinedStories);

    const startIndex = combinedStories.findIndex((s) => s._id === id);
    if (startIndex !== -1) setCurrentIndex(startIndex);
  }, [id, allStories, userStory]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) setCurrentIndex((prev) => prev + 1);
    else navigate(-1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    else navigate(-1);
  };

  useEffect(() => {
    if (!stories[currentIndex]) return;

    const timer =
      stories[currentIndex].mediaType === "video" ? null : setTimeout(handleNext, 5000);

    if (progressRef.current) {
      progressRef.current.style.width = "0%";
      setTimeout(() => {
        progressRef.current.style.transition = "width 5s linear";
        progressRef.current.style.width = "100%";
      }, 50);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (progressRef.current) {
        progressRef.current.style.transition = "none";
        progressRef.current.style.width = "0%";
      }
    };
  }, [currentIndex, stories]);

  if (!stories.length || !stories[currentIndex]) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-lg">
        Story not found
      </div>
    );
  }

  const story = stories[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4">
    
      {/* Story Card */}

      <div className="relative w-full max-w-md h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
       
         {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={() => navigate(-1)}
      >
        <FaTimes />
      </button>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
        <div ref={progressRef} className="h-1 bg-blue-500 transition-all duration-5000"></div>
      </div>

        {/* Header */}
        <div className="absolute top-4 left-4 bg-black/70 p-2 rounded-xl flex items-center space-x-3 backdrop-blur-md z-10">
          <img
            src={story.author?.profilePicture || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-sm text-white">{story.author?.name || "User"}</p>
            <p className="text-xs text-gray-300">just now</p>
          </div>
        </div>

        {/* Story Media */}
        {story.mediaType === "video" ? (
          <video
            key={story._id}
            src={story.media}
            autoPlay
            playsInline
            muted={false}
            controls={false}
            onEnded={handleNext}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={story.media}
            alt={story.caption || "Story"}
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-0 h-full w-1/4 bg-black/10 hover:bg-black/30 text-white flex items-center justify-center"
          >
            <FaChevronLeft size={24} />
          </button>
        )}
        {currentIndex < stories.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-0 h-full w-1/4 bg-black/10 hover:bg-black/30 text-white flex items-center justify-center"
          >
            <FaChevronRight size={24} />
          </button>
        )}

        {/* Caption */}
        {story.caption && (
          <div className="absolute bottom-6 left-4 right-4 text-white text-sm bg-black/50 p-2 rounded-md backdrop-blur-sm">
            {story.caption}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
