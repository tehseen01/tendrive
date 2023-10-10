import { TUser } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  authStatus: boolean;
  user: TUser | null;
  userProfile: null;
};

const initialState: TInitialState = {
  authStatus: false,
  user: null,
  userProfile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthStatus, setUser } = userSlice.actions;
export default userSlice.reducer;
