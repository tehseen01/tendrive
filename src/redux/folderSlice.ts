import { TFolders } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  foldersData: null | TFolders;
  childFolders: null | TFolders;
};

const initialState: InitialState = {
  foldersData: null,
  childFolders: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFoldersData: (state, action) => {
      state.foldersData = action.payload;
    },

    appendFolder: (state, action) => {
      state.foldersData?.documents.push(action.payload);
    },
  },
});

export const { setFoldersData, appendFolder } = folderSlice.actions;
export default folderSlice.reducer;
