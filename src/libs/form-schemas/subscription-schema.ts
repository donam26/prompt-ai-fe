import { z } from "zod";
import { SUBSCRIPTIONS_CONSTANTS } from "@/constants/subscriptions";
import { BillingCycle } from "@/types/enums";

const contentSubscriptionSchema = z.object({
  id: z.number().optional(),
  content: z.string().min(1, "Nội dung là bắt buộc"),
  included: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const subscriptionFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Tên gói là bắt buộc")
      .min(
        SUBSCRIPTIONS_CONSTANTS.VALIDATION.NAME_MIN_LENGTH,
        "Tên gói phải có ít nhất 2 ký tự"
      )
      .max(
        SUBSCRIPTIONS_CONSTANTS.VALIDATION.NAME_MAX_LENGTH,
        "Tên gói không được quá 100 ký tự"
      ),
    type: z.number().min(1, "Loại gói phải lớn hơn 0"),
    duration: z
      .number()
      .min(
        SUBSCRIPTIONS_CONSTANTS.VALIDATION.DURATION_MIN,
        "Số token phải lớn hơn 0"
      ),
    billingCycle: z.nativeEnum(BillingCycle),
    price: z.string().min(1, "Giá tiền là bắt buộc"),
    priceYear: z.string().optional(),
    isPopular: z.boolean().optional(),
    isActive: z.boolean(),
    displayOrder: z
      .number()
      .min(
        SUBSCRIPTIONS_CONSTANTS.VALIDATION.DISPLAY_ORDER_MIN,
        "Thứ tự hiển thị không được âm"
      ),
    description: z.string().optional(),
    descriptionPerYear: z.string().optional(),
    pricePerMonthYear: z.string().optional(),
    priceTotalYearly: z.string().optional(),
    imageDiscount: z.string().optional(),
    contentSubscriptions: z.array(contentSubscriptionSchema).optional(),
  })
  .refine(
    () => {
      // Additional validation if needed
      return true;
    },
    {
      message: "Dữ liệu không hợp lệ",
    }
  );

export type SubscriptionFormSchema = z.infer<typeof subscriptionFormSchema>;

export const getSubscriptionFormDefaultValues = (
  subscription?: any
): SubscriptionFormSchema => ({
  name: subscription?.name || "",
  type: subscription?.type || 1,
  duration: subscription?.duration || 10000,
  billingCycle: subscription?.billingCycle || BillingCycle.YEARLY,
  price: subscription?.price || "0",
  priceYear: subscription?.priceYear || "",
  isPopular: subscription?.isPopular || false,
  isActive: subscription?.isActive ?? true,
  displayOrder: subscription?.displayOrder ?? 0,
  description: subscription?.description || "",
  descriptionPerYear: subscription?.descriptionPerYear || "",
  pricePerMonthYear: subscription?.pricePerMonthYear || "",
  priceTotalYearly: subscription?.priceTotalYearly || "",
  imageDiscount: subscription?.imageDiscount || "",
  contentSubscriptions: subscription?.contentSubscriptions || [],
});
