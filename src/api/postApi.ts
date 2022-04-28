import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export interface Post {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
}

export interface Pagination {
  _page: number;
  _limit: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  pagination: Pagination;
  data: T[];
}

export interface FilterParams {
  _page: number;
  _limit: number;
  _sort?: string; //createdAt
  _order?: string; //desc
}

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://js-post-api.herokuapp.com/api",
  }),

  endpoints: (builder) => ({
    getPostList: builder.query<ListResponse<Post>, FilterParams>({
      query: (params) =>
        `/posts?_page=${params._page}&_limit=${params._limit}&_sort=createdAt&_order=desc`,
      providesTags: ["Post"],
    }),

    getPost: builder.query<Post, string>({
      query: (id) => ({ url: `post/${id}` }),
      transformResponse: (response: { data: Post }) => response.data,
      providesTags: ["Post"],
    }),

    addPost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: (post) => ({
        url: `/posts`,
        method: "POST",
        body: post,
      }),
      transformResponse: (response: { data: Post }, meta, arg) => {
        if (response) {
          toast.success("Add successful!!!!");
        }

        return response.data;
      },
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      transformResponse: (response: { data: Post }) => {
        if (response) {
          console.log({ response });
          toast.success("Edit successful!!!!");
        }

        return response.data;
      },

      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Post"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostListQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
