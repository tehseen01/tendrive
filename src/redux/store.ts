import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import folderSlice from "./folderSlice";
import fileSlice from "./fileSlice";
import commonSlice from "./commonSlice";

const rootReducer = combineReducers({
  user: userSlice,
  folder: folderSlice,
  file: fileSlice,
  common: commonSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
