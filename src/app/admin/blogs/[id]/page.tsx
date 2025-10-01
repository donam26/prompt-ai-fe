"use client";

import type { Blog } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useBlogDetail, useUpsertBlog } from "@/hooks/admin/useBlog";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { BLOG_CONSTANTS } from "@/constants/blog";
import { FormMode } from "@/constants/common";
import { BlogForm } from "./modules/blog-form";

export default function BlogEditPage(): React.JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const blogIdToUpdate = isCreateMode ? undefined : id;

  const {
    blog: blogData,
    isLoading,
    error: blogDetailError,
  } = useBlogDetail(blogIdToUpdate);
  const {
    mutate: upsertBlog,
    isUpserting,
    error: upsertBlogError,
  } = useUpsertBlog();

  const handleSave = useCallback(
    async (data: Partial<Blog>) => {
      const result = await upsertBlog(
        {
          ...data,
          title: data.title || "",
          content: data.content || "",
          metaDescription: data.metaDescription || "",
          featuredImage: data.featuredImage || undefined,
          publishedAt: data.publishedAt || null,
        },
        blogIdToUpdate
      );

      if (result) {
        showToast.success(
          blogIdToUpdate
            ? "Bài viết đã được cập nhật thành công"
            : "Bài viết đã được tạo thành công"
        );
        router.push(BLOG_CONSTANTS.ROUTES.BLOGS);
      }
    },
    [blogIdToUpdate, upsertBlog, router]
  );

  const handleCancel = useCallback(() => {
    router.push(BLOG_CONSTANTS.ROUTES.BLOGS);
  }, [router]);

  useEffect(() => {
    const errorMessage = blogDetailError || upsertBlogError;
    if (!errorMessage) {
      return;
    }
    showToast.error(errorMessage);
    if (blogDetailError) {
      router.push(BLOG_CONSTANTS.ROUTES.BLOGS);
    }
  }, [blogDetailError, upsertBlogError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <BlogForm
      blog={blogData}
      mode={formMode}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaving={isUpserting}
      isLoading={isLoading}
    />
  );
}
