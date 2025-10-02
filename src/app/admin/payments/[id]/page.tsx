"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { usePaymentDetail } from "@/hooks/admin/usePayment";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { PAYMENTS_CONSTANTS } from "@/constants/payments";
import { PaymentViewForm } from "./modules/payment-view-form";

export default function PaymentViewPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const {
    payment: paymentData,
    isLoading,
    error: paymentDetailError,
  } = usePaymentDetail(id);

  const handleBack = useCallback(() => {
    router.push(PAYMENTS_CONSTANTS.ROUTES.PAYMENTS);
  }, [router]);

  useEffect(() => {
    if (paymentDetailError) {
      showToast.error(paymentDetailError);
      router.push(PAYMENTS_CONSTANTS.ROUTES.PAYMENTS);
    }
  }, [paymentDetailError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <PaymentViewForm
      payment={paymentData}
      onBack={handleBack}
      isLoading={isLoading}
    />
  );
}
