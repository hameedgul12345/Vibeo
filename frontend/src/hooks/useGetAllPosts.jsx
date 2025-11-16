import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../redux/postSlice";
import { serverURl } from "../App";

const useGetAllPosts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${serverURl}/api/post/getAll`, {
          withCredentials: true,
        });

        // Assuming your API returns { posts: [...] }
        console.log("hello")
        dispatch(setAllPosts(data?.posts || []));
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
        setError(err.response?.data?.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllPosts;
