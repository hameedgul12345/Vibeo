import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: [],
  allStories: [],
  userStory: null,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStories: (state, action) => {
      state.stories = action.payload;
      // console.log("📖 Stories:", state.stories);
    },
    setAllStories: (state, action) => {
      state.allStories = action.payload;
      // console.log("📦 All Stories:", state.allStories);
    },
    setUserStory: (state, action) => {
      state.userStory = action.payload;
      // console.log("👤 User Story:", state.userStory);
    },
  },
});

export const { setStories, setAllStories, setUserStory } = storySlice.actions;
export default storySlice.reducer;
