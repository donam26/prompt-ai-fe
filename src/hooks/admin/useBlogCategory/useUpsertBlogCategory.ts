import type { BlogCategoryFormData } from "@/types/admin/blog-category";
import { useCallback, useState } from "react";
import { blogCategoryService } from "@/services/admin/blogs/blogCategoryService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (blogCategoryData: BlogCategoryFormData) => Promise<boolean>;
}

export function useUpsertBlogCategory(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (blogCategoryData: BlogCategoryFormData): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (blogCategoryData.id) {
          // Update existing blog category
          await blogCategoryService.updateBlogCategory(
            blogCategoryData.id,
            blogCategoryData
          );
          showToast.success("Blog Category đã được cập nhật thành công");
        } else {
          // Create new blog category
          await blogCategoryService.createBlogCategory(blogCategoryData);
          showToast.success("Blog Category đã được tạo thành công");
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xử lý blog category";
        setError(() => errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsUpserting(() => false);
      }
    },
    []
  );

  return {
    isUpserting,
    error,
    mutate,
  };
}
