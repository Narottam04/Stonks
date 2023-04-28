import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      async queryFn(id) {
        try {
          const res = await fetch("/api/post");

          const data = res.json();

          return { data };
        } catch (error) {
          return { error };
        }
      }
    }),
    getAllComments: builder.query({
      async queryFn(id) {
        try {
          const res = await fetch(`/api/post/comment/${id}`);

          const data = res.json();

          return { data };
        } catch (error) {
          return { error };
        }
      }
    })
  })
});

export const { useGetAllPostsQuery, useGetAllCommentsQuery } = postsApi;
