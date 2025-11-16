import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { serverURl } from "../App";

// Redux actions
import { setPosts } from "../redux/postSlice";
import { setStories } from "../redux/storySlice";
import { setReels } from "../redux/reelSlice";

const UploadMedia = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { stories } = useSelector((state) => state.story);
  const { reels } = useSelector((state) => state.reel);
  

  const [selectedTab, setSelectedTab] = useState("Post");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  // handle file select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
      setFileType(selectedFile.type.startsWith("video") ? "video" : "image");
    }
  };

  // handle upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("media", file);
      formData.append("caption", caption);

      let endpoint = "";
      if (selectedTab === "Post") endpoint = "/api/post/create";
      else if (selectedTab === "Story") endpoint = "/api/story/create";
      else if (selectedTab === "Loop") endpoint = "/api/reel/create";

      const response = await axios.post(`${serverURl}${endpoint}`, formData, {
        withCredentials: true,
      });

      console.log("✅ Uploaded successfully:", response.data);

      if (selectedTab === "Post")
        dispatch(setPosts([...posts, response.data.reel || response.data]));
      else if (selectedTab === "Story")
        dispatch(setStories([...stories, response.data.story || response.data]));
      else if (selectedTab === "Loop")
        dispatch(setReels([...reels, response.data.reel || response.data]));

      alert(`${selectedTab} uploaded successfully!`);
      setPreview(null);
      setFile(null);
      setCaption("");
    } catch (error) {
      console.error("❌ Upload failed:", error.response?.data || error);
      alert("Upload failed! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 font-sans">
      {/* Tabs */}
      <div className="flex justify-center bg-gray-900 rounded-full p-1 w-[50%] shadow-inner mt-4">
        {["Post", "Story", "Loop"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTab === tab
                ? "bg-white text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Upload Box */}
      <div className="mt-8 w-[50%] min-h-[260px] bg-gray-800 rounded-2xl flex items-center justify-center overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] hover:bg-gray-700 shadow-md">
        {preview ? (
          fileType === "video" ? (
            <video
              src={preview}
              controls
              autoPlay
              loop
              className="object-cover w-full h-full rounded-2xl"
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full rounded-2xl"
            />
          )
        ) : (
          <label
            htmlFor="media"
            className="flex flex-col items-center justify-center cursor-pointer text-gray-400 group-hover:text-white"
          >
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-lg">
              <FaPlus size={22} />
            </div>
            <p className="text-xs mt-2 opacity-80">
              Add {selectedTab.toLowerCase()}
            </p>
            <input
              type="file"
              id="media"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      {/* Caption Input */}
      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mt-6 w-[50%] bg-transparent border-b border-gray-700 focus:border-white outline-none text-sm p-2 placeholder-gray-500 transition-all duration-300"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-8 w-[50%] font-semibold py-2 rounded-full transition-all duration-300 shadow-md ${
          loading
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {loading ? "Uploading..." : `Upload ${selectedTab.toLowerCase()}`}
      </button>
    </div>
  );
};

export default UploadMedia;
