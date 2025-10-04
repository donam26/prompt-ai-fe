import { z } from "zod";
import { USERS_CONSTANTS } from "@/constants/users";

export const userFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Họ tên là bắt buộc")
    .min(
      USERS_CONSTANTS.VALIDATION.NAME_MIN_LENGTH,
      "Họ tên phải có ít nhất 2 ký tự"
    )
    .max(
      USERS_CONSTANTS.VALIDATION.NAME_MAX_LENGTH,
      "Họ tên không được quá 100 ký tự"
    ),
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .max(
      USERS_CONSTANTS.VALIDATION.EMAIL_MAX_LENGTH,
      "Email không được quá 255 ký tự"
    ),
  role: z.number().min(0, "Vai trò là bắt buộc"),
  accountStatus: z.number().min(0, "Trạng thái là bắt buộc").optional(),
  // Subscription fields
  subscriptionId: z.number().optional(),
  subscriptionStartDate: z.string().optional(),
  subscriptionEndDate: z.string().optional(),
  subscriptionTokens: z.number().min(0).optional(),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

export const getUserFormDefaultValues = (user?: any): UserFormSchema => ({
  fullName: user?.fullName || "",
  email: user?.email || "",
  role: user?.role ?? USERS_CONSTANTS.ROLE.USER,
  accountStatus: user?.accountStatus ?? USERS_CONSTANTS.STATUS.ACTIVE,
  // Subscription fields
  subscriptionId: user?.userSub?.subscriptionId
    ? Number(user.userSub.subscriptionId)
    : undefined,
  subscriptionStartDate: user?.userSub?.startDate
    ? user.userSub.startDate.split("T")[0]
    : "",
  subscriptionEndDate: user?.userSub?.endDate
    ? user.userSub.endDate.split("T")[0]
    : "",
  subscriptionTokens: user?.userSub?.token ?? 0,
});
