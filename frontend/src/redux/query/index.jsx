import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const APIRequest = createApi({
  reducerPath: "APIRequest",
  tagTypes: ["Device"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = JSON.parse(window.sessionStorage.getItem("auth-user"));

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    requestGet: builder.query({
      query: ({ path }) => path,
      providesTags: ["Device"],
    }),

    requestId: builder.query({
      query: ({ path, id }) => `${path}/${id}/`,

      providesTags: ["Device"],
    }),

    requestPost: builder.mutation({
      query: ({ path, data }) => ({
        url: path,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Device"],
    }),

    requestDelete: builder.mutation({
      query: ({ path }) => ({
        url: path,
        method: "DELETE",
      }),
      invalidatesTags: ["Device"],
    }),

    requestPatch: builder.mutation({
      query: ({ path, data, id }) => ({
        url: `${path}/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Device"],
    }),
  }),
});

export const {
  useRequestGetQuery,
  useRequestIdQuery,
  useRequestPatchMutation,
  useRequestPostMutation,
  useRequestDeleteMutation,
} = APIRequest;
