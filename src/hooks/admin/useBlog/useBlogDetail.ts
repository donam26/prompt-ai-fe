import { useCallback, useEffect, useState } from "react";
import { adminBlogService } from "@/services/admin/blogs/blogService";
import type { Blog } from "@/types";

interface IResponse {
  blog: Blog | null;
  isLoading: boolean;
  error: string;
  fetchBlogDetail: (id: string | number) => Promise<void>;
}

export function useBlogDetail(id?: string | number): IResponse {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchBlogDetail = useCallback(async (blogId: string | number) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await adminBlogService.getBlog(blogId);
      // Handle different response structures
      const blogData = response.data;
      setBlog(blogData || null);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      setBlog(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchBlogDetail(id);
    }
  }, [id, fetchBlogDetail]);

  return {
    blog,
    isLoading,
    error,
    fetchBlogDetail,
  };
}
