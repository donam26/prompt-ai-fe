"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAdminCategoriesQuery } from "@/hooks";
import { CategoryForm, type CategoryFormData } from "../[id]/modules";
import { CATEGORY_CONSTANTS } from "@/constants/category";
import type { Category } from "@/lib/types";

export default function CategoryFormPage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string[];

  // Determine if this is create or edit mode
  const isCreate = slug && slug.length > 0 && slug[0] === "create";
  const isEdit = slug && slug.length > 0 && slug[0] !== "create";
  const categoryId = isEdit ? slug[0] : null;

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch category data for edit mode
  const { categories, isLoading: categoriesLoading } = useAdminCategoriesQuery({
    page: 1,
    pageSize: 1000,
  });

  useEffect(() => {
    if (isEdit && !categoriesLoading && categories && categoryId) {
      const foundCategory = categories.find(
        cat => cat.id.toString() === categoryId
      );
      if (foundCategory) {
        setCategory(foundCategory);
      }
      setIsLoading(false);
    } else if (isCreate || (!isEdit && !isCreate)) {
      setIsLoading(false);
    }
  }, [categories, categoriesLoading, categoryId, isEdit, isCreate]);

  const handleSave = async (formData: CategoryFormData) => {
    setIsSaving(true);
    try {
      if (isEdit && category && categoryId) {
        // TODO: Implement update mutation
        console.log("Updating category:", category.id, formData);
        // await updateCategoryMutation.mutate({ id: category.id, ...formData });
        router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_DETAIL(categoryId));
      } else {
        // TODO: Implement create mutation
        console.log("Creating category:", formData);
        // await createCategoryMutation.mutate(formData);
        router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
      }
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isEdit && categoryId) {
      router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_DETAIL(categoryId));
    } else {
      router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
    }
  };

  const handleBack = () => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
  };

  if (isEdit && !category && !isLoading) {
    return (
      <AdminContentCard>
        <div className="py-12 text-center">
          <h2 className="mb-2 font-semibold text-gray-900 text-2xl">
            Category not found
          </h2>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Categories
          </Button>
        </div>
      </AdminContentCard>
    );
  }

  return (
    <AdminContentCard>
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <Separator />

        {/* Form Component */}
        <CategoryForm
          mode={isEdit ? "edit" : "create"}
          category={category}
          isLoading={isLoading}
          isSaving={isSaving}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </AdminContentCard>
  );
}
