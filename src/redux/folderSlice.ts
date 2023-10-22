import { TFolders } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  foldersData: null | TFolders;
  childFolders: null | TFolders;
  binFolders: null | TFolders;
};

const initialState: InitialState = {
  foldersData: null,
  childFolders: null,
  binFolders: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFoldersData: (state, action) => {
      state.foldersData = action.payload;
    },

    appendFolder: (state, action) => {
      state.foldersData?.documents.unshift(action.payload);
    },

    updateFolder: (state, action) => {
      let folders = state.foldersData?.documents!;

      let index = folders.findIndex(
        (folder) => folder.$id === action.payload.$id
      );

      if (index && index !== -1) {
        folders.splice(index, 1, action.payload);
      }
    },

    setBinFolders: (state, action) => {
      state.binFolders = action.payload;
    },

    addFolderToBin: (state, action) => {
      let folders = state.foldersData?.documents!;

      let index = folders.findIndex(
        (folder) => folder.$id === action.payload.$id
      );

      folders.splice(index, 1);
    },

    removeFolderFromBin: (state, action) => {
      let binFolders = state.binFolders?.documents!;

      let index = binFolders.findIndex(
        (folder) => folder.$id === action.payload.$id
      );
      binFolders.splice(index, 1);
    },
  },
});

export const {
  setFoldersData,
  appendFolder,
  updateFolder,
  setBinFolders,
  removeFolderFromBin,
  addFolderToBin,
} = folderSlice.actions;
export default folderSlice.reducer;
