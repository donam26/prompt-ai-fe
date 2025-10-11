import { z } from "zod";
import { CONTACTS_CONSTANTS } from "@/constants/contacts";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Họ tên là bắt buộc")
    .min(
      CONTACTS_CONSTANTS.VALIDATION.NAME_MIN_LENGTH,
      "Họ tên phải có ít nhất 2 ký tự"
    )
    .max(
      CONTACTS_CONSTANTS.VALIDATION.NAME_MAX_LENGTH,
      "Họ tên không được quá 100 ký tự"
    ),
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .max(
      CONTACTS_CONSTANTS.VALIDATION.EMAIL_MAX_LENGTH,
      "Email không được quá 255 ký tự"
    ),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      val =>
        !val || val.length <= CONTACTS_CONSTANTS.VALIDATION.PHONE_MAX_LENGTH,
      "Số điện thoại không được quá 20 ký tự"
    ),
  message: z
    .string()
    .min(1, "Nội dung tin nhắn là bắt buộc")
    .min(
      CONTACTS_CONSTANTS.VALIDATION.MESSAGE_MIN_LENGTH,
      "Nội dung tin nhắn phải có ít nhất 10 ký tự"
    )
    .max(
      CONTACTS_CONSTANTS.VALIDATION.MESSAGE_MAX_LENGTH,
      "Nội dung tin nhắn không được quá 1000 ký tự"
    ),
  type: z.literal(CONTACTS_CONSTANTS.TYPE.SUPPORT),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const getContactFormDefaultValues = (): ContactFormSchema => ({
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
  type: CONTACTS_CONSTANTS.TYPE.SUPPORT,
});
