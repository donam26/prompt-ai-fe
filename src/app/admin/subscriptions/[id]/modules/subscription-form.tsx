"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BaseTextField, BaseTextareaField } from "@/components/ui/base";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormImageSection } from "@/components/form-image-section";
import { FormActions } from "@/components/form-actions";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import { BillingCycle, BILLING_CYCLE_OPTIONS } from "@/types/enums";
import { Plus, Trash2 } from "lucide-react";
import type { SubscriptionFormProps } from "@/types/admin/subscription";
import {
  subscriptionFormSchema,
  getSubscriptionFormDefaultValues,
  type SubscriptionFormSchema,
} from "@/libs/form-schemas";
import { SUBSCRIPTIONS_CONSTANTS } from "@/constants/subscriptions";
import { Form } from "@/components/ui/form";

export const SubscriptionForm = ({
  subscription,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditMode = false,
  isDataLoading = false,
}: SubscriptionFormProps): React.JSX.Element => {
  const [isUploading, setIsUploading] = useState(false);
  const isCreateMode = !isEditMode;

  // Calculate default values based on subscription data
  const getDefaultValues = useCallback((): SubscriptionFormSchema => {
    return getSubscriptionFormDefaultValues(subscription);
  }, [subscription]);

  const form = useForm<SubscriptionFormSchema>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = form;

  const contentSubscriptions = watch("contentSubscriptions") || [];

  // Update form when subscription changes
  useEffect(() => {
    if (subscription) {
      const defaultValues = getDefaultValues();
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof SubscriptionFormSchema, value);
      });
    }
  }, [subscription, setValue, getDefaultValues]);

  const formData = watch();
  const isDisabled = useMemo(() => {
    return isLoading || !isDirty || isUploading;
  }, [isLoading, isDirty, isUploading]);

  const handleFormSubmit = useCallback(
    async (data: SubscriptionFormSchema) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  const formButtonText = isLoading
    ? isCreateMode
      ? BUTTON_TEXT.CREATING
      : BUTTON_TEXT.SAVING
    : isCreateMode
      ? BUTTON_TEXT.CREATE
      : BUTTON_TEXT.EDIT;

  // Helper functions for content subscriptions
  const getIncludedContent = () =>
    contentSubscriptions.filter(item => item.included);
  const getNotIncludedContent = () =>
    contentSubscriptions.filter(item => !item.included);

  const addContentSubscription = (included: boolean) => {
    const newContent = {
      content: "",
      included,
    };
    setValue("contentSubscriptions", [...contentSubscriptions, newContent]);
  };

  const removeContentSubscription = (index: number) => {
    const updatedContent = contentSubscriptions.filter((_, i) => i !== index);
    setValue("contentSubscriptions", updatedContent);
  };

  const updateContentSubscription = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedContent = [...contentSubscriptions];
    updatedContent[index] = { ...updatedContent[index], [field]: value };
    setValue("contentSubscriptions", updatedContent);
  };

  // Helper to get the actual index in the full array from filtered array
  const getActualIndex = (filteredIndex: number, included: boolean) => {
    const targetArray = included
      ? getIncludedContent()
      : getNotIncludedContent();
    const targetItem = targetArray[filteredIndex];
    return contentSubscriptions.findIndex(item => item === targetItem);
  };

  // Content Item Component
  const ContentItem = ({
    content,
    index,
    included,
    actualIndex,
  }: {
    content: any;
    index: number;
    included: boolean;
    actualIndex: number;
  }) => (
    <div
      className={`space-y-3 p-3 border rounded-lg ${
        included
          ? "bg-green-50/30 border-green-200"
          : "bg-red-50/30 border-red-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`font-medium text-sm ${
            included ? "text-green-800" : "text-red-800"
          }`}
        >
          #{index + 1}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => removeContentSubscription(actualIndex)}
          className="p-1 w-6 h-6 text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      <BaseTextField
        id={`content-${included ? "included" : "not-included"}-${actualIndex}`}
        label=""
        value={content.content}
        onChange={(e: any) =>
          updateContentSubscription(
            actualIndex,
            "content",
            e?.target?.value || e || ""
          )
        }
        placeholder={
          included
            ? "Tính năng được bao gồm..."
            : "Tính năng không được bao gồm..."
        }
      />
    </div>
  );

  if (isDataLoading) {
    return (
      <AdminPageLayout
        title={isCreateMode ? "Tạo gói đăng ký mới" : "Chỉnh sửa gói đăng ký"}
        description={
          isCreateMode
            ? "Tạo gói đăng ký mới với thông tin chi tiết"
            : subscription?.name
        }
        showActionBottom
      >
        <div className="space-y-6">
          <div className="bg-gray-200 rounded w-full h-64 animate-pulse" />
          <div className="bg-gray-200 rounded w-full h-32 animate-pulse" />
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title={isCreateMode ? "Tạo gói đăng ký mới" : "Chỉnh sửa gói đăng ký"}
      description={
        isCreateMode
          ? "Tạo gói đăng ký mới với thông tin chi tiết"
          : subscription?.name
      }
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isLoading}
          isDisabled={isDisabled}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={formButtonText}
          formId="subscription-form"
        />
      }
      showActionBottom
    >
      <Form {...form}>
        <form
          id="subscription-form"
          onSubmit={e => {
            handleSubmit(handleFormSubmit)(e);
          }}
          className="space-y-6"
        >
          {/* Image Discount Section */}
          <AdminContentCard>
            <Controller
              name="imageDiscount"
              control={control}
              render={({ field }) => (
                <FormImageSection
                  name="imageDiscount"
                  title="Ảnh giảm giá"
                  currentImage={field.value || ""}
                  setValue={(
                    name: string,
                    value: any,
                    options?: { shouldDirty?: boolean }
                  ) =>
                    setValue(
                      name as keyof SubscriptionFormSchema,
                      value,
                      options
                    )
                  }
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                  isDisabled={isLoading}
                  uploadSuccessMessage="Ảnh giảm giá đã được tải lên thành công"
                  uploadErrorMessage="Có lỗi xảy ra khi tải lên ảnh giảm giá"
                />
              )}
            />
          </AdminContentCard>

          {/* Basic Information */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Thông tin cơ bản
                <span className="text-red-500">*</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {/* Name */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="name"
                      label="Tên gói"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Nhập tên gói đăng ký"
                      required
                      error={errors.name?.message}
                    />
                  )}
                />

                {/* Type */}
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="type"
                      label="Loại gói"
                      value={String(field.value)}
                      onChange={(e: any) => {
                        const value = e?.target?.value || e || "";
                        // Allow empty string or valid numbers
                        if (value === "" || !isNaN(Number(value))) {
                          field.onChange(value === "" ? 1 : Number(value));
                        }
                      }}
                      placeholder="1"
                      required
                      error={errors.type?.message}
                    />
                  )}
                />

                {/* Duration */}
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="duration"
                      label="Số token"
                      value={String(field.value)}
                      onChange={(e: any) => {
                        const value = e?.target?.value || e || "";
                        // Allow empty string or valid numbers
                        if (value === "" || !isNaN(Number(value))) {
                          field.onChange(value === "" ? 0 : Number(value));
                        }
                      }}
                      placeholder="Số token"
                      required
                      error={errors.duration?.message}
                    />
                  )}
                />

                {/* Billing Cycle */}
                <div className="space-y-2">
                  <label htmlFor="billingCycle" className="font-medium text-sm">
                    Chu kỳ thanh toán <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="billingCycle"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn chu kỳ thanh toán" />
                        </SelectTrigger>
                        <SelectContent>
                          {BILLING_CYCLE_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.billingCycle && (
                    <p className="text-red-500 text-sm">
                      {errors.billingCycle.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="price"
                      label="Giá tiền"
                      value={field.value}
                      onChange={(e: any) => {
                        const value = e?.target?.value || e || "";
                        // Allow empty string, numbers, and decimal points
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                      placeholder="995000.00"
                      required
                      error={errors.price?.message}
                    />
                  )}
                />

                {/* Price Year */}
                <Controller
                  name="priceYear"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="priceYear"
                      label="Giá năm"
                      value={field.value || ""}
                      onChange={(e: any) => {
                        const value = e?.target?.value || e || "";
                        // Allow empty string, numbers, and decimal points
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                      placeholder="Giá năm (tùy chọn)"
                      error={errors.priceYear?.message}
                    />
                  )}
                />

                {/* Is Popular */}
                <div className="flex items-center space-x-2">
                  <Controller
                    name="isPopular"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Switch
                          id="isPopular"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="isPopular"
                          className="font-medium text-sm"
                        >
                          Đánh dấu là gói phổ biến
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Description */}
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <BaseTextareaField
                    id="description"
                    label="Mô tả"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Nhập mô tả gói đăng ký"
                    rows={3}
                    error={errors.description?.message}
                  />
                )}
              />
            </div>
          </AdminContentCard>

          {/* Additional Pricing */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Thông tin giá bổ sung</h3>
            </div>

            <div className="space-y-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {/* Description Per Year */}
                <Controller
                  name="descriptionPerYear"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="descriptionPerYear"
                      label="Mô tả theo năm"
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Mô tả theo năm (tùy chọn)"
                      error={errors.descriptionPerYear?.message}
                    />
                  )}
                />

                {/* Price Per Month Year */}
                <Controller
                  name="pricePerMonthYear"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="pricePerMonthYear"
                      label="Giá tháng theo năm"
                      value={field.value || ""}
                      onChange={(e: any) => {
                        const value = e?.target?.value || e || "";
                        // Allow empty string, numbers, and decimal points
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                      placeholder="Giá tháng theo năm (tùy chọn)"
                      error={errors.pricePerMonthYear?.message}
                    />
                  )}
                />

                {/* Price Total Yearly */}
                <Controller
                  name="priceTotalYearly"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      id="priceTotalYearly"
                      label="Tổng giá hàng năm"
                      value={field.value || ""}
                      onChange={(e: any) => {
                        const value = e?.target?.value || e || "";
                        // Allow empty string, numbers, and decimal points
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                      placeholder="Tổng giá hàng năm (tùy chọn)"
                      error={errors.priceTotalYearly?.message}
                    />
                  )}
                />
              </div>
            </div>
          </AdminContentCard>

          {/* Content Subscriptions */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Nội dung gói đăng ký</h3>
              <p className="mt-1 text-gray-600 text-sm">
                Quản lý các tính năng được bao gồm và không bao gồm trong gói
                đăng ký
              </p>
            </div>

            <Tabs defaultValue="included" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger
                  value="included"
                  className="flex items-center gap-2"
                >
                  <div className="bg-green-500 rounded-full w-2 h-2"></div>
                  Được bao gồm ({getIncludedContent().length})
                </TabsTrigger>
                <TabsTrigger
                  value="not-included"
                  className="flex items-center gap-2"
                >
                  <div className="bg-red-500 rounded-full w-2 h-2"></div>
                  Không bao gồm ({getNotIncludedContent().length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="included" className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-700">
                    Tính năng bao gồm
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContentSubscription(true)}
                    className="hover:bg-green-50 border-green-200 text-green-700"
                  >
                    <Plus className="mr-1 w-4 h-4" />
                    Thêm
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {getIncludedContent().map((content, index) => (
                    <ContentItem
                      key={getActualIndex(index, true)}
                      content={content}
                      index={index}
                      included={true}
                      actualIndex={getActualIndex(index, true)}
                    />
                  ))}
                  {getIncludedContent().length === 0 && (
                    <div className="py-6 text-gray-500 text-sm text-center">
                      Chưa có tính năng nào
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="not-included" className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-red-700">
                    Tính năng không bao gồm
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addContentSubscription(false)}
                    className="hover:bg-red-50 border-red-200 text-red-700"
                  >
                    <Plus className="mr-1 w-4 h-4" />
                    Thêm
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {getNotIncludedContent().map((content, index) => (
                    <ContentItem
                      key={getActualIndex(index, false)}
                      content={content}
                      index={index}
                      included={false}
                      actualIndex={getActualIndex(index, false)}
                    />
                  ))}
                  {getNotIncludedContent().length === 0 && (
                    <div className="py-6 text-gray-500 text-sm text-center">
                      Chưa có tính năng nào
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </AdminContentCard>
        </form>
      </Form>
    </AdminPageLayout>
  );
};
