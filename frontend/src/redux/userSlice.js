import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,       // logged-in user data
  suggestUsers: [],     // list of suggested users
  profileData: null,    // profile being viewed
  selectedUser: null,   // ✅ newly added
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSuggestUsers: (state, action) => {
      state.suggestUsers = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setSelectedUser: (state, action) => {
      // ✅ Correctly store the selected user
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setUserData,
  setSuggestUsers,
  setProfileData,
  setSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;
