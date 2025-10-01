"use client";

import React from "react";
import { BaseSelectField } from "@/components/ui/base";
import { BlogStatus, BLOG_STATUS_LABELS } from "@/types/enums";
import type { SelectOption } from "@/types/select.type";

/**
 * Status select component using base field
 */
export const StatusSelect = ({
  value,
  onChange,
  error,
  publishedAt,
  onPublishedAtChange,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  publishedAt?: string | null;
  onPublishedAtChange?: (publishedAt: string | null) => void;
}): React.JSX.Element => {
  // Only 2 status options based on publishedAt
  const statusOptions: SelectOption[] = [
    { id: BlogStatus.DRAFT, name: BLOG_STATUS_LABELS[BlogStatus.DRAFT] },
    {
      id: BlogStatus.PUBLISHED,
      name: BLOG_STATUS_LABELS[BlogStatus.PUBLISHED],
    },
  ];

  // Determine current status based on publishedAt
  const currentStatus = publishedAt ? BlogStatus.PUBLISHED : BlogStatus.DRAFT;

  // Ensure value is always a string
  const safeValue = typeof value === "string" ? value : currentStatus;

  // Ensure error is always a string
  const safeError =
    typeof error === "string" ? error : (error as any)?.message || "";

  const handleStatusChange = (newValue: string) => {
    if (newValue === BlogStatus.PUBLISHED) {
      // Set publishedAt to current date
      const now = new Date().toISOString();
      onPublishedAtChange?.(now);
    } else if (newValue === BlogStatus.DRAFT) {
      // Set publishedAt to null
      onPublishedAtChange?.(null);
    }

    onChange(newValue);
  };

  return (
    <BaseSelectField
      id="status"
      label="Trạng thái"
      value={safeValue}
      onChange={handleStatusChange}
      options={statusOptions}
      placeholder="Chọn trạng thái..."
      required
      error={safeError}
    />
  );
};
