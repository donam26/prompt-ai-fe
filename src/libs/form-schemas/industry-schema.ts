import { z } from "zod";

export const industrySchema = z.object({
  name: z
    .string()
    .min(1, "Tên ngành nghề là bắt buộc")
    .min(2, "Tên ngành nghề phải có ít nhất 2 ký tự")
    .max(100, "Tên ngành nghề không được vượt quá 100 ký tự"),
  description: z
    .string()
    .min(1, "Mô tả là bắt buộc")
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(500, "Mô tả không được vượt quá 500 ký tự"),
  status: z
    .string()
    .min(1, "Trạng thái là bắt buộc")
    .refine(val => ["active", "inactive"].includes(val), {
      message: "Trạng thái phải là 'active' hoặc 'inactive'",
    }),
});

export type IndustryFormData = z.infer<typeof industrySchema>;
