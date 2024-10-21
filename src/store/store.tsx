// src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
