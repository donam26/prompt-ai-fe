import type { Product } from "@/types";
import { useCallback, useState } from "react";
import { productService } from "@/services";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (product: Product) => Promise<void>;
}

export function useDeleteProduct(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (product: Product): Promise<void> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await productService.deleteProduct(product.id);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(() => errorMessage);
      throw error;
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
