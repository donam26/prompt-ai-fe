import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Coupon } from "@/types/entities/coupon";

/**
 * CouponService extending BaseService
 */
export class CouponService extends BaseService {
  constructor() {
    super(ENDPOINTS.COUPONS.BASE);
  }

  /**
   * Get all coupons
   */
  async getCoupons(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get coupons with pagination and query string
   */
  async getCouponsPageWithQueryString(queryString: string) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(`${this.baseUrl}?${queryString}`);
    return response;
  }

  /**
   * Get coupon by ID
   */
  async getCouponById(id: string | number) {
    const response = await this.getById<Coupon>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create coupon
   */
  async createCoupon(data: Partial<Coupon>) {
    return await this.create<Coupon, Partial<Coupon>>(data);
  }

  /**
   * Update coupon
   */
  async updateCoupon(id: string | number, data: Partial<Coupon>) {
    return await this.update<Coupon, Partial<Coupon>>(id, data);
  }

  /**
   * Delete coupon
   */
  async deleteCoupon(id: string | number) {
    return await this.delete<void>(id);
  }

  /**
   * Toggle coupon active status
   */
  async toggleCouponStatus(id: string | number, isActive: boolean) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.patch(`${this.baseUrl}/${id}/status`, {
      isActive,
    });
    return response;
  }

  /**
   * Get coupon users
   */
  async getCouponUsers(id: string | number) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(
      `${this.baseUrl}/${id}${ENDPOINTS.COUPONS.USERS}`
    );
    return response;
  }

  /**
   * Validate coupon
   */
  async validateCoupon(code: string, totalPrice: number) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.post(
      `${this.baseUrl}${ENDPOINTS.COUPONS.VALIDATE}`,
      {
        code,
        total: totalPrice,
      }
    );
    return response;
  }
}

// Export singleton instance
export const couponService = new CouponService();
