import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Product } from "@/types";

/**
 * ProductService extending BaseService
 */
export class ProductService extends BaseService {
  constructor() {
    super(ENDPOINTS.PRODUCTS.BASE);
  }

  /**
   * Get all products
   */
  async getProducts(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get products with pagination and query string
   */
  async getProductsPageWithQueryString(queryString: string) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(`${this.baseUrl}?${queryString}`);
    return response;
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string | number) {
    const response = await this.getById<Product>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create product
   */
  async createProduct(data: Partial<Product>) {
    return await this.create<Product, Partial<Product>>(data);
  }

  /**
   * Update product
   */
  async updateProduct(id: string | number, data: Partial<Product>) {
    return await this.update<Product, Partial<Product>>(id, data);
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string | number) {
    return await this.delete<void>(id);
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(
    categoryId: string | number,
    params?: Record<string, unknown>
  ) {
    const queryParams = {
      categoryId,
      ...params,
    };
    return this.list(queryParams);
  }

  /**
   * Search products
   */
  async searchProducts(searchTerm: string, params?: Record<string, unknown>) {
    const queryParams = {
      search: searchTerm,
      ...params,
    };
    return this.list(queryParams);
  }
}

// Export singleton instance
export const productService = new ProductService();
