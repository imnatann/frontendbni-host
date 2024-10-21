// src/store/selectors.ts

import { RootState } from "./store";
import { authGetter } from "./authSlice";
import { appGetter } from "./appSlice";

// Auth Slice Selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isLogin;
export const selectNekotssecca = (state: RootState) => state.auth.nekotssecca;
export const selectNekothserfer = (state: RootState) => state.auth.nekothserfer;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

// App Slice Selectors
export const selectSidebarCollapsed = (state: RootState) => state.app.sidebarCollapsed;

// Exporting getters if needed
export { authGetter, appGetter };
