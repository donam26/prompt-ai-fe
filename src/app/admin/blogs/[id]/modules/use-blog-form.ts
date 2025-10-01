"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBlogDetail, useUpsertBlog } from "@/hooks/admin/useBlog";
import { blogFormSchema, type BlogFormSchema } from "@/libs/form-schemas";

interface UseBlogFormReturn {
  formData: BlogFormSchema;
  errors: any;
  isLoading: boolean;
  error: string | null;
  handleFieldChange: (
    field: keyof BlogFormSchema,
    value: string | string[]
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleReset: () => void;
  register: any;
  setValue: any;
  watch: any;
  formState: any;
}

const initialFormData: BlogFormSchema = {
  title: "",
  content: "",
  excerpt: "",
  status: "draft",
  category: "",
  tags: [],
  featuredImage: "",
  authorId: "",
};

export const useBlogForm = (blogId?: string): UseBlogFormReturn => {
  const router = useRouter();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormSchema>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: initialFormData,
  });

  const formData = watch();

  // Fetch blog detail if editing
  const {
    blog,
    isLoading: isDetailLoading,
    error: detailError,
  } = useBlogDetail(blogId);
  const {
    mutate: upsertBlog,
    isUpserting,
    error: upsertError,
  } = useUpsertBlog();

  const isLoading = isDetailLoading || isUpserting || isSubmitting;
  const error = detailError || upsertError || null;

  // Update form data when blog is loaded
  useEffect(() => {
    if (blog) {
      const blogFormData: BlogFormSchema = {
        id: blog.id,
        title: blog.title || "",
        content: blog.content || "",
        excerpt: blog.meta_description || "",
        status: "published", // Default status since Blog type doesn't have status
        category:
          typeof blog.category === "string"
            ? blog.category
            : blog.category?.name || "",
        tags: [], // Blog type doesn't have tags
        featuredImage: blog.featuredImage || "",
        authorId: "", // Blog type doesn't have authorId
      };
      reset(blogFormData);
    } else if (!blogId) {
      // New blog - reset to initial state
      reset(initialFormData);
    }
  }, [blog, blogId, reset]);

  const handleFieldChange = useCallback(
    (field: keyof BlogFormSchema, value: string | string[]) => {
      setValue(field, value as any, { shouldValidate: true });
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    async (data: BlogFormSchema) => {
      // Transform form data to match CreateBlogRequest
      const createBlogRequest = {
        title: data.title,
        content: data.content,
        description: data.excerpt,
        blogCategoryId: data.category,
        image: undefined, // Handle file upload separately if needed
      };

      const success = await upsertBlog(createBlogRequest, blogId);

      if (success) {
        router.push("/admin/blogs");
      }
    },
    [blogId, upsertBlog, router]
  );

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return {
    formData,
    errors,
    isLoading,
    error,
    handleFieldChange,
    handleSubmit: rhfHandleSubmit(handleSubmit),
    handleReset,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  };
};
