import type { Blog } from "@/types";
import { useCallback, useState } from "react";
import { adminBlogService } from "@/services/admin/blogs/blogService";

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
      await adminBlogService.deleteBlog(blog.id);
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete blog";
      setError(() => errorMessage);
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
