import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sockets: null, // note the plural
  onlineUsers: [],
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSockets: (state, action) => {
      state.sockets = action.payload;
      state.isConnected = true;
    },

    removeSockets: (state) => {
      state.sockets = null;
      state.isConnected = false;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload; // array of user IDs
      console.log("onlineusers", state.onlineUsers);
    },

    addOnlineUser: (state, action) => {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },

    removeOnlineUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter((id) => id !== action.payload);
    },
  },
});

// Export actions with correct names
export const {
  setSockets,
  removeSockets,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
} = socketSlice.actions;

export default socketSlice.reducer;
