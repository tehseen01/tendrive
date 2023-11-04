import { TFiles, TFolders, TShareDoc } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  openMobileNav: boolean;
  shareFolders: TFolders | null;
  shareFiles: TFiles | null;
  searchFolders: TFolders | null;
  searchFiles: TFiles | null;
  mobileSearchBar: boolean;
};

const initialState: InitialState = {
  openMobileNav: false,
  shareFiles: null,
  shareFolders: null,
  searchFiles: null,
  searchFolders: null,
  mobileSearchBar: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setOpenMobileNav: (state, action) => {
      state.openMobileNav = action.payload;
    },

    setShareDocs: (state, action) => {
      const docs = action.payload;

      if (docs) {
        const filteredFiles = docs.documents
          .filter((doc: TShareDoc) => doc.files !== null)
          .map((doc: TShareDoc) => doc.files);

        const filteredFolders = docs.documents
          .filter((doc: TShareDoc) => doc.folders !== null)
          .map((doc: TShareDoc) => doc.folders);

        state.shareFiles = {
          total: filteredFiles.length,
          documents: filteredFiles,
        };

        state.shareFolders = {
          total: filteredFolders.length,
          documents: filteredFolders,
        };
      }
    },

    removeShareDoc: (state, action) => {
      const docId = action.payload;
      let files = state.shareFiles;
      let folders = state.shareFolders;

      if (files && files.total > 0) {
        let fileIndex = files.documents.findIndex((doc) => doc.$id === docId);

        if (fileIndex !== -1) {
          files.documents.splice(fileIndex, 1);
        }
      }

      if (folders && folders.total > 0) {
        let folderIndex = folders.documents.findIndex(
          (doc) => doc.$id === docId
        );

        if (folderIndex !== -1) {
          folders.documents.splice(folderIndex, 1);
        }
      }
    },

    setSearchFolders: (state, action) => {
      state.searchFolders = action.payload;
    },

    setSearchFiles: (state, action) => {
      state.searchFiles = action.payload;
    },

    setMobileSearchBar: (state) => {
      state.mobileSearchBar = !state.mobileSearchBar;
    },
  },
});

export const {
  setOpenMobileNav,
  setShareDocs,
  removeShareDoc,
  setSearchFiles,
  setSearchFolders,
  setMobileSearchBar,
} = commonSlice.actions;
export default commonSlice.reducer;
