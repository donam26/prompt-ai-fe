import { z } from "zod";
import { ROLE_CONSTANTS } from "@/constants/roles";

export const roleFormSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  name: z
    .string()
    .min(ROLE_CONSTANTS.VALIDATION.NAME_MIN_LENGTH, {
      message: `Tên vai trò phải có ít nhất ${ROLE_CONSTANTS.VALIDATION.NAME_MIN_LENGTH} ký tự`,
    })
    .max(ROLE_CONSTANTS.VALIDATION.NAME_MAX_LENGTH, {
      message: `Tên vai trò không được vượt quá ${ROLE_CONSTANTS.VALIDATION.NAME_MAX_LENGTH} ký tự`,
    })
    .trim(),
  description: z
    .string()
    .max(ROLE_CONSTANTS.VALIDATION.DESCRIPTION_MAX_LENGTH, {
      message: `Mô tả không được vượt quá ${ROLE_CONSTANTS.VALIDATION.DESCRIPTION_MAX_LENGTH} ký tự`,
    })
    .optional()
    .or(z.literal("")),
  permissions: z
    .array(z.string())
    .min(ROLE_CONSTANTS.VALIDATION.PERMISSIONS_MIN_COUNT, {
      message: `Vai trò phải có ít nhất ${ROLE_CONSTANTS.VALIDATION.PERMISSIONS_MIN_COUNT} quyền`,
    }),
});

export type RoleFormSchema = z.infer<typeof roleFormSchema>;

export const defaultRoleFormValues: RoleFormSchema = {
  name: "",
  description: "",
  permissions: [],
};
