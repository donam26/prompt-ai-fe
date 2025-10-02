"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SubscriptionForm } from "./modules/subscription-form";
import { useSubscriptionDetail, useUpsertSubscription } from "@/hooks/admin";
import { showToast } from "@/components/ui/toast";
import { SUBSCRIPTIONS_CONSTANTS } from "@/constants/subscriptions";

export default function SubscriptionEditPage(): React.JSX.Element {
  const router = useRouter();
  const params = useParams();
  const subscriptionId = params?.id as string;
  const isEditMode = subscriptionId !== "new";

  const [isLoading, setIsLoading] = useState(false);

  const {
    subscription,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useSubscriptionDetail(subscriptionId, {
    enabled: isEditMode,
  });

  const {
    mutate: upsertSubscription,
    isUpserting,
    error: upsertError,
  } = useUpsertSubscription();

  // Error handling
  useEffect(() => {
    if (detailError) {
      showToast.error(detailError);
    }
  }, [detailError]);

  useEffect(() => {
    if (upsertError) {
      showToast.error(upsertError);
    }
  }, [upsertError]);

  const handleSubmit = async (subscriptionData: any): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await upsertSubscription(
        subscriptionData,
        isEditMode ? subscriptionId : undefined
      );

      if (result) {
        showToast.success(
          isEditMode
            ? SUBSCRIPTIONS_CONSTANTS.MESSAGES.UPDATE_SUCCESS
            : SUBSCRIPTIONS_CONSTANTS.MESSAGES.CREATE_SUCCESS
        );
        router.push("/admin/subscriptions");
      }
    } catch (error) {
      console.error("Submit subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (): void => {
    router.push("/admin/subscriptions");
  };

  const isDataLoading = isEditMode ? isLoadingDetail : false;
  const isSubmitting = isLoading || isUpserting;

  return (
    <SubscriptionForm
      subscription={subscription || undefined}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isSubmitting}
      isEditMode={isEditMode}
      isDataLoading={isDataLoading}
    />
  );
}
