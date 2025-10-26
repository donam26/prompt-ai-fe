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
  shortDescription: z.string(),
  categoryId: z.string().min(1, "Category is required"),
  topicId: z.string().optional(),
  industryId: z.string().optional(),
  isType: z.string().or(z.number()),
  subType: z.number().min(1).max(2),
  what: z.string().optional(),
  tips: z.string().optional(),
  text: z.string().optional(),
  how: z.string().optional(),
  input: z.string().optional(),
  output: z.string().optional(),
  optimizationGuide: z.string().optional(),
  addTip: z.string().optional(),
  addInformation: z.string().optional(),
  image: z.string().optional(),
  imageCard: z.string().optional(),
  isComingSoon: z.boolean().optional(),
  industryIds: z.array(z.string()).optional(),
});

export type PromptFormValues = z.infer<typeof promptFormSchema>;

export const getPromptFormDefaultValues = (prompt?: any): PromptFormValues => {
  const industryIds =
    prompt?.promptIndustries?.map((i: any) => i.id.toString()) ||
    prompt?.industryIds ||
    [];

  return {
    title: prompt?.title || "",
    content: prompt?.content || "",
    shortDescription: prompt?.shortDescription || prompt?.description || "",
    categoryId:
      prompt?.categoryId?.toString() || prompt?.category?.id?.toString() || "",
    topicId: prompt?.topicId?.toString() || prompt?.topic?.id?.toString() || "",
    industryId:
      prompt?.industryId?.toString() || prompt?.industry?.id?.toString() || "",
    isType: prompt?.isType || "1",
    subType: prompt?.subType || 1,
    what: prompt?.what || "",
    tips: prompt?.tips || "",
    text: prompt?.text || "",
    how: prompt?.how || "",
    input: prompt?.input || "",
    output: prompt?.output || "",
    optimizationGuide: prompt?.optimizationGuide || "",
    addTip: prompt?.addTip || "",
    addInformation: prompt?.addInformation || "",
    image: prompt?.image || "",
    imageCard: prompt?.imageCard || "",
    isComingSoon: prompt?.isComingSoon || false,
    industryIds: industryIds,
  };
};
