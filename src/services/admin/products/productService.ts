import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Product } from "@/types/entities/product";
import type { BaseApiResponse } from "@/types/api/common";

/**
 * ProductService extending BaseService
 */
export class ProductService extends BaseService {
  constructor() {
    super(ENDPOINTS.PRODUCTS.BASE);
  }

  /**
   * Get products with pagination and filters
   */
  async getProductsPage(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get products with query string for proper array handling
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
   * Create new product
   */
  async createProduct(data: Partial<Product>) {
    return await this.create<Product, Partial<Product>>(data);
  }

  /**
   * Update product
   */
  async updateProduct(id: string, data: Partial<Product>) {
    return await this.update<Product, Partial<Product>>(id, data);
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<BaseApiResponse<void>> {
    return await this.delete<void>(id);
  }

  /**
   * Export products to Excel
   */
  async exportProductsExcel(filters: Record<string, unknown> = {}) {
    const blob = await this.exportExcel("export-excel", filters);
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `products-export-${timestamp}.xlsx`;
    this.downloadBlob(blob, filename);
    return blob;
  }
}

// Export singleton instance
export const productService = new ProductService();
