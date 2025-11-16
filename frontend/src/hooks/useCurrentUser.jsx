import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverURl } from "../App";

const useCurrentUser = () => {
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch current user if Redux has no data but token exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Check if we already have userData
        if (userData) return;

        // ✅ Verify token from cookies (backend should read it automatically)
        const res = await axios.get(`${serverURl}/api/user/currentUser`, {
          withCredentials: true, // important if token is in cookie
        });

        // ✅ Store user in Redux
        dispatch(setUserData(res.data.user));
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setError(err.response?.data?.message || "Session expired. Please sign in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userData, dispatch]);

  return { user: userData, loading, error };
};

export default useCurrentUser;
