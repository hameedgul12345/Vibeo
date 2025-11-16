import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllStories } from "../redux/storySlice";
import { serverURl } from "../App";

const useGetAllStories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverURl}/api/story/getAll`, {
          withCredentials: true,
        });

        // Assuming your API returns { stories: [...] }
        console.log("📚 Fetched Stories",res.data);
        dispatch(setAllStories(res.data || []));

      } catch (err) {
        console.error("❌ Error fetching stories:", err);
        setError(err.response?.data?.message || "Failed to fetch stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllStories;
