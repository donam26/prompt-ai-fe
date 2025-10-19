import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface CheckoutData {
  planId: string;
  planName: string;
  planPrice: number;
  planType: number;
  features: string[];
  paymentMethod: string;
}

export function useCheckoutData() {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const planId = searchParams.get("planId");
      const planName = searchParams.get("planName");
      const planPrice = searchParams.get("planPrice");
      const planType = searchParams.get("planType");
      const features = searchParams.get("features");
      const paymentMethod = searchParams.get("paymentMethod");

      if (!planId || !planName || !planPrice || !planType || !paymentMethod) {
        setError("Thiếu thông tin thanh toán");
        setIsLoading(false);
        return;
      }

      const data: CheckoutData = {
        planId,
        planName,
        planPrice: parseInt(planPrice),
        planType: parseInt(planType),
        features: features ? features.split(",") : [],
        paymentMethod,
      };

      setCheckoutData(data);
      setError(null);
    } catch {
      setError("Lỗi khi tải thông tin thanh toán");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  return { checkoutData, isLoading, error };
}
