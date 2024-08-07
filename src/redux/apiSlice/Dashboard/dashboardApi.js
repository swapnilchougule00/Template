import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api_url from "../../../config/default.json";

const token = localStorage.getItem("token");
console.log(token);
export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${api_url}`, credentials: "include" }),
  endpoints: (builder) => ({
    termsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/tem_con",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { useTermsAndConditionsMutation } = dashboardApi;
