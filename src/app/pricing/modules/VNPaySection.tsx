"use client";

import { Button } from "@/components/ui/button";
import { PricingCardV2 } from "@/components/user/PricingCardV2";
import { PaymentMethod } from "@/types/enums/payment-method";
import { usePricingSubscriptions } from "@/hooks/usePricingSubscriptions";

interface VNPaySectionProps {
  paymentMethod: PaymentMethod;
  onSelectPlan: (planId: string, paymentMethod: PaymentMethod) => void;
}

export const VNPaySection = ({
  paymentMethod = PaymentMethod.VNPAY,
  onSelectPlan,
}: VNPaySectionProps) => {
  const {
    subscriptions,
    isLoading: isLoadingSubscriptions,
    error: subscriptionsError,
    refetch,
  } = usePricingSubscriptions();

  const filteredSubscriptions = subscriptions
    .filter(plan => [9, 12].includes(plan.id))
    .reverse();

  return (
    <>
      {/* VNPay Header */}

      {/* Pricing Plans Section */}
      <div className="mt-8 sm:mt-12">
        {isLoadingSubscriptions ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="mx-auto mb-4 border-purple-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-gray-600">Đang tải gói đăng ký...</p>
            </div>
          </div>
        ) : subscriptionsError ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-red-600">
              Lỗi khi tải dữ liệu: {subscriptionsError}
            </p>
            <Button onClick={refetch} variant="outline">
              Thử lại
            </Button>
          </div>
        ) : filteredSubscriptions.length > 0 ? (
          <div className="flex justify-center items-start mx-auto w-full max-w-6xl">
            <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 w-full">
              {filteredSubscriptions.map(plan => (
                <PricingCardV2
                  key={plan.id}
                  plan={{
                    id: plan.id?.toString() || "",
                    name: plan.name,
                    price: Number(plan.price),
                    description: "",
                    isPopular: plan.isPopular, // Premium is always popular
                    badge: plan.isPopular ? "Bán chạy" : "", // Premium badge
                    buttonText: "Nâng cấp",
                    buttonVariant: "default",
                    contentSubscriptions: plan.contentSubscriptions?.map(
                      feature => ({
                        content: feature.content,
                        included: feature.included,
                      })
                    ),
                  }}
                  isYearly={false}
                  onSelectPlan={onSelectPlan}
                  paymentMethod={paymentMethod}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-600">Chưa có gói Premium nào</p>
          </div>
        )}
      </div>
    </>
  );
};
