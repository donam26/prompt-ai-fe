"use client";

import type { Coupon } from "@/types/entities/coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormActions } from "@/components/form-actions";
import { FormSwitch } from "@/components/form-switch";
import { Form } from "@/components/ui/form";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import { CouponBasicFields } from "./coupon-basic-fields";
import {
  couponSchema,
  getCouponFormDefaultValues,
  type CouponFormData,
} from "@/libs/form-schemas/coupon-schema";
import { COUPON_CONSTANTS } from "@/constants/coupon";

export interface Props {
  mode: FormMode;
  coupon?: Coupon | null;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (data: CouponFormData) => void;
  onCancel: () => void;
  className?: string;
}

export const CouponForm = ({
  mode,
  coupon,
  isLoading = false,
  isSaving = false,
  onSave,
  onCancel,
}: Props) => {
  const [isActive, setIsActive] = useState(coupon?.isActive ?? true);
  const isCreateMode = mode === FormMode.CREATE;

  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: getCouponFormDefaultValues(coupon),
  });

  const watchedType = form.watch("type");

  const handleSubmit = useCallback(
    (data: CouponFormData) => {
      onSave({
        ...data,
        type: data.type as any,
        isActive,
      });
    },
    [onSave, isActive]
  );

  const handleTypeChange = useCallback(
    (value: string) => {
      form.setValue("type", value as any);
    },
    [form]
  );

  const formButtonText = useMemo(() => {
    if (isSaving) {
      return isCreateMode ? BUTTON_TEXT.CREATING : BUTTON_TEXT.SAVING;
    }
    return isCreateMode ? BUTTON_TEXT.CREATE : BUTTON_TEXT.EDIT;
  }, [isCreateMode, isSaving]);

  const isDisabled = isSaving || isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminPageLayout
      title={isCreateMode ? "Create New Coupon" : "Edit Coupon"}
      description={
        isCreateMode ? "Add a new coupon to the system" : coupon?.code
      }
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isSaving}
          isDisabled={isDisabled}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={formButtonText}
          formId="coupon-form"
        />
      }
      showActionBottom
    >
      <Form {...form}>
        <form
          id="coupon-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Thông tin cơ bản
                <span className="text-red-500">*</span>
              </h3>
            </div>
            <CouponBasicFields
              control={form.control}
              errors={form.formState.errors}
              watchedType={watchedType}
              onTypeChange={handleTypeChange}
            />
          </AdminContentCard>

          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Trạng thái</h3>
            </div>
            <FormSwitch
              name="isActive"
              label="Kích hoạt mã giảm giá"
              checked={isActive}
              onCheckedChange={setIsActive}
              description="Mã giảm giá sẽ có hiệu lực khi được kích hoạt"
            />
          </AdminContentCard>
        </form>
      </Form>
    </AdminPageLayout>
  );
};
