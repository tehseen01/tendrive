import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import folderSlice from "./folderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    folder: folderSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
