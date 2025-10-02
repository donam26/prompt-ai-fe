import { useState, useCallback } from "react";
import { subscriptionService } from "@/services/admin/subscriptions/subscriptionService";
import type { SubscriptionFormData } from "@/types/admin/subscription";

export const useUpsertSubscription = () => {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (
      subscriptionData: SubscriptionFormData,
      id?: string | number
    ): Promise<boolean> => {
      try {
        setIsUpserting(true);
        setError(null);

        if (id) {
          await subscriptionService.updateSubscription(id, subscriptionData);
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
