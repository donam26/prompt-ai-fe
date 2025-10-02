import { z } from "zod";
import { TOPICS_CONSTANTS } from "@/constants/topics";

export const topicFormSchema = z.object({
  name: z
    .string()
    .min(1, "Tên topic là bắt buộc")
    .min(2, TOPICS_CONSTANTS.VALIDATION.NAME_MIN_LENGTH)
    .max(100, TOPICS_CONSTANTS.VALIDATION.NAME_MAX_LENGTH),
});

export type TopicFormValues = z.infer<typeof topicFormSchema>;

export const getTopicFormDefaultValues = (topic?: any): TopicFormValues => ({
  name: topic?.name || "",
});
