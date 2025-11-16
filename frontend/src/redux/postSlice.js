import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  allPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    //   console.log("📦 Posts:", state.posts);
    },
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
      // console.log("📦 All Posts: jhkhjk", state.allPosts);
    },
  },
});

export const { setPosts, setAllPosts } = postSlice.actions;
export default postSlice.reducer;
