import type { Coupon } from "@/types/entities/coupon";
import { useCallback, useState } from "react";
import { couponService } from "@/services/admin/coupons/couponService";
import { showToast } from "@/components/ui/toast";
import { COUPON_CONSTANTS } from "@/constants/coupon";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: Partial<Coupon>, id?: string | number) => Promise<boolean>;
}

export function useUpsertCoupon(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: Partial<Coupon>, id?: string | number): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await couponService.updateCoupon(id, data);
          showToast.success(COUPON_CONSTANTS.MESSAGES.UPDATE_SUCCESS);
        } else {
          await couponService.createCoupon(data);
          showToast.success(COUPON_CONSTANTS.MESSAGES.CREATE_SUCCESS);
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
        showToast.error(errorMessage || COUPON_CONSTANTS.MESSAGES.SAVE_ERROR);
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
