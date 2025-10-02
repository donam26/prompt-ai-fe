"use client";

import type { Product, Section } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormActions } from "@/components/form-actions";
import { FormImageSection } from "@/components/form-image-section";
import { Form } from "@/components/ui/form";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import { ProductBasicFields } from "./product-basic-fields";
import {
  productSchema,
  type ProductFormData,
} from "@/libs/form-schemas/product-schema";

export interface Props {
  mode: FormMode;
  product?: Product | null;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
  className?: string;
  sections?: Section[];
  sectionsLoading?: boolean;
}

export const ProductForm = ({
  mode,
  product,
  isLoading = false,
  isSaving = false,
  onSave,
  onCancel,
  sections = [],
  sectionsLoading = false,
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const isCreateMode = mode === FormMode.CREATE;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      link: product?.link || "",
      sectionId: product?.section?.id?.toString() || "",
      image: product?.image || "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = form;

  const productImage = watch("image");

  // Wrapper function for setValue to match FormImageSection expected type
  const handleSetValue = (
    name: string,
    value: any,
    options?: { shouldDirty?: boolean }
  ) => {
    setValue(name as keyof ProductFormData, value, options);
  };

  const isDisabled = useMemo(() => {
    return isSaving || !isDirty || isUploading || sectionsLoading;
  }, [isSaving, isDirty, isUploading, sectionsLoading]);

  const onSubmit = useCallback(
    (data: ProductFormData) => {
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

  if (isLoading || sectionsLoading) {
    return (
      <AdminPageLayout
        title={isCreateMode ? "Create New Product" : "Edit Product"}
        description={
          isCreateMode ? "Add a new product to the system" : product?.name
        }
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
      title={isCreateMode ? "Create New Product" : "Edit Product"}
      description={
        isCreateMode ? "Add a new product to the system" : product?.name
      }
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isSaving}
          isDisabled={isDisabled}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={formButtonText}
          formId="product-form"
        />
      }
      showActionBottom
    >
      <Form {...form}>
        <form
          id="product-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <AdminContentCard>
            <FormImageSection
              name="image"
              title="Image"
              currentImage={productImage}
              setValue={handleSetValue}
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
            <ProductBasicFields
              control={control}
              isDisabled={isSaving}
              sections={sections}
            />
          </AdminContentCard>
        </form>
      </Form>
    </AdminPageLayout>
  );
};
