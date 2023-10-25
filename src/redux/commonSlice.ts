import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openMobileNav: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setOpenMobileNav: (state, action) => {
      state.openMobileNav = action.payload;
    },
  },
});

export const { setOpenMobileNav } = commonSlice.actions;
export default commonSlice.reducer;
