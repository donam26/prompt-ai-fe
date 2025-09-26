"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { blogService } from "@/services/admin/blogs/blogService";
import { useAdminBlogQuery } from "./useAdminBlogQuery";
// import type { Blog } from "@/lib/types";
import type { BlogFormData } from "@/types/admin/blog";
import { BLOG_CONSTANTS } from "@/constants/blog";

/**
 * Form state interface for blog editing
 */
export interface BlogFormState {
  readonly data: BlogFormData;
  readonly errors: Partial<Record<keyof BlogFormData, string>>;
  readonly isDirty: boolean;
  readonly isSubmitting: boolean;
}

/**
 * Initial form data
 */
const INITIAL_FORM_DATA: BlogFormData = {
  title: "",
  content: "",
  excerpt: "",
  status: "draft",
  category: "",
  tags: [],
  featuredImage: "",
  authorId: "",
};

/**
 * Hook for managing blog form state and operations
 *
 * @param blogId - The blog ID for editing (undefined for create)
 * @returns Form state and handlers
 */
export function useBlogForm(blogId?: string | number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState<BlogFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BlogFormData, string>>
  >({});
  const [isDirty, setIsDirty] = useState(false);
  const [originalData, setOriginalData] =
    useState<BlogFormData>(INITIAL_FORM_DATA);

  // Data fetching for edit mode
  const { data: blog, isLoading, error } = useAdminBlogQuery(blogId || "");

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: BlogFormData) => blogService.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      router.push(BLOG_CONSTANTS.ROUTES.BLOGS);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: BlogFormData }) =>
      blogService.updateBlog({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blog", blogId] });
      setIsDirty(false);
    },
  });

  // const deleteMutation = useMutation({
  //   mutationFn: (id: string | number) => blogService.deleteBlog(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
  //     router.push("/admin/blogs");
  //   },
  // });

  // Initialize form data when blog is loaded
  useEffect(() => {
    if (blog && blogId) {
      const blogFormData: BlogFormData = {
        title: blog.title || "",
        content: blog.content || "",
        excerpt: blog.meta_description || "",
        status: blog.published_at ? "published" : "draft",
        category: blog.category?.name || blog.blog_category?.name || "",
        tags: [], // TODO: Add tags support
        featuredImage: blog.featured_image || "",
        authorId: "", // TODO: Add author support
      };
      setFormData(blogFormData);
      setOriginalData(blogFormData);
      setIsDirty(false);
    }
  }, [blog, blogId]);

  // Form validation
  const validateForm = useCallback(
    (data: BlogFormData): Partial<Record<keyof BlogFormData, string>> => {
      const newErrors: Partial<Record<keyof BlogFormData, string>> = {};

      if (!data.title.trim()) {
        newErrors.title = "Tiêu đề là bắt buộc";
      }

      if (!data.content.trim()) {
        newErrors.content = "Nội dung là bắt buộc";
      }

      if (!data.excerpt.trim()) {
        newErrors.excerpt = "Tóm tắt là bắt buộc";
      }

      if (!data.category.trim()) {
        newErrors.category = "Danh mục là bắt buộc";
      }

      return newErrors;
    },
    []
  );

  // Form handlers
  const handleFieldChange = useCallback(
    (field: keyof BlogFormData, value: string | string[]) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
      setIsDirty(true);

      // Clear error for this field
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined,
        }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        if (blogId) {
          await updateMutation.mutateAsync({ id: blogId, data: formData });
        } else {
          await createMutation.mutateAsync(formData);
        }
      } catch {
        // Error saving blog - could be logged to monitoring service
      }
    },
    [formData, validateForm, blogId, updateMutation, createMutation]
  );

  // const handleDelete = useCallback(async () => {
  //   if (!blogId || !confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
  //     return;
  //   }

  //   try {
  //     await deleteMutation.mutateAsync(blogId);
  //   } catch {
  //     // Error deleting blog - could be logged to monitoring service
  //   }
  // }, [blogId, deleteMutation]);

  // const handleCancel = useCallback(() => {
  //   if (
  //     isDirty &&
  //     !confirm("Bạn có chắc chắn muốn hủy? Các thay đổi sẽ bị mất.")
  //   ) {
  //     return;
  //   }
  //   router.push("/admin/blogs");
  // }, [isDirty, router]);

  const handleReset = useCallback(() => {
    setFormData(originalData);
    setErrors({});
    setIsDirty(false);
  }, [originalData]);

  return {
    // State
    formData,
    errors,
    isDirty,
    isLoading,
    error,

    // Handlers
    handleFieldChange,
    handleSubmit,
    handleReset,
  };
}
