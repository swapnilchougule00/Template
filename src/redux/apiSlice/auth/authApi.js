import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api_url from "../../../config/default.json";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${api_url}`, credentials: "include" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    verifyUser: builder.mutation({
      query: (data) => ({
        url: "/verify_email",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyUserMutation,
} = authApi;
