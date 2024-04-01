import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const APIRequest = createApi({
  reducerPath: "APIRequest",
  tagTypes: ["Device"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),

  endpoints: (build) => ({
    RequestGet: build.query({
      query: (path) => path,
      providesTags: ["Device"],
    }),

    RequestGetById: build.query({
      query: ({ path, id }) => `${path}/${id}`,
      providesTags: ["Device"],
    }),

    RequestPost: build.mutation({
      query: ({ path, data }) => ({
        url: path,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Device"],
    }),

    RequestDelete: build.mutation({
      query: ({ path, id }) => ({
        url: `${path}/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Device"],
    }),
    RequestPatch: build.mutation({
      query: ({ path, data, id }) => ({
        url: `${path}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Device"],
    }),
  }),
});

export const { useRequestGetQuery } = APIRequest;
