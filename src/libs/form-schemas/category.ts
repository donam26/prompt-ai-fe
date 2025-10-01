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
  sectionId: z.string().min(1, "Section is required"),
  type: z.enum(["standard", "premium"]),
  isComingSoon: z.boolean(),
  image: z.string().optional(),
  imageCard: z.string().optional(),
  industryIds: z.array(z.string()).optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const getCategoryFormDefaultValues = (
  category?: any
): CategoryFormValues => ({
  name: category?.name || "",
  description: category?.description || "",
  sectionId: category?.sectionId?.toString() || "",
  type: (category?.type as "standard" | "premium") || "standard",
  isComingSoon: category?.isComingSoon || false,
  image: category?.image || "",
  imageCard: category?.imageCard || "",
  industryIds:
    category?.industries?.map((industry: any) => industry.id.toString()) || [],
});
