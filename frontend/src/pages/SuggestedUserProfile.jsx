import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FollowButton from "../components/FollowButton";
import { serverURl } from "../App";
import { useSelector } from "react-redux";

const SuggestedUserProfile = () => {
  const {suggestUser}=useSelector((state)=>state.user)

  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchSuggestedUser = async () => {
      try {
        const res = await axios.get(
          `${serverURl}/api/user/suggestedProfile/${username}`,
          { withCredentials: true }
        );
        setUserProfile(res.data.user); // Use .user here
        console.log("suggested user profile", res.data.user);
      } catch (error) {
        console.error("Error fetching suggested user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUser();
  }, [username]);

  if (loading) return <div className="text-white text-center mt-20">Loading profile...</div>;
  if (!userProfile) return <div className="text-red-500 text-center mt-20">User not found</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <div className="flex flex-col items-center bg-gray-900 rounded-2xl p-6 w-full max-w-lg">
        {/* Profile Header */}
        <img
          src={userProfile.profilePicture || "https://via.placeholder.com/120"}
          alt={userProfile.userName}
          className="w-28 h-28 rounded-full border-2 border-gray-600 object-cover"
        />
        <h2 className="text-2xl font-semibold mt-3">{userProfile.name}</h2>
        <p className="text-gray-400">@{userProfile.userName}</p>
        <p className="text-gray-300 mt-1">{userProfile.bio || "No bio available"}</p>

        {/* Follow Button */}
        <div className="mt-4">
          <FollowButton targetUserId={userProfile._id} />
        </div>
          {/* Follow Button */}
        <div className="mt-4">
        <button className="rounded-xl font-medium bg-white text-black py-2 px-4" onClick={()=>navigate(`/chat-window/${userProfile._id}`)}>Message</button>
        </div>


        {/* Followers / Following */}
        <div className="flex justify-around mt-6 w-full">
          <div className="text-center">
            <p className="text-lg font-bold">{userProfile.followers?.length || 0}</p>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{userProfile.following?.length || 0}</p>
            <p className="text-gray-400 text-sm">Following</p>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-8 w-full text-left">
          <h3 className="font-semibold mb-2">Posts</h3>
          {userProfile.posts && userProfile.posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {userProfile.posts.map((post, idx) => (
                <img
                  key={idx}
                  src={post.media || "https://via.placeholder.com/150"}
                  alt={post.caption || "Post"}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestedUserProfile;
