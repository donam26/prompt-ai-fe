import type { Category } from "@/lib/types";
import { useCallback, useState } from "react";
import { categoryService } from "@/services/admin/categories";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: Partial<Category>, id?: string) => Promise<boolean>;
}

export function useUpsertCategory(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: Partial<Category>, id?: string): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await categoryService.updateCategory(id, data);
        } else {
          await categoryService.createCategory(data);
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
