import type { Payment } from "@/lib/types";
import { useCallback, useState } from "react";
import { paymentService } from "@/services/admin/payments/paymentService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (payment: Payment) => Promise<boolean>;
}

export function useDeletePayment(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (payment: Payment): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await paymentService.deletePayment(payment.id);
      showToast.success("Payment deleted successfully!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete payment";
      setError(() => errorMessage);
      showToast.error(errorMessage);
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
