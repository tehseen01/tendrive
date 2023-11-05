import { TFileInfoType, TFiles } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  filesData: TFiles | null;
  fileInfo: null | TFileInfoType[];
  binFiles: null | TFiles;
  openFile: boolean;
  viewFileData: null | TFileInfoType;
};

const initialState: InitialState = {
  filesData: null,
  fileInfo: null,
  binFiles: null,
  openFile: false,
  viewFileData: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFilesData: (state, action) => {
      state.filesData = action.payload;
    },

    appendFile: (state, action) => {
      let file = action.payload;
      let filesData = state.filesData;

      if (filesData) {
        filesData.documents.unshift(file);
        filesData.total += 1;
      } else {
        filesData = {
          total: 1,
          documents: [file],
        };
      }
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
      let fileData = state.filesData;
      let payload = action.payload;

      if (fileData) {
        let newFiles = fileData.documents.filter(
          (file) => file.$id !== payload.$id
        );

        fileData.documents = newFiles;
        fileData.total = newFiles.length;
      }
    },

    setBinFiles: (state, action) => {
      state.binFiles = action.payload;
    },

    removeFileFromBin: (state, action) => {
      let binFiles = state.binFiles;
      let payload = action.payload;

      if (binFiles) {
        let newBin = binFiles.documents.filter(
          (file) => file.$id !== payload.$id
        );
        binFiles.documents = newBin;
        binFiles.total = newBin.length;
      }
    },

    setOpenFile: (state, action) => {
      state.openFile = action.payload;
    },

    setViewFileData: (state, action) => {
      state.viewFileData = action.payload;
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
  setOpenFile,
  setViewFileData,
} = fileSlice.actions;
export default fileSlice.reducer;
