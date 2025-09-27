import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Coupon } from "@/lib/types";
import type { ApiResponse } from "@/types/common";

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
   * Get coupon by ID
   */
  async getCoupon(id: string | number) {
    return this.getById<Coupon>(id);
  }

  /**
   * Create new coupon
   */
  async createCoupon(data: Partial<Coupon>) {
    return this.create<Coupon, Partial<Coupon>>(data);
  }

  /**
   * Update coupon
   */
  async updateCoupon(id: string | number, data: Partial<Coupon>) {
    return this.update<Coupon, Partial<Coupon>>(id, data);
  }

  /**
   * Delete coupon
   */
  async deleteCoupon(id: string | number): Promise<ApiResponse<void>> {
    return this.delete<void>(id);
  }

  /**
   * Get coupon users
   */
  async getCouponUsers(id: string | number) {
    return this.getById(`${id}${ENDPOINTS.COUPONS.USERS}`);
  }

  /**
   * Validate coupon
   */
  async validateCoupon(code: string, totalPrice: number) {
    return this.post(ENDPOINTS.COUPONS.VALIDATE, {
      code,
      total: totalPrice,
    });
  }
}

// Export singleton instance
export const couponService = new CouponService();
