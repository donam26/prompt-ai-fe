"use client";

import type { Category } from "@/types";
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
import { useIndustries } from "@/hooks/admin/useIndustry";
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
}

export const CategoryForm = ({
  mode,
  category,
  isLoading = false,
  isSaving = false,
  onSave,
  onCancel,
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const isCreateMode = mode === FormMode.CREATE;

  // Fetch industries data
  const { industriesWithPagination, isLoading: industriesLoading } =
    useIndustries({
      pagination: {
        page: 1,
        pageSize: 100,
      },
    });

  const industries = Array.isArray(industriesWithPagination?.data)
    ? industriesWithPagination.data
    : [];

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
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof CategoryFormValues, value);
      });
    }
  }, [category, setValue]);

  const categoryImage = watch("image");

  const isDisabled = useMemo(() => {
    return isSaving || !isDirty || isUploading || industriesLoading;
  }, [isSaving, isDirty, isUploading, industriesLoading]);

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

  if (isLoading || industriesLoading) {
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
              setValue={(name: string, value: any) =>
                setValue(name as keyof CategoryFormValues, value)
              }
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
                Basic Information
                <span className="text-red-500">*</span>
              </h3>
            </div>
            <CategoryBasicFields
              control={control}
              isDisabled={isSaving}
              industries={industries}
            />
            <Controller
              name="is_comming_soon"
              control={control}
              render={({ field }) => (
                <FormSwitch
                  name="is_comming_soon"
                  label="Coming Soon"
                  description="Mark this category as coming soon"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  isDisabled={isSaving}
                />
              )}
            />
          </AdminContentCard>
        </form>
      </Form>
    </AdminPageLayout>
  );
};
