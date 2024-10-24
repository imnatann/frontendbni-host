// src/store/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
// src/store/authSlice.ts

interface User {
  id: number;
  name: string;
  email: string;
  // Add more user properties if needed
}

interface AuthState {
  isLogin: boolean;
  nekotssecca: string | null;
  nekothserfer: string | null;
  currentUser: User | null;
}

const initialState: AuthState = {
  isLogin:
    localStorage.getItem("nekotssecca") && localStorage.getItem("nekothserfer")
      ? true
      : false,
  nekotssecca: localStorage.getItem("nekotssecca") ?? null,
  nekothserfer: localStorage.getItem("nekothserfer") ?? null,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInReducer: (
      state,
      action: PayloadAction<{
        token: string;
        refresh_token: string;
        user: User;
      }>
    ) => {
      state.isLogin = true;
      const nekot = action.payload.token ?? initialState.nekotssecca;
      const nekothserfer =
        action.payload.refresh_token ?? initialState.nekothserfer;
      state.nekotssecca = nekot;
      state.nekothserfer = nekothserfer;
      state.currentUser = action.payload.user; // Ensure currentUser is set
      localStorage.setItem("nekotssecca", nekot);
      localStorage.setItem("nekothserfer", nekothserfer);
    },
    signOutReducer: (state) => {
      state.isLogin = false;
      state.nekotssecca = null;
      state.nekothserfer = null;
      state.currentUser = null;
      localStorage.removeItem("nekotssecca");
      localStorage.removeItem("nekothserfer");
    },
  },
});

export const { signInReducer, signOutReducer } = authSlice.actions;
export const authGetter = (state: RootState) => state.auth;
export default authSlice.reducer;
