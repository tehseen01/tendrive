import { TFileInfoType, TFiles } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  filesData: TFiles | null;
  fileInfo: null | TFileInfoType[];
};

const initialState: InitialState = {
  filesData: null,
  fileInfo: null,
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
  },
});

export const { setFilesData, appendFile, setFileInfo } = fileSlice.actions;
export default fileSlice.reducer;
