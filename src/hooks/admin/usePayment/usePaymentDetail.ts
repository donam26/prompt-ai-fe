import { useCallback, useEffect, useState } from "react";
import { paymentService } from "@/services/admin/payments/paymentService";
import type { Payment } from "@/lib/types";

interface IResponse {
  payment: Payment | null;
  isLoading: boolean;
  error: string;
  fetchPaymentDetail: (id: string | number) => Promise<void>;
}

export function usePaymentDetail(id?: string | number): IResponse {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchPaymentDetail = useCallback(async (paymentId: string | number) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await paymentService.getPayment(paymentId);
      setPayment(response.data || null);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      setPayment(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchPaymentDetail(id);
    }
  }, [id, fetchPaymentDetail]);

  return {
    payment,
    isLoading,
    error,
    fetchPaymentDetail,
  };
}
