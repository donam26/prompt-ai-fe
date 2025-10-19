import { useState, useEffect } from "react";
import { subscriptionService } from "@/services/admin/subscriptions/subscriptionService";
import type { Subscription } from "@/types";

export const usePricingSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await subscriptionService.getSubscriptions({
          pageIndex: 1,
          pageSize: 100,
        });

        const data = response.data?.data || [];
        setSubscriptions(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []); // Empty dependency array - only fetch once

  return {
    subscriptions,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError("");
      // Re-run the effect logic
      const fetchSubscriptions = async () => {
        try {
          const response = await subscriptionService.getSubscriptions({
            pageIndex: 1,
            pageSize: 100,
          });

          const data = response.data?.data || [];
          setSubscriptions(data);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An error occurred";
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSubscriptions();
    },
  };
};
