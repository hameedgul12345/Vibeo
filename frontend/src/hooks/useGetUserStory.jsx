import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURl } from "../App";
import { setUserStory } from "../redux/storySlice";

const useGetUserStory = () => {
  const dispatch = useDispatch();
  const { userStory } = useSelector((state) => state.story);

  useEffect(() => {
    const fetchUserStory = async () => {
      try {
        const res = await axios.get(`${serverURl}/api/story/userStory`, {
          withCredentials: true,
        });
        dispatch(setUserStory(res.data));
      } catch (error) {
        console.error("❌ Error fetching user story:", error);
      }
    };

    fetchUserStory();
  }, [dispatch]);

  return { userStory };
};

export default useGetUserStory;
