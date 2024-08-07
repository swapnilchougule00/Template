import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apiSlice/auth/authApi";
import { dashboardApi } from "./apiSlice/Dashboard/dashboardApi";
import { profileApi } from "./apiSlice/profileFIll/profileApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      dashboardApi.middleware
    ),
});
