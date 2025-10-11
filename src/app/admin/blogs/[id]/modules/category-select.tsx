"use client";

import React from "react";
import { BaseSelectField } from "@/components/ui/base";
import { useBlogCategories } from "@/hooks/admin/useBlog/useBlogCategories";
import type { SelectOption } from "@/types/select.type";

export const CategorySelect = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}): React.JSX.Element => {
  const {
    data: categoriesData,
    isLoading,
    error: fetchError,
  } = useBlogCategories();

  const safeValue = typeof value === "string" ? value : "";

  // Ensure error is always a string
  const safeError =
    typeof error === "string" ? error : (error as any)?.message || "";
  const id = crypto.randomUUID();
  // Transform API data to SelectOption format
  const categoryOptions: SelectOption[] =
    (categoriesData as any)?.data?.map((category: any) => ({
      id: category.id.toString(),
      name: category.name,
    })) || [];

  const placeholder = isLoading
    ? "Đang tải danh mục..."
    : fetchError
      ? "Lỗi tải danh mục"
      : "Chọn danh mục...";

  return (
    <BaseSelectField
      id={id}
      label="Danh mục"
      value={safeValue}
      onChange={onChange}
      options={categoryOptions}
      placeholder={placeholder}
      required
      error={safeError}
      disabled={isLoading || !!fetchError}
    />
  );
};
