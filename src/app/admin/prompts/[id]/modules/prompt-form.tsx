"use client";

import type { Prompt } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormActions } from "@/components/form-actions";
import { Form } from "@/components/ui/form";
import { FormMode, BUTTON_TEXT } from "@/constants/common.constants";
import { PromptBasicFields } from "./prompt-basic-fields";
import { PromptAdvancedFields } from "./prompt-advanced-fields";
import { useCategories } from "@/hooks/admin/useCategory/useCategories";
import { useIndustries } from "@/hooks/admin/useIndustry";
import {
  promptFormSchema,
  getPromptFormDefaultValues,
  type PromptFormValues,
} from "@/libs/form-schemas";

export interface Props {
  mode: FormMode;
  prompt?: Prompt | null;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (data: PromptFormValues) => void;
  onCancel: () => void;
  className?: string;
}

export const PromptForm = ({
  mode,
  prompt,
  isLoading = false,
  isSaving = false,
  onSave,
  onCancel,
}: Props) => {
  const isCreateMode = mode === FormMode.CREATE;

  // Fetch categories data
  const { categoriesWithPagination, isFetching: categoriesLoading } =
    useCategories({
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
    });

  // Fetch industries data
  const { industriesWithPagination, isLoading: industriesLoading } =
    useIndustries({
      pagination: {
        page: 1,
        pageSize: 100,
      },
    });

  const categories = Array.isArray(categoriesWithPagination?.data)
    ? categoriesWithPagination.data
    : [];

  const industries = Array.isArray(industriesWithPagination?.data)
    ? industriesWithPagination.data
    : [];

  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: getPromptFormDefaultValues(prompt),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = form;

  // Update form when prompt changes
  useEffect(() => {
    if (prompt) {
      const defaultValues = getPromptFormDefaultValues(prompt);
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof PromptFormValues, value);
      });
    }
  }, [prompt, setValue]);

  const isDisabled = useMemo(() => {
    return isSaving || !isDirty || categoriesLoading || industriesLoading;
  }, [isSaving, isDirty, categoriesLoading, industriesLoading]);

  const onSubmit = useCallback(
    (data: PromptFormValues) => {
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

  if (isLoading || categoriesLoading || industriesLoading) {
    return (
      <AdminPageLayout
        title={isCreateMode ? "Create New Prompt" : "Edit Prompt"}
        description={
          isCreateMode ? "Add a new prompt to the system" : prompt?.title
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
      title={isCreateMode ? "Create New Prompt" : "Edit Prompt"}
      description={
        isCreateMode ? "Add a new prompt to the system" : prompt?.title
      }
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isSaving}
          isDisabled={isDisabled}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={formButtonText}
          formId="prompt-form"
        />
      }
      showActionBottom
    >
      <Form {...form}>
        <form
          id="prompt-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Basic Information Card */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Basic Information
                <span className="text-red-500">*</span>
              </h3>
            </div>
            <PromptBasicFields
              control={control}
              isDisabled={isSaving}
              categories={categories}
              industries={industries}
            />
          </AdminContentCard>

          {/* Advanced Settings Card */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Advanced Settings</h3>
            </div>
            <PromptAdvancedFields control={control} isDisabled={isSaving} />
          </AdminContentCard>
        </form>
      </Form>
    </AdminPageLayout>
  );
};
