import { useState, useCallback } from "react";
import { subscriptionService } from "@/services/admin/subscriptions/subscriptionService";
import { Subscription } from "@/types/entities/user";

export const useUpsertSubscription = () => {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (
      subscriptionData: Partial<Subscription>,
      id?: string | number
    ): Promise<boolean> => {
      try {
        setIsUpserting(true);
        setError(null);

        if (id) {
          await subscriptionService.updateSubscription(
            id.toString(),
            subscriptionData
          );
        } else {
          await subscriptionService.createSubscription(subscriptionData);
        }

        return true;
      } catch (err: any) {
        setError(
          err?.response?.data?.message || err?.message || "Có lỗi xảy ra"
        );
        return false;
      } finally {
        setIsUpserting(false);
      }
    },
    []
  );

  return {
    mutate,
    isUpserting,
    error,
  };
};
