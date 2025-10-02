import { z } from "zod";
import { BLOG_CATEGORY_CONSTANTS } from "@/constants/blog-category";

export const blogCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Tên blog category là bắt buộc")
    .min(
      BLOG_CATEGORY_CONSTANTS.VALIDATION.NAME_MIN_LENGTH,
      "Tên blog category phải có ít nhất 2 ký tự"
    )
    .max(
      BLOG_CATEGORY_CONSTANTS.VALIDATION.NAME_MAX_LENGTH,
      "Tên blog category không được quá 100 ký tự"
    ),
  description: z
    .string()
    .max(
      BLOG_CATEGORY_CONSTANTS.VALIDATION.DESCRIPTION_MAX_LENGTH,
      "Mô tả không được quá 500 ký tự"
    )
    .optional(),
});

export type BlogCategoryFormValues = z.infer<typeof blogCategoryFormSchema>;

export const getBlogCategoryFormDefaultValues = (
  blogCategory?: any
): BlogCategoryFormValues => ({
  name: blogCategory?.name || "",
  description: blogCategory?.description || "",
});
