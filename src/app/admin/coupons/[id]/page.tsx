"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useUpsertCoupon, useCouponDetail } from "@/hooks/admin/useCoupon";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { COUPON_CONSTANTS } from "@/constants/coupon";
import { FormMode } from "@/constants/common";
import { CouponForm } from "./modules";

export default function CouponDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const couponIdToUpdate = isCreateMode ? undefined : id;

  const {
    coupon: couponData,
    isLoading,
    error: couponDetailError,
  } = useCouponDetail(couponIdToUpdate);
  const {
    mutate: upsertCoupon,
    isUpserting,
    error: upsertCouponError,
  } = useUpsertCoupon();

  const handleSave = useCallback(
    async (data: any) => {
      const result = await upsertCoupon(data, couponIdToUpdate);
      if (result) {
        router.push(COUPON_CONSTANTS.ROUTES.COUPONS);
      }
    },
    [couponIdToUpdate, upsertCoupon, router]
  );

  const handleCancel = useCallback(() => {
    router.push(COUPON_CONSTANTS.ROUTES.COUPONS);
  }, [router]);

  useEffect(() => {
    const errorMessage = couponDetailError || upsertCouponError;
    if (!errorMessage) {
      return;
    }
    showToast.error(errorMessage);
    if (couponDetailError) {
      router.push(COUPON_CONSTANTS.ROUTES.COUPONS);
    }
  }, [couponDetailError, upsertCouponError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (isUpserting) {
    return <FormSkeleton />;
  }

  return (
    <CouponForm
      coupon={couponData}
      mode={formMode}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaving={isUpserting}
      isLoading={isLoading}
    />
  );
}
