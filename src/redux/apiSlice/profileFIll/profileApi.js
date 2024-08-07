import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api_url from "../../../config/default.json";

const token = localStorage.getItem("token");
console.log(token);
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${api_url}`, credentials: "include" }),
  endpoints: (builder) => ({
    personalInfo: builder.mutation({
      query: (data) => ({
        url: "/personal_information",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    jobDetails: builder.mutation({
      query: (data) => ({
        url: "/jobprefer",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { usePersonalInfoMutation, useJobDetailsMutation } = profileApi;
