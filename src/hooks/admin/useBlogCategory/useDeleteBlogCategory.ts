import type { BlogCategory } from "@/types";
import { useCallback, useState } from "react";
import { blogCategoryService } from "@/services/admin/blogs/blogCategoryService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (blogCategory: BlogCategory) => Promise<boolean>;
}

export function useDeleteBlogCategory(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (blogCategory: BlogCategory): Promise<boolean> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        await blogCategoryService.deleteBlogCategory(blogCategory.id);
        showToast.success("Blog Category đã được xóa thành công");
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to delete blog category";
        setError(() => errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    mutate,
  };
}
