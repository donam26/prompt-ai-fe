import { z } from "zod";
import { SECTIONS_CONSTANTS } from "@/constants/sections";

export const sectionFormSchema = z.object({
  name: z
    .string()
    .min(1, "Tên section là bắt buộc")
    .min(
      SECTIONS_CONSTANTS.VALIDATION.NAME_MIN_LENGTH,
      "Tên section phải có ít nhất 2 ký tự"
    )
    .max(
      SECTIONS_CONSTANTS.VALIDATION.NAME_MAX_LENGTH,
      "Tên section không được quá 100 ký tự"
    ),
  description: z
    .string()
    .max(
      SECTIONS_CONSTANTS.VALIDATION.DESCRIPTION_MAX_LENGTH,
      "Mô tả không được quá 500 ký tự"
    )
    .optional(),
  status: z.string().min(1, "Trạng thái là bắt buộc"),
});

export type SectionFormValues = z.infer<typeof sectionFormSchema>;

export const getSectionFormDefaultValues = (
  section?: any
): SectionFormValues => ({
  name: section?.name || "",
  description: section?.description || "",
  status: section?.status || SECTIONS_CONSTANTS.STATUS.ACTIVE,
});
