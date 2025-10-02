import { useState, useCallback, useEffect } from "react";
import { subscriptionService } from "@/services/admin/subscriptions/subscriptionService";
import type { Subscription } from "@/types";

interface UseSubscriptionDetailOptions {
  enabled?: boolean;
}

export const useSubscriptionDetail = (
  id?: string | number,
  options: UseSubscriptionDetailOptions = {}
) => {
  const { enabled = true } = options;
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchSubscription = useCallback(async () => {
    if (!id || !enabled) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await subscriptionService.getSubscription(id);
      setSubscription(response?.data || null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [id, enabled]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const refetch = useCallback(() => {
    return fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    isLoading,
    error,
    refetch,
  };
};
