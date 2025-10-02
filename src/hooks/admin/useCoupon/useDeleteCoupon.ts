import type { Coupon } from "@/types/entities/coupon";
import { useCallback, useState } from "react";
import { couponService } from "@/services/admin/coupons/couponService";
import { showToast } from "@/components/ui/toast";
import { COUPON_CONSTANTS } from "@/constants/coupon";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (coupon: Coupon) => Promise<boolean>;
}

export function useDeleteCoupon(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (coupon: Coupon): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await couponService.deleteCoupon(coupon.id);
      showToast.success(COUPON_CONSTANTS.MESSAGES.DELETE_SUCCESS);
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(() => errorMessage);
      showToast.error(errorMessage || COUPON_CONSTANTS.MESSAGES.DELETE_ERROR);
      return false;
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
