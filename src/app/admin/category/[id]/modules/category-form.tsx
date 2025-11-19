"use client";

import type { Category, Industry } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormActions } from "@/components/form-actions";
import { FormImageSection } from "@/components/form-image-section";
import { FormSwitch } from "@/components/form-switch";
import { Form } from "@/components/ui/form";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import { CategoryBasicFields } from "./category-basic-fields";
import {
  categoryFormSchema,
  getCategoryFormDefaultValues,
  type CategoryFormValues,
} from "@/libs/form-schemas";

export interface Props {
  mode: FormMode;
  category?: Category | null;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (data: CategoryFormValues) => void;
  onCancel: () => void;
  className?: string;
  industries?: Industry[];
  industriesLoading?: boolean;
  industriesSearch?: string;
  onIndustriesSearch?: (search: string) => void;
  onIndustriesScrollToBottom?: () => void;
  hasMoreIndustries?: boolean;
}

export const CategoryForm = ({
  mode,
  category,
  isLoading = false,
  isSaving = false,
  onSave,
  onCancel,
  industries = [],
  industriesLoading = false,
  industriesSearch = "",
  onIndustriesSearch,
  onIndustriesScrollToBottom,
  hasMoreIndustries = false,
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const isCreateMode = mode === FormMode.CREATE;

  // Industries data is now passed as props from parent component

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: getCategoryFormDefaultValues(category),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = form;

  // Update form when category changes
  useEffect(() => {
    if (category) {
      const defaultValues = getCategoryFormDefaultValues(category);
      for (const [key, value] of Object.entries(defaultValues)) {
        setValue(key as keyof CategoryFormValues, value);
      }
    }
  }, [category, setValue]);

  const categoryImage = watch("image");

  const isDisabled = useMemo(() => {
    return isSaving || !isDirty || isUploading;
  }, [isSaving, isDirty, isUploading]);

  const onSubmit = useCallback(
    (data: CategoryFormValues) => {
      onSave(data);
    },
    [onSave]
  );

  const formButtonText = isSaving
    ? mode === FormMode.CREATE
      ? BUTTON_TEXT.CREATING
      : BUTTON_TEXT.SAVING
    : mode === FormMode.CREATE
      ? BUTTON_TEXT.CREATE
      : BUTTON_TEXT.EDIT;

  if (isLoading) {
    return (
      <AdminPageLayout
        title={isCreateMode ? "Create New Category" : "Edit Category"}
        description={
          isCreateMode ? "Add a new category to the system" : category?.name
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
      title={isCreateMode ? "Create New Category" : "Edit Category"}
      description={
        isCreateMode ? "Add a new category to the system" : category?.name
      }
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isSaving}
          isDisabled={isDisabled}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={formButtonText}
          formId="category-form"
        />
      }
      showActionBottom
    >
      <Form {...form}>
        <form
          id="category-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <AdminContentCard>
            <FormImageSection
              name="image"
              title="Image"
              currentImage={categoryImage}
              setValue={(
                name: string,
                value: any,
                options?: { shouldDirty?: boolean }
              ) => setValue(name as keyof CategoryFormValues, value, options)}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              isDisabled={isSaving}
              uploadSuccessMessage="Image uploaded successfully"
              uploadErrorMessage="Image upload failed"
            />
          </AdminContentCard>

          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Basic Information <span className="text-red-500">*</span>
              </h3>
            </div>
            <CategoryBasicFields
              control={control}
              isDisabled={isSaving}
              industries={industries}
              industriesLoading={industriesLoading}
              industriesSearch={industriesSearch}
              onIndustriesSearch={onIndustriesSearch}
              onIndustriesScrollToBottom={onIndustriesScrollToBottom}
              hasMoreIndustries={hasMoreIndustries}
            />
            <Controller
              name="isCommingSoon"
              control={control}
              render={({ field }) => (
                <FormSwitch
                  name="isCommingSoon"
                  label="Coming Soon"
                  description="Mark this category as coming soon"
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  isDisabled={isSaving}
                />
              )}
            />
          </AdminContentCard>

          {/* Industries Section - only show in edit mode */}
          {!isCreateMode && (
            <AdminContentCard>
              <div className="mb-4">
                <h3 className="font-semibold text-lg">
                  Industries in this category
                  {industriesLoading && (
                    <span className="ml-2 text-gray-500 text-sm">
                      (Loading...)
                    </span>
                  )}
                </h3>
              </div>

              {industries.length > 0 ? (
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {industries.map(industry => (
                    <div
                      key={industry.id}
                      className="bg-gray-50 p-3 border rounded-lg"
                    >
                      <h4 className="font-medium text-sm">{industry.name}</h4>
                      {industry.description && (
                        <p className="mt-1 text-gray-600 text-xs">
                          {industry.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-gray-500 text-center">
                  {industriesLoading
                    ? "Loading industries..."
                    : "No industries found in this category"}
                </div>
              )}
            </AdminContentCard>
          )}
        </form>
      </Form>
    </AdminPageLayout>
  );
};
