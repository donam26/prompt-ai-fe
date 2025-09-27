import type { Blog } from "@/lib/types";
import { useCallback, useState } from "react";
import { blogService } from "@/services/admin/blogs/blogService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (blog: Blog) => Promise<boolean>;
}

export function useDeleteBlog(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (blog: Blog): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await blogService.deleteBlog(blog.id);
      showToast.success("Blog deleted successfully!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete blog";
      setError(() => errorMessage);
      showToast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(() => false);
    }
  }, []);

  return {
    isLoading,
    error,
    mutate,
  };
}
