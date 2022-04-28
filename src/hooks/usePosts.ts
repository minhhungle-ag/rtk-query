import {
  FilterParams,
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostListQuery,
  useUpdatePostMutation,
} from "./../api/postApi";
export function usePosts(params: FilterParams) {
  const { data, isLoading, isError } = useGetPostListQuery(params);

  const [updatePost] = useUpdatePostMutation();
  const [addPost] = useAddPostMutation();
  const [deletedPost] = useDeletePostMutation();

  return {
    isLoading,
    isError,
    postList: data?.data || [],
    pagination: data?.pagination,
    updatePost,
    addPost,
    deletedPost,
  };
}
