import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reels: [],
  allReels: [],
};

const reelSlice = createSlice({
  name: "reel",
  initialState,
  reducers: {
    setReels: (state, action) => {
      state.reels = action.payload;
      // console.log("🎞️ Reels:", state.reels);
    },
    setAllReels: (state, action) => {
      state.allReels = action.payload;
      // console.log("📦 All Reels:", state.allReels);
    },
  },
});

export const { setReels, setAllReels } = reelSlice.actions;
export default reelSlice.reducer;
