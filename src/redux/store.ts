import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import folderSlice from "./folderSlice";
import fileSlice from "./fileSlice";
import commonSlice from "./commonSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    folder: folderSlice,
    file: fileSlice,
    common: commonSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
