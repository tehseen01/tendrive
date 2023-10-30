import { TUser } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  authStatus: boolean;
  user: TUser | null;
  userProfile: null;
  searchUser: { total: number; documents: TUser[] } | null;
  selectedUser: TUser | null;
};

const initialState: TInitialState = {
  authStatus: false,
  user: null,
  userProfile: null,
  searchUser: null,
  selectedUser: null,
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

    setSearchUser: (state, action) => {
      state.searchUser = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    resetUser: () => {
      return initialState;
    },
  },
});

export const {
  setAuthStatus,
  setUser,
  setSearchUser,
  setSelectedUser,
  resetUser,
} = userSlice.actions;
export default userSlice.reducer;
