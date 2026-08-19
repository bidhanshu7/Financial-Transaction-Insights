import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  token: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.isLoading = true;
    },
    SignInSuccess: (state, action) => {
      if (action.payload.admin) {
        state.currentUser = action.payload.admin;
        state.isAdmin = true;
      } else if (action.payload.user) {
        state.currentUser = action.payload.user;
      }

      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    SignInFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.currentUser = null;
    },
    SignOut: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      state.token = null;
      state.isAdmin = false;
    },
    UpdateToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const {
  SignInStart,
  SignInSuccess,
  SignInFailure,
  SignOut,
  UpdateToken,
} = userSlice.actions;

export default userSlice.reducer;
