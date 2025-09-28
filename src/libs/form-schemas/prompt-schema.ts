import { z } from "zod";

export const promptFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
  short_description: z.string().optional(),
  category_id: z.string().min(1, "Category is required"),
  topic_id: z.string().optional(),
  industry_id: z.string().optional(),
  is_type: z.number().min(1).max(2),
  sub_type: z.number().min(1).max(2),
  what: z.string().optional(),
  tips: z.string().optional(),
  text: z.string().optional(),
  how: z.string().optional(),
  input: z.string().optional(),
  output: z.string().optional(),
  OptimationGuide: z.string().optional(),
  addtip: z.string().optional(),
  addinformation: z.string().optional(),
  image: z.string().optional(),
  image_card: z.string().optional(),
  is_coming_soon: z.boolean().optional(),
  industry_ids: z.array(z.string()).optional(),
});

export type PromptFormValues = z.infer<typeof promptFormSchema>;

export const getPromptFormDefaultValues = (prompt?: any): PromptFormValues => {
  return {
    title: prompt?.title || "",
    content: prompt?.content || "",
    short_description: prompt?.short_description || prompt?.description || "",
    category_id:
      prompt?.category_id?.toString() || prompt?.Category?.id?.toString() || "",
    topic_id:
      prompt?.topic_id?.toString() || prompt?.topic?.id?.toString() || "",
    industry_id:
      prompt?.industry_id?.toString() || prompt?.industry?.id?.toString() || "",
    is_type: prompt?.is_type || 1,
    sub_type: prompt?.sub_type || 1,
    what: prompt?.what || "",
    tips: prompt?.tips || "",
    text: prompt?.text || "",
    how: prompt?.how || "",
    input: prompt?.input || "",
    output: prompt?.output || "",
    OptimationGuide: prompt?.OptimationGuide || "",
    addtip: prompt?.addtip || "",
    addinformation: prompt?.addinformation || "",
    image: prompt?.image || "",
    image_card: prompt?.image_card || "",
    is_coming_soon: prompt?.is_coming_soon || false,
    industry_ids:
      prompt?.Category?.industries?.map((i: any) => i.id.toString()) ||
      prompt?.industry_ids ||
      [],
  };
};
