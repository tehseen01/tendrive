import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import folderSlice from "./folderSlice";
import fileSlice from "./fileSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    folder: folderSlice,
    file: fileSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
