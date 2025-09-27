import { z } from "zod";

export const blogFormSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z
    .string()
    .min(1, "Tiêu đề là bắt buộc")
    .min(3, "Tiêu đề phải có ít nhất 3 ký tự")
    .max(200, "Tiêu đề không được vượt quá 200 ký tự"),
  content: z
    .string()
    .min(1, "Nội dung là bắt buộc")
    .min(10, "Nội dung phải có ít nhất 10 ký tự"),
  excerpt: z
    .string()
    .min(1, "Tóm tắt là bắt buộc")
    .min(10, "Tóm tắt phải có ít nhất 10 ký tự")
    .max(500, "Tóm tắt không được vượt quá 500 ký tự"),
  status: z.enum(["draft", "published", "archived"]),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  tags: z.array(z.string()).default([]).optional(),
  featuredImage: z.string().optional(),
  authorId: z.string().min(1, "Tác giả là bắt buộc"),
});

export type BlogFormSchema = z.infer<typeof blogFormSchema>;
