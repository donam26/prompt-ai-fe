import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Tên sản phẩm là bắt buộc")
    .min(2, "Tên sản phẩm phải có ít nhất 2 ký tự")
    .max(100, "Tên sản phẩm không được vượt quá 100 ký tự"),
  link: z.string().min(1, "Link là bắt buộc").url("Link phải là URL hợp lệ"),
  sectionId: z.string().min(1, "Section là bắt buộc"),
  image: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;
