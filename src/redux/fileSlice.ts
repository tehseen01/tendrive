import { TFileInfoType, TFiles } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  filesData: TFiles | null;
  fileInfo: null | TFileInfoType[];
  binFiles: null | TFiles;
};

const initialState: InitialState = {
  filesData: null,
  fileInfo: null,
  binFiles: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFilesData: (state, action) => {
      state.filesData = action.payload;
    },

    appendFile: (state, action) => {
      state.filesData?.documents.unshift(action.payload);
    },

    setFileInfo: (state, action) => {
      state.fileInfo = action.payload;
    },

    updateFileInfo: (state, action) => {
      let file = state.fileInfo!;

      let index = file.findIndex((i) => i.$id === action.payload.$id);

      if (index && index !== -1) {
        file.splice(index, 1, action.payload);
      }
    },

    addFileToBin: (state, action) => {
      let fileData = state.filesData?.documents!;

      let index = fileData.findIndex((file) => file.$id === action.payload.$id);

      fileData.splice(index, 1);
    },

    setBinFiles: (state, action) => {
      state.binFiles = action.payload;
    },

    removeFileFromBin: (state, action) => {
      let binFiles = state.binFiles?.documents!;

      let index = binFiles.findIndex((file) => file.$id === action.payload.$id);
      binFiles.splice(index, 1);
    },
  },
});

export const {
  setFilesData,
  appendFile,
  setFileInfo,
  updateFileInfo,
  addFileToBin,
  setBinFiles,
  removeFileFromBin,
} = fileSlice.actions;
export default fileSlice.reducer;
