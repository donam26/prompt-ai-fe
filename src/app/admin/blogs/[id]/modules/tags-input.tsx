"use client";

import React from "react";
import { BaseTagsField } from "@/components/ui/base";

/**
 * Tags input component using base field
 */
export const TagsInput = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
}): React.JSX.Element => {
  return (
    <BaseTagsField
      id="tags"
      label="Thẻ (phân cách bằng dấu phẩy)"
      value={value}
      onChange={onChange}
      placeholder="Ví dụ: AI, Công nghệ, Kinh doanh"
      separator=","
    />
  );
};
