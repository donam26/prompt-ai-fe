import { useCallback, useEffect, useState } from "react";
import { useSubscriptions } from "@/hooks/admin/useSubscription/useSubscriptions";
import { SubscriptionFormData } from "@/types/admin/subscription";
import { Subscription } from "@/types/entities/user";

interface UsePricingPlansReturn {
  readonly plans: SubscriptionFormData[];
  readonly isLoading: boolean;
  readonly error: string;
  readonly refetch: () => void;
}

/**
 * Hook to fetch and transform subscription data into pricing plans
 */
export const usePricingPlans = (): UsePricingPlansReturn => {
  const [plans, setPlans] = useState<SubscriptionFormData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    subscriptions,
    isFetching,
    error: subscriptionError,
    refetch: refetchSubscriptions,
  } = useSubscriptions({
    pagination: { pageIndex: 0, pageSize: 100 }, // Get all subscriptions
  });

  const transformSubscriptionToPricingPlan = useCallback(
    (subscription: Subscription): SubscriptionFormData | null => {
      try {
        // Map subscription data to pricing plan format
        const planId = subscription.name.toLowerCase().replace(/\s+/g, "-");

        const transformedPlan: SubscriptionFormData = {
          ...subscription,
          id: planId,
          name: subscription.name,
          type: subscription.type,
          duration: parseInt(subscription.duration?.toString() || "1"),
          billingCycle: subscription.billingCycle,
          price: subscription.price.toString(),
          description: subscription.description || "",
          isPopular: subscription.type === 2,
          isActive: subscription.isActive ?? true,
          displayOrder: subscription.displayOrder ?? 0,
          imageDiscount: subscription.imageDiscount || undefined,
          isEnterprise: subscription.type === 3,
          buttonText:
            subscription.type === 1
              ? "Bắt đầu miễn phí"
              : subscription.type === 2
                ? "Nâng cấp Pro"
                : "Liên hệ bán hàng",
          buttonVariant:
            subscription.type === 1
              ? "outline"
              : subscription.type === 2
                ? "default"
                : "secondary",
          ctaText:
            subscription.type === 3 ? "Liên hệ để được tư vấn" : undefined,
          badge: subscription.type === 2 ? "Phổ biến nhất" : undefined,
        };

        return transformedPlan;
      } catch (err) {
        console.error("Error transforming subscription:", err);
        return null;
      }
    },
    []
  );

  const processSubscriptions = useCallback(() => {
    if (!subscriptions || subscriptions.length === 0) {
      setPlans([]);
      return;
    }
    // Show plans the catalog marks active (subscriptions.is_active), instead of a
    // hardcoded type list that both showed deactivated plans and hid active ones.
    const sortedSubscriptions = [...subscriptions]
      .sort((a, b) => a.type - b.type)
      .filter(subscription => subscription.isActive ?? true);
    const transformedPlans = sortedSubscriptions
      .map(transformSubscriptionToPricingPlan)
      .filter((plan): plan is SubscriptionFormData => plan !== null);

    setPlans(transformedPlans);
  }, [subscriptions, transformSubscriptionToPricingPlan]);

  useEffect(() => {
    setIsLoading(isFetching);
    setError(subscriptionError);
  }, [isFetching, subscriptionError]);

  useEffect(() => {
    processSubscriptions();
  }, [processSubscriptions]);

  const refetch = useCallback(() => {
    refetchSubscriptions();
  }, [refetchSubscriptions]);

  return {
    plans,
    isLoading,
    error,
    refetch,
  };
};
