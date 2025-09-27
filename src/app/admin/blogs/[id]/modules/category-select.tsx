"use client";

import React from "react";
import { BaseSelectField } from "@/components/ui/base";
import { BLOG_CONSTANTS } from "@/constants/blog";
import type { SelectOption } from "@/types/select.type";

/**
 * Category select component using base field
 */
export const CategorySelect = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}): React.JSX.Element => {
  const categoryOptions: SelectOption[] = [...BLOG_CONSTANTS.CATEGORY_OPTIONS];

  return (
    <BaseSelectField
      id="category"
      label="Danh mục"
      value={value}
      onChange={onChange}
      options={categoryOptions}
      placeholder="Chọn danh mục..."
      required
      error={error}
    />
  );
};
