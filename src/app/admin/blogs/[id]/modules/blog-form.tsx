"use client";

import type { Blog } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseTextField, BaseTextareaField } from "@/components/ui/base";
import { QuillEditor } from "@/components/ui/quill-editor";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormImageSection } from "@/components/form-image-section";
import { FormActions } from "@/components/form-actions";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import { blogFormSchema, type BlogFormSchema } from "@/libs/form-schemas";
import { BlogStatus } from "@/types/enums";
import { Form } from "@/components/ui/form";

// Import components
import { StatusSelect } from "./status-select";
import { CategorySelect } from "./category-select";
import { TagsInput } from "./tags-input";

export interface BlogFormProps {
  readonly blog?: Blog | null;
  readonly mode: FormMode;
  readonly onSave: (data: Partial<Blog>) => void;
  readonly onCancel: () => void;
  readonly isSaving?: boolean;
  readonly isLoading?: boolean;
}

export const BlogForm = ({
  blog,
  mode,
  onSave,
  onCancel,
  isSaving = false,
  isLoading = false,
}: BlogFormProps): React.JSX.Element => {
  const [isUploading, setIsUploading] = useState(false);
  const isCreateMode = mode === FormMode.CREATE;

  // Calculate default values based on blog data
  const getDefaultValues = useCallback((): BlogFormSchema => {
    if (blog) {
      return {
        id: blog.id,
        title: blog.title || "",
        content: blog.content || "",
        excerpt: blog.metaDescription || "",
        status: blog.publishedAt ? BlogStatus.PUBLISHED : BlogStatus.DRAFT,
        category: blog.categoryId ? String(blog.categoryId) : "",
        tags: [],
        featuredImage: (blog.featuredImage as string) || "",
        authorId: "",
        publishedAt: blog.publishedAt || null,
      };
    }
    return {
      title: "",
      content: "",
      excerpt: "",
      status: BlogStatus.DRAFT,
      category: "",
      tags: [],
      featuredImage: "",
      authorId: "",
      publishedAt: null,
    };
  }, [blog]);

  const form = useForm<BlogFormSchema>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = form;

  // Update form when blog changes
  useEffect(() => {
    if (blog) {
      const defaultValues = getDefaultValues();
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof BlogFormSchema, value);
      });
    }
  }, [blog, setValue, getDefaultValues]);

  const formData = watch();
  const isDisabled = useMemo(() => {
    return isSaving || !isDirty || isUploading;
  }, [isSaving, isDirty, isUploading]);

  const onSubmit = useCallback(
    async (data: BlogFormSchema) => {
      let featuredImageUrl = data.featuredImage;
      featuredImageUrl = data.featuredImage as string;

      const blogData: Partial<Blog> = {
        title: data.title,
        content: data.content,
        metaDescription: data.excerpt,
        categoryId: parseInt(data.category),
        featuredImage: featuredImageUrl,
        publishedAt: data.publishedAt,
      };
      onSave(blogData);
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

  if (isLoading) {
    return (
      <AdminPageLayout
        title={isCreateMode ? "Tạo bài viết mới" : "Chỉnh sửa bài viết"}
        description={
          isCreateMode
            ? "Tạo bài viết mới với nội dung chất lượng"
            : blog?.title
        }
        showActionBottom
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
      title={isCreateMode ? "Tạo bài viết mới" : "Chỉnh sửa bài viết"}
      description={
        isCreateMode ? "Tạo bài viết mới với nội dung chất lượng" : blog?.title
      }
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isSaving}
          isDisabled={isDisabled}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={formButtonText}
          formId="blog-form"
        />
      }
      showActionBottom
    >
      <Form {...form}>
        {" "}
        <form
          id="blog-form"
          onSubmit={e => {
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-6"
        >
          {/* Featured Image Section */}
          <AdminContentCard>
            <Controller
              name="featuredImage"
              control={control}
              render={({ field }) => (
                <FormImageSection
                  name="featuredImage"
                  title="Hình ảnh nổi bật"
                  currentImage={field.value || ""}
                  setValue={(
                    name: string,
                    value: any,
                    options?: { shouldDirty?: boolean }
                  ) => setValue(name as keyof BlogFormSchema, value, options)}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                  isDisabled={isSaving}
                  uploadSuccessMessage="Hình ảnh đã được tải lên thành công"
                  uploadErrorMessage="Có lỗi xảy ra khi tải lên hình ảnh"
                />
              )}
            />
          </AdminContentCard>

          {/* Basic Information */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Thông tin cơ bản
                <span className="text-red-500">*</span>
              </h3>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    id="title"
                    label="Tiêu đề bài viết"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nhập tiêu đề bài viết"
                    required
                    error={errors.title?.message}
                  />
                )}
              />

              {/* Excerpt */}
              <Controller
                name="excerpt"
                control={control}
                render={({ field }) => (
                  <BaseTextareaField
                    id="excerpt"
                    label="Tóm tắt / Mô tả SEO"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nhập tóm tắt bài viết (sẽ được sử dụng làm meta description)"
                    rows={3}
                    required
                    error={errors.excerpt?.message}
                  />
                )}
              />

              {/* Status and Category Row */}
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <StatusSelect
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.status?.message}
                      publishedAt={formData.publishedAt}
                      onPublishedAtChange={publishedAt =>
                        setValue("publishedAt", publishedAt)
                      }
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CategorySelect
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.category?.message}
                    />
                  )}
                />
              </div>

              {/* Tags */}
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    value={Array.isArray(field.value) ? field.value : []}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </AdminContentCard>

          {/* Content Section */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Nội dung bài viết
                <span className="text-red-500">*</span>
              </h3>
            </div>

            <div className="space-y-2">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nhập nội dung bài viết..."
                    minHeight={400}
                    showPreview={true}
                    className="bg-white"
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>
          </AdminContentCard>
        </form>
      </Form>
    </AdminPageLayout>
  );
};
