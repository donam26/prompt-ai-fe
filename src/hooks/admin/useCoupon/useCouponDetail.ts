import { useState, useEffect } from "react";
import { couponService } from "@/services/admin/coupons/couponService";
import type { Coupon } from "@/types/entities/coupon";

interface IResponse {
  coupon: Coupon | null;
  isLoading: boolean;
  error: string;
}

export function useCouponDetail(id?: string): IResponse {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setCoupon(null);
      return;
    }

    const fetchCoupon = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await couponService.getCouponById(id);
        if (response.success && response.data) {
          setCoupon(response.data);
        } else {
          setError("Coupon not found");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  return {
    coupon,
    isLoading,
    error,
  };
}
