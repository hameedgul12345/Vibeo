// src/hooks/useSuggestUsers.jsx
import { useEffect } from "react";
import axios from "axios";
import { serverURl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestUsers } from "../redux/userSlice";

const useSuggestUsers = () => {
  const dispatch = useDispatch();

  // ✅ Read from the same structure you defined in userSlice
  const { suggestUsers } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        // ✅ Fetch suggested users from backend
        const res = await axios.get(`${serverURl}/api/user/suggestUsers`, {
          withCredentials: true, // to send cookies if auth is cookie-based
        });

        // ✅ Store users in Redux
        dispatch(setSuggestUsers(res.data.users || []));
        console.log("suggested users",res.data.users)
      } catch (err) {
        console.error("❌ Failed to fetch suggested users:", err);
      }
    };

    // ✅ Fetch only if list is empty
    if (!suggestUsers || suggestUsers.length === 0) {
      fetchSuggestedUsers();
    }
  }, [dispatch, suggestUsers]);

  return { suggestUsers };
};

export default useSuggestUsers;
