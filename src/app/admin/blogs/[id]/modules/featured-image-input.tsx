"use client";

import React from "react";
import { BaseImageField } from "@/components/ui/base";

/**
 * Featured image input component using base field
 */
export const FeaturedImageInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  return (
    <BaseImageField
      id="featuredImage"
      label="URL hình ảnh nổi bật"
      value={value || ""}
      onChange={onChange}
      placeholder="Nhập URL hình ảnh nổi bật"
      previewHeight="h-32"
    />
  );
};
