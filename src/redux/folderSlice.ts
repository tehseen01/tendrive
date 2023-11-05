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
      let folder = action.payload;
      let folderData = state.foldersData;

      if (folderData) {
        folderData.documents.unshift(folder);
        folderData.total += 1;
      } else {
        folderData = {
          total: 1,
          documents: [folder],
        };
      }
    },

    updateFolder: (state, action) => {
      let folders = state.foldersData;

      if (folders) {
        let index = folders.documents.findIndex(
          (folder) => folder.$id === action.payload.$id
        );

        if (index !== -1) {
          folders.documents.splice(index, 1, action.payload);
        }
      }
    },

    setBinFolders: (state, action) => {
      state.binFolders = action.payload;
    },

    addFolderToBin: (state, action) => {
      let payload = action.payload;
      let foldersData = state.foldersData;

      if (foldersData) {
        let newFolders = foldersData.documents.filter(
          (folder) => folder.$id !== payload.$id
        );

        foldersData.documents = newFolders;
        foldersData.total = newFolders.length;
      }
    },

    removeFolderFromBin: (state, action) => {
      let binFolders = state.binFolders;

      if (binFolders) {
        let newBin = binFolders.documents.filter(
          (folder) => folder.$id !== action.payload.$id
        );

        binFolders.documents = newBin;
        binFolders.total = newBin.length;
      }
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
