import { useState } from "react";
import {
  paymentApi,
  type DiscountRequest,
  type DiscountApplyResponse,
} from "@/services/api";

export const useDiscount = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyDiscount = async (
    request: DiscountRequest
  ): Promise<DiscountApplyResponse> => {
    setIsApplying(true);
    setError(null);

    try {
      const response = await paymentApi.applyDiscount(request);
      return response;
    } catch (err: any) {
      const errorMessage =
        err.response && err.response.data && err.response.data.error?.message
          ? err.response.data.error?.message
          : "Có lỗi xảy ra khi áp dụng mã giảm giá";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsApplying(false);
    }
  };

  return {
    applyDiscount,
    isApplying,
    error,
    clearError: () => setError(null),
  };
};
