"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { Button } from "@/components/ui/button";
import { useAdminCategoriesQuery } from "@/hooks";
import { CategoryDetail } from "./modules";
import { CATEGORY_CONSTANTS } from "@/constants/category";
import type { Category } from "@/lib/types";

export default function CategoryDetailPage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch category data
  const { categories, isLoading: categoriesLoading } = useAdminCategoriesQuery({
    page: 1,
    pageSize: 1000, // Get all categories to find the specific one
  });

  useEffect(() => {
    if (!categoriesLoading && categories) {
      const foundCategory = categories.find(
        cat => cat.id.toString() === categoryId
      );
      setCategory(foundCategory || null);
      setIsLoading(false);
    }
  }, [categories, categoriesLoading, categoryId]);

  const handleEdit = () => {
    router.push(`/admin/category/${categoryId}`);
  };

  const handleDelete = async () => {
    if (!category) return;

    setIsDeleting(true);
    try {
      // TODO: Implement delete mutation
      console.log("Deleting category:", category.id);
      // await deleteCategoryMutation.mutate(category.id);
      router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBack = () => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_LIST);
  };

  if (!category && !isLoading) {
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

  if (!category) {
    return (
      <AdminContentCard>
        <CategoryDetail
          category={{} as Category}
          isLoading={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBack={handleBack}
        />
      </AdminContentCard>
    );
  }

  return (
    <AdminContentCard>
      <CategoryDetail
        category={category}
        isLoading={isLoading}
        isDeleting={isDeleting}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={handleBack}
      />
    </AdminContentCard>
  );
}
