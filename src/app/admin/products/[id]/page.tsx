"use client";

import type { Product } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useUpsertProduct } from "@/hooks/admin/useProduct";
import { useProductDetail } from "@/hooks/admin/useProduct/useProductDetail";
import { useSections } from "@/hooks/admin/useSection";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { PRODUCT_CONSTANTS } from "@/constants/product";
import { FormMode } from "@/constants/common";
import { ProductForm } from "./modules";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const productIdToUpdate = isCreateMode ? undefined : id;

  const {
    product: productData,
    isLoading,
    error: productDetailError,
  } = useProductDetail(productIdToUpdate);
  const {
    mutate: upsertProduct,
    isUpserting,
    error: upsertProductError,
  } = useUpsertProduct();

  // Fetch sections - only when product is selected
  const { sectionsWithPagination, isFetching: sectionsLoading } = useSections({
    pagination: {
      pageIndex: 0,
      pageSize: 100,
    },
  });

  const handleSave = useCallback(
    async (data: Partial<Product>) => {
      const result = await upsertProduct(data, productIdToUpdate);
      if (result) {
        showToast.success(
          productIdToUpdate
            ? "Product updated successfully"
            : "Product created successfully"
        );
        router.push(PRODUCT_CONSTANTS.ROUTES.PRODUCTS);
      }
    },
    [productIdToUpdate, upsertProduct, router]
  );

  const handleCancel = useCallback(() => {
    router.push(PRODUCT_CONSTANTS.ROUTES.PRODUCTS);
  }, [router]);

  useEffect(() => {
    const errorMessage = productDetailError || upsertProductError;
    if (!errorMessage) {
      return;
    }
    showToast.error(errorMessage);
    if (productDetailError) {
      router.push(PRODUCT_CONSTANTS.ROUTES.PRODUCTS);
    }
  }, [productDetailError, upsertProductError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (isUpserting) {
    return <FormSkeleton />;
  }

  // Extract sections data
  const sections = Array.isArray(sectionsWithPagination?.data)
    ? sectionsWithPagination.data
    : [];

  return (
    <ProductForm
      product={productData}
      mode={formMode}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaving={isUpserting}
      isLoading={isLoading}
      sections={sections}
      sectionsLoading={sectionsLoading}
    />
  );
}
