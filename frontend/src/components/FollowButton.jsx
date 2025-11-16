import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { serverURl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";

const FollowButton = ({ targetUserId }) => {
  const dispatch = useDispatch();
  const { userData, profileData } = useSelector((state) => state.user);

  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData || !targetUserId) return;
    setIsFollowing(userData.following?.includes(targetUserId));
  }, [userData, targetUserId, profileData]);

  const handleFollow = async () => {
    if (!targetUserId || loading) return;
    setLoading(true);

    try {
      // ✅ Optimistic UI
      setIsFollowing((prev) => !prev);

      const { data } = await axios.put(
        `${serverURl}/api/user/follow/${targetUserId}`,
        {},
        { withCredentials: true }
      );

      // ✅ Update Redux
      if (data.currentUser) {
        dispatch(setUserData(data.currentUser)); // update logged-in user
      }
      if (data.targetUser && profileData?._id === targetUserId) {
        dispatch(setProfileData(data.targetUser)); // update viewed profile if same
      }

      console.log(data.message);
    } catch (error) {
      console.error("❌ Error following/unfollowing:", error);
      alert(error.response?.data?.message || "Failed to follow user");

      // rollback optimistic UI
      setIsFollowing((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-4 py-2 rounded-xl font-semibold transition ${
        isFollowing
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-black hover:bg-gray-200"
      }`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
