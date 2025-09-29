"use client";

import type { Category } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import {
  useCategoryDetail,
  useUpsertCategory,
} from "@/hooks/admin/useCategory";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { CATEGORY_CONSTANTS } from "@/constants/category";
import { FormMode } from "@/constants/common";
import { CategoryForm } from "./modules/category-form";

export default function CategoryDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const categoryIdToUpdate = isCreateMode ? undefined : id;

  const {
    category: categoryData,
    isLoading,
    error: categoryDetailError,
  } = useCategoryDetail(categoryIdToUpdate);
  const {
    mutate: upsertCategory,
    isUpserting,
    error: upsertCategoryError,
  } = useUpsertCategory();

  const handleSave = useCallback(
    async (data: Partial<Category>) => {
      const result = await upsertCategory(data, categoryIdToUpdate);
      if (result) {
        showToast.success(
          categoryIdToUpdate
            ? "Category updated successfully"
            : "Category created successfully"
        );
        router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
      }
    },
    [categoryIdToUpdate, upsertCategory, router]
  );

  const handleCancel = useCallback(() => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
  }, [router]);

  useEffect(() => {
    const errorMessage = categoryDetailError || upsertCategoryError;
    if (!errorMessage) {
      return;
    }
    showToast.error(errorMessage);
    if (categoryDetailError) {
      router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
    }
  }, [categoryDetailError, upsertCategoryError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (isUpserting) {
    return <FormSkeleton />;
  }

  return (
    <CategoryForm
      category={categoryData}
      mode={formMode}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaving={isUpserting}
      isLoading={isLoading}
    />
  );
}
