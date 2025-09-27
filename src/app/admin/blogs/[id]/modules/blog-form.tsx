"use client";

import React from "react";
import { BaseTextField, BaseTextareaField } from "@/components/ui/base";
import { BlogFormSkeleton } from "@/components/ui/skeleton";
import { FORM_CONSTANTS } from "@/constants";
import type { BlogFormSchema } from "@/libs/form-schemas";

// Import components
import { StatusSelect } from "./status-select";
import { CategorySelect } from "./category-select";
import { TagsInput } from "./tags-input";
import { FeaturedImageInput } from "./featured-image-input";

export interface BlogFormProps {
  readonly formData: BlogFormSchema;
  readonly errors: any;
  readonly isLoading?: boolean;
  readonly onFieldChange: (
    field: keyof BlogFormSchema,
    value: string | string[]
  ) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

export const BlogForm = ({
  formData,
  errors,
  isLoading = false,
  onFieldChange,
  onSubmit,
}: BlogFormProps): React.JSX.Element => {
  const handleFieldChange = (
    field: keyof BlogFormSchema,
    value: string | string[]
  ) => {
    onFieldChange(field, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Show skeleton when loading
  if (isLoading) {
    return (
      <div className={FORM_CONSTANTS.SPACING}>
        <BlogFormSkeleton />
      </div>
    );
  }

  return (
    <form
      id="blog-form"
      onSubmit={handleSubmit}
      className={FORM_CONSTANTS.SPACING}
    >
      {/* Form Fields - Row-based layout */}
      <div className="space-y-6">
        {/* Title */}
        <BaseTextField
          id="title"
          label="Tiêu đề bài viết"
          value={formData.title}
          onChange={value => handleFieldChange("title", value)}
          placeholder="Nhập tiêu đề bài viết"
          required
          error={errors.title}
        />

        {/* Excerpt */}
        <BaseTextareaField
          id="excerpt"
          label="Tóm tắt / Mô tả SEO"
          value={formData.excerpt}
          onChange={value => handleFieldChange("excerpt", value)}
          placeholder="Nhập tóm tắt bài viết (sẽ được sử dụng làm meta description)"
          rows={3}
          required
          error={errors.excerpt}
        />

        {/* Status and Category Row */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <StatusSelect
            value={formData.status}
            onChange={value => handleFieldChange("status", value)}
            error={errors.status}
          />
          <CategorySelect
            value={formData.category}
            onChange={value => handleFieldChange("category", value)}
            error={errors.category}
          />
        </div>

        {/* Featured Image */}
        <FeaturedImageInput
          value={formData.featuredImage || ""}
          onChange={value => handleFieldChange("featuredImage", value)}
        />

        {/* Tags */}
        <TagsInput
          value={Array.isArray(formData.tags) ? formData.tags : []}
          onChange={tags => handleFieldChange("tags", tags)}
        />

        {/* Content */}
        <BaseTextareaField
          id="content"
          label="Nội dung bài viết"
          value={formData.content}
          onChange={value => handleFieldChange("content", value)}
          placeholder="Nhập nội dung bài viết (HTML được hỗ trợ)"
          rows={12}
          required
          error={errors.content}
        />
      </div>
    </form>
  );
};
