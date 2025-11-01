"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PaymentMethod } from "@/types/enums/payment-method";
import { useUser } from "@/hooks/useUser";

interface PricingCardV2Props {
  readonly plan: {
    id: string;
    name: string;
    price: number;
    description?: string;
    isPopular?: boolean;
    badge?: string;
    buttonText?: string;
    buttonVariant?: "default" | "outline";
    ctaText?: string;
    contentSubscriptions?: Array<{
      content: string;
      included: boolean;
    }>;
  };
  readonly isYearly: boolean;
  readonly onSelectPlan: (planId: string, paymentMethod: PaymentMethod) => void;
  readonly paymentMethod: PaymentMethod;
  readonly className?: string;
}

export const PricingCardV2 = ({
  plan,
  isYearly,
  onSelectPlan,
  paymentMethod,
  className,
}: PricingCardV2Props) => {
  const { user } = useUser();
  const currentPrice = isYearly ? Number(plan.price) : Number(plan.price);

  const formatPrice = (price: number): string => {
    if (price === 0) return "0đ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSelectPlan = () => {
    onSelectPlan(plan.id as string, paymentMethod);
  };

  // Get current user's subscription plan ID
  const currentUserPlanId = user?.userSub?.subscription?.id
    ? Number(user.userSub?.subscription?.id)
    : 0;

  // Get plan ID from current card
  const currentPlanId = Number(plan.id);

  // Determine button state based on plan comparison
  const isCurrentPlan = currentUserPlanId === currentPlanId;
  const hasHigherOrEqualPlan =
    currentUserPlanId >= currentPlanId && !isCurrentPlan;

  const getButtonText = () => {
    if (isCurrentPlan) {
      return "Gói đang sử dụng";
    }
    if (hasHigherOrEqualPlan) {
      return "Bạn đã có gói cao hơn";
    }
    return "Thanh toán VNPay";
  };

  const getButtonVariant = () => {
    if (paymentMethod === PaymentMethod.VNPAY) {
      return "default";
    }
    return plan.buttonVariant || "outline";
  };

  // Button is disabled if:
  // 1. User already has this plan (current plan)
  // 2. User has a higher or equal plan
  const isButtonDisabled = isCurrentPlan || hasHigherOrEqualPlan;

  return (
    <div
      className={cn(
        "relative hover:shadow-xl p-4 sm:p-5 rounded-[36px] w-full font-medium text-center transition-all duration-300",
        "sm:min-w-[315px] min-w-0 max-w-[500px]",
        plan.isPopular
          ? "popular-card bg-[#111116] text-white shadow-2xl sm:scale-105"
          : "pricing-card bg-gradient-to-br from-white via-[#E2D0FF] to-[#E2D0FF] text-[#1D1E25] shadow-[0_4px_10px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          className="-top-[14px] left-1/2 absolute shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mb-2.5 px-6 py-1.5 border-2 border-white rounded-[100px] font-medium text-white text-xs leading-4 tracking-[-1%] -translate-x-1/2 transform"
          style={{
            background:
              "linear-gradient(0deg, #5700C6, #5700C6), linear-gradient(90deg, rgba(240, 232, 255, 0) 0%, #3F09A8 100%)",
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Payment Method Indicator */}

      {/* Header */}
      <div className="flex flex-col justify-start h-auto sm:h-[120px]">
        <h3
          className={cn(
            "m-0 mt-2.5 font-medium text-lg sm:text-xl leading-[100%] tracking-[0%]",
            plan.isPopular ? "text-white" : "text-[#1D1E25]"
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            "mt-3 sm:mt-4 mb-0 font-bold lg:text-[46px] text-3xl sm:text-4xl tracking-[-3%]",
            plan.isPopular ? "text-white" : "text-[#1D1E25]"
          )}
        >
          {formatPrice(currentPrice)}
          {currentPrice > 0 && (
            <span
              className={cn(
                "font-medium text-xs sm:text-sm tracking-[0%]",
                plan.isPopular ? "text-white" : "text-[#111116]"
              )}
            >
              /{isYearly ? "năm" : "tháng"}
            </span>
          )}
        </p>
        <p
          className={cn(
            "mt-2 sm:mt-2.5 mb-0 font-medium text-sm sm:text-base leading-[100%] tracking-[0%]",
            plan.isPopular ? "text-white" : "text-[#1D1E25]"
          )}
        >
          {plan.description ? formatPrice(Number(plan.description)) : ""}
        </p>
      </div>

      {/* Divider */}
      <hr
        className={cn(
          "my-4 border-none h-px",
          plan.isPopular ? "bg-white opacity-20" : "bg-[#1D1E25] opacity-10"
        )}
      />

      {/* Features */}
      <ul className="p-0 font-medium text-left list-none">
        {plan.contentSubscriptions?.map((feature, index) => (
          <li
            key={index}
            className={cn(
              "flex justify-start items-start my-3 sm:my-4 text-xs sm:text-sm",
              plan.isPopular ? "text-white" : "text-[#555]"
            )}
          >
            <span className="flex flex-shrink-0 justify-center items-center mr-2">
              {feature.included ? (
                <Image
                  src={
                    plan.isPopular
                      ? "/icons/status/check_circle_popular.svg"
                      : "/icons/status/check_circle.svg"
                  }
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              ) : (
                <Image
                  src="/icons/status/x_circle.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              )}
            </span>
            <span className="flex-1">{feature.content}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-3 sm:mt-4">
        <Button
          onClick={handleSelectPlan}
          variant={getButtonVariant()}
          disabled={isButtonDisabled}
          className={cn(
            "py-2 sm:py-2.5 border-none rounded-[36px] w-full font-bold text-white text-sm sm:text-base leading-6 transition-all duration-200",
            isCurrentPlan
              ? "bg-green-500 cursor-not-allowed"
              : hasHigherOrEqualPlan
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-[#5700C6] hover:opacity-90 cursor-pointer"
          )}
        >
          {getButtonText()}
        </Button>
        {plan.ctaText && (
          <p
            className={cn(
              "mt-2 text-xs sm:text-sm text-center",
              plan.isPopular ? "text-white" : "text-[#1D1E25]"
            )}
          >
            {plan.ctaText}
          </p>
        )}
      </div>

      {/* Eclipse decoration for popular card */}
      {plan.isPopular && (
        <div className="-right-2 sm:-right-5 bottom-[25%] z-0 absolute opacity-50 w-[150px] sm:w-[200px] h-auto rotate-[17deg] pointer-events-none">
          <Image
            src="/images/pricing/eclipse_pricing_card.png"
            alt="Eclipse decoration"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};
