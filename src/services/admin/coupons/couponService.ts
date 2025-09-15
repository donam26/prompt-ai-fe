import { apiClient, buildUrlWithParams } from "../../base/apiClient";
import { ENDPOINTS } from "@/constants";
import { ServiceMethod } from "../../base/types";

// Coupon service parameters
export interface CouponListParams {
  [key: string]: unknown;
}

export class CouponService {
  // Get coupons list
  getListCoupon: ServiceMethod<CouponListParams> = params => {
    const queryString =
      buildUrlWithParams(ENDPOINTS.COUPONS.BASE, params).split("?")[1] || "";
    return apiClient.get(`${ENDPOINTS.COUPONS.BASE}?${queryString}`);
  };

  // Create coupon
  createCoupon: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.COUPONS.BASE, data);
  };

  // Update coupon
  updateCoupon: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.COUPONS.BASE}/${id}`, data);
    };

  // Delete coupon
  deleteCoupon: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.COUPONS.BASE}/${id}`);
  };

  // Get coupon users
  getCouponUsers: ServiceMethod<string | number> = id => {
    return apiClient.get(
      `${ENDPOINTS.COUPONS.BASE}/${id}${ENDPOINTS.COUPONS.USERS}`
    );
  };

  // Validate coupon
  validateCoupon: ServiceMethod<{ code: string; totalPrice: number }> =
    params => {
      const { code, totalPrice } = params || {};
      return apiClient.post(ENDPOINTS.COUPONS.VALIDATE, {
        code,
        total: totalPrice,
      });
    };
}

// Export singleton instance
export const couponService = new CouponService();
