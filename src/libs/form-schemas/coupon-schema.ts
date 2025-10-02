import { z } from "zod";
import { COUPON_CONSTANTS } from "@/constants/coupon";

export const couponSchema = z.object({
  code: z
    .string()
    .min(1, "Mã giảm giá là bắt buộc")
    .min(
      COUPON_CONSTANTS.VALIDATION.CODE_MIN_LENGTH,
      `Mã giảm giá phải có ít nhất ${COUPON_CONSTANTS.VALIDATION.CODE_MIN_LENGTH} ký tự`
    )
    .max(
      COUPON_CONSTANTS.VALIDATION.CODE_MAX_LENGTH,
      `Mã giảm giá không được vượt quá ${COUPON_CONSTANTS.VALIDATION.CODE_MAX_LENGTH} ký tự`
    )
    .regex(
      /^[A-Z0-9_-]+$/,
      "Mã giảm giá chỉ được chứa chữ hoa, số, gạch ngang và gạch dưới"
    ),
  discount: z
    .string()
    .min(1, "Giá trị giảm giá là bắt buộc")
    .regex(/^\d+(\.\d{1,2})?$/, "Giá trị giảm giá phải là số hợp lệ"),
  type: z
    .string()
    .min(1, "Loại mã giảm giá là bắt buộc")
    .refine(
      val => Object.values(COUPON_CONSTANTS.TYPES).includes(val as any),
      "Loại mã giảm giá không hợp lệ"
    ),
  expiryDate: z.string().min(1, "Ngày hết hạn là bắt buộc"),
  isActive: z.boolean(),
  maxUsage: z
    .number()
    .min(1, "Số lượt sử dụng tối đa phải lớn hơn 0")
    .max(1000000, "Số lượt sử dụng tối đa không được vượt quá 1,000,000"),
});

export type CouponFormData = z.infer<typeof couponSchema>;

export const getCouponFormDefaultValues = (coupon?: any): CouponFormData => ({
  code: coupon?.code || "",
  discount: coupon?.discount || "",
  type: coupon?.type || COUPON_CONSTANTS.TYPES.PERCENT,
  expiryDate: coupon?.expiryDate
    ? new Date(coupon.expiryDate).toISOString().split("T")[0]
    : "",
  isActive: coupon?.isActive ?? true,
  maxUsage: coupon?.maxUsage || 1,
});
