// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice"; // ✅ default export, not { setUserData }
// import postReducer from "./postSlice";
// import storyReducer from "./storySlice";
// import reelReducer from "./reelSlice";
// import messageReducer from "./messageSlice";
// import socketReducer from "./socketSlice"
// const store = configureStore({
//   reducer: {
//     user: userReducer, // ✅ correctly set reducer
//     post: postReducer,
//     story: storyReducer,
//     reel: reelReducer,
//     message: messageReducer,
//     socket:socketReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import storyReducer from "./storySlice";
import reelReducer from "./reelSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    story: storyReducer,
    reel: reelReducer,
    message: messageReducer,
    socket: socketReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore socket instance in actions + state
        ignoredActions: ["socket/setSocket"],
        ignoredPaths: ["socket.socket"],
      },
    }),
});

export default store;

