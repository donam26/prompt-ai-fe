import { useState, useCallback } from "react";
import { subscriptionService } from "@/services/admin/subscriptions/subscriptionService";

export const useDeleteSubscription = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (id: string | number): Promise<boolean> => {
    try {
      setIsDeleting(true);
      setError(null);

      await subscriptionService.deleteSubscription(id);
      return true;
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Có lỗi xảy ra");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    mutate,
    isDeleting,
    error,
  };
};
