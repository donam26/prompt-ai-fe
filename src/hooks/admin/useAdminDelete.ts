import { useCallback, useState } from "react";
import { showToast } from "@/components/ui/toast";

interface UseAdminDeleteProps<T> {
  deleteService: (id: string | number) => Promise<void>;
  onSuccess?: (item: T) => void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseAdminDeleteReturn<T> {
  isLoading: boolean;
  error: string;
  deleteItem: (item: T) => Promise<boolean>;
}

export function useAdminDelete<T extends { id: string | number }>({
  deleteService,
  onSuccess,
  successMessage = "Item deleted successfully!",
  errorMessage = "Failed to delete item",
}: UseAdminDeleteProps<T>): UseAdminDeleteReturn<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const deleteItem = useCallback(
    async (item: T): Promise<boolean> => {
      setIsLoading(true);
      setError("");

      try {
        await deleteService(item.id);
        showToast.success(successMessage);
        onSuccess?.(item);
        return true;
      } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : errorMessage;
        setError(errorMsg);
        showToast.error(errorMsg);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [deleteService, onSuccess, successMessage, errorMessage]
  );

  return {
    isLoading,
    error,
    deleteItem,
  };
}
