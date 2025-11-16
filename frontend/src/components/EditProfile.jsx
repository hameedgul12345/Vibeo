import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { serverURl } from "../App";
import { setProfileData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCamera } from "react-icons/fa";

const EditProfile = () => {
  const { profileData } = useSelector((state) => state.user);
  const [name, setName] = useState(profileData?.name || "");
  const [userName, setUserName] = useState(profileData?.userName || "");
  const [bio, setBio] = useState(profileData?.bio || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(profileData?.profilePicture || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
    formData.append("userName", userName); // frontend

      formData.append("bio", bio);
      if (image) formData.append("profilePicture", image);

      const res = await axios.put(`${serverURl}/api/user/editUser`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(setProfileData(res.data.user));
      alert("Profile updated successfully!");
      navigate(`/profile/${userName}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-6 px-4">
      {/* Top Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition"
        >
          <FaArrowLeft size={18} />
        </button>
        <h1 className="text-center font-semibold text-lg flex-1">Edit Profile</h1>
        <div className="w-10" /> {/* Placeholder for spacing */}
      </div>

      {/* Profile Picture */}
      <div className="relative mb-6">
        <img
          src={preview}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-600 shadow-md"
        />
        <label
          htmlFor="fileInput"
          className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition shadow-lg"
        >
          <FaCamera size={16} />
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4 bg-gray-900 p-6 rounded-xl shadow-md"
      >
        <div>
          <label className="block text-gray-400 text-sm mb-1">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Bio</label>
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 resize-none focus:outline-none focus:border-gray-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-white text-black font-semibold rounded-xl py-2 mt-2 hover:bg-gray-200 transition shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
