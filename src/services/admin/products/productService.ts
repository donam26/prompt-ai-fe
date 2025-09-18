import { apiClient } from "../../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { PaginationParams, ServiceMethod } from "../../base/types";

// Product service parameters
export type ProductListParams = PaginationParams;

export class ProductService {
  // Get products with pagination
  getProducts: ServiceMethod<ProductListParams> = params => {
    const { page = 1, pageSize = 10 } = params || {};
    return apiClient.get(
      `${ENDPOINTS.PRODUCTS.BASE}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}`
    );
  };

  // Create product
  createProduct: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.PRODUCTS.BASE, data);
  };

  // Update product
  updateProduct: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.PRODUCTS.BASE}/${id}`, data);
    };

  // Delete product
  deleteProduct: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.PRODUCTS.BASE}/${id}`);
  };
}

// Export singleton instance
export const productService = new ProductService();
