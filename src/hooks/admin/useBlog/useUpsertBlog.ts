import type { CreateBlogRequest } from "@/lib/types";
import { useCallback, useState } from "react";
import { blogService } from "@/services/admin/blogs/blogService";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: CreateBlogRequest, id?: string | number) => Promise<boolean>;
}

export function useUpsertBlog(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: CreateBlogRequest, id?: string | number): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await blogService.updateBlog(id, data);
        } else {
          await blogService.createBlog(data);
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
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
