import type { Product } from "@/types";
import { useCallback, useState } from "react";
import { productService } from "@/services";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: Partial<Product>, id?: string | number) => Promise<boolean>;
}

export function useUpsertProduct(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: Partial<Product>, id?: string | number): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await productService.updateProduct(id, data);
        } else {
          await productService.createProduct(data);
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
