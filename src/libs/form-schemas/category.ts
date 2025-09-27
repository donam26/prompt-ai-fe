import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  section_id: z.string().min(1, "Section is required"),
  type: z.enum(["standard", "premium"]),
  is_comming_soon: z.boolean(),
  image: z.string().optional(),
  image_card: z.string().optional(),
  industry_ids: z.array(z.string()).optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const getCategoryFormDefaultValues = (
  category?: any
): CategoryFormValues => ({
  name: category?.name || "",
  description: category?.description || "",
  section_id: category?.section_id?.toString() || "",
  type: (category?.type as "standard" | "premium") || "standard",
  is_comming_soon: category?.is_comming_soon || false,
  image: category?.image || "",
  image_card: category?.image_card || "",
  industry_ids:
    category?.industries?.map((industry: any) => industry.id.toString()) || [],
});
