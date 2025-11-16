import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllReels } from "../redux/reelSlice";
import { serverURl } from "../App";

const useGetAllReels = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${serverURl}/api/reel/getAll`, {
          withCredentials: true,
        });

        // Assuming your API returns { reels: [...] }
        console.log("🎥 Fetched Reels",data);
        dispatch(setAllReels(data));
      } catch (err) {
        console.error("❌ Error fetching reels:", err);
        setError(err.response?.data?.message || "Failed to fetch reels");
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllReels;
