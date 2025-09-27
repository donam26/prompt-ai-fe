"use client";

import React from "react";
import { BaseSelectField } from "@/components/ui/base";
import { BLOG_CONSTANTS } from "@/constants/blog";
import type { SelectOption } from "@/types/select.type";

/**
 * Status select component using base field
 */
export const StatusSelect = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}): React.JSX.Element => {
  const statusOptions: SelectOption[] = [...BLOG_CONSTANTS.STATUS_OPTIONS];

  return (
    <BaseSelectField
      id="status"
      label="Trạng thái"
      value={value}
      onChange={onChange}
      options={statusOptions}
      placeholder="Chọn trạng thái..."
      required
      error={error}
    />
  );
};
