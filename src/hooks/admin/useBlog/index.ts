// Export all blog hooks from a single entry point

export { useAdminBlogsQuery } from "./useAdminBlogsQuery";
export { useAdminBlogQuery } from "./useAdminBlogQuery";
export { useBlogForm } from "./useBlogForm";
export { useAdminBlogCategoriesQuery } from "./useAdminBlogCategoriesQuery";
export { useCreateBlogMutation } from "./useCreateBlogMutation";
export { useUpdateBlogMutation } from "./useUpdateBlogMutation";
export { useDeleteBlogMutation } from "./useDeleteBlogMutation";

// Export types
export type {
  UseAdminBlogsQueryParams,
  UseAdminBlogsQueryResponse,
} from "./useAdminBlogsQuery";
export type { UpdateBlogParams } from "./useUpdateBlogMutation";
