import { useState, useEffect } from "react";
import { productService } from "@/services";
import type { Product } from "@/types";

interface IResponse {
  product: Product | null;
  isLoading: boolean;
  error: string;
}

export function useProductDetail(id?: string | number): IResponse {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await productService.getProductById(id);
        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    isLoading,
    error,
  };
}
