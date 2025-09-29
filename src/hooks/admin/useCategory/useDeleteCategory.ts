import type { Category } from "@/types";
import { useCallback, useState } from "react";
import { categoryService } from "@/services";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (category: Category) => Promise<boolean>;
}

export function useDeleteCategory(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (category: Category): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await categoryService.deleteCategory(category.id);
      showToast.success("Category deleted successfully!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete category";
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
