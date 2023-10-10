import { TFolders } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  homeFolders: null | TFolders;
};

const initialState: InitialState = {
  homeFolders: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setHomeFolders: (state, action) => {
      state.homeFolders = action.payload;
    },

    appendFolder: (state, action) => {
      state.homeFolders?.documents.push(action.payload);
    },
  },
});

export const { setHomeFolders, appendFolder } = folderSlice.actions;
export default folderSlice.reducer;
