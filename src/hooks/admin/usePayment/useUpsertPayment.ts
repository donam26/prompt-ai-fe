import type { Payment } from "@/types";
import { useCallback, useState } from "react";
import { paymentService } from "@/services/admin/payments/paymentService";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: Partial<Payment>, id?: string | number) => Promise<boolean>;
}

export function useUpsertPayment(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: Partial<Payment>, id?: string | number): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await paymentService.updatePayment(id, data);
        } else {
          await paymentService.createPayment(data);
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
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
