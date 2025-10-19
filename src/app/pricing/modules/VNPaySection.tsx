"use client";

import { Button } from "@/components/ui/button";
import { PricingCardV2 } from "@/components/user/PricingCardV2";
import { PaymentMethod } from "@/types/enums/payment-method";
import { usePricingSubscriptions } from "@/hooks/usePricingSubscriptions";

interface VNPaySectionProps {
  paymentMethod: PaymentMethod;
  onSelectPlan: (planId: string, paymentMethod: PaymentMethod) => void;
  featuresData: Array<{
    id: number;
    content: string;
    included: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
}

export const VNPaySection = ({
  paymentMethod,
  onSelectPlan,
  featuresData,
}: VNPaySectionProps) => {
  const {
    subscriptions,
    isLoading: isLoadingSubscriptions,
    error: subscriptionsError,
    refetch,
  } = usePricingSubscriptions();

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
        ) : subscriptions.length > 0 ? (
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              {subscriptions
                .filter(plan => plan.name?.toLowerCase().includes("premium"))
                .map(plan => (
                  <PricingCardV2
                    key={plan.id}
                    plan={{
                      id: plan.id?.toString() || "",
                      name: plan.name,
                      price: plan.price,
                      description: "", // Subscription interface doesn't have pricePerYear
                      isPopular: true, // Premium is always popular
                      badge: "Phổ biến", // Premium badge
                      buttonText: "Nâng cấp",
                      buttonVariant: "default",
                      contentSubscriptions: featuresData.map(feature => ({
                        content: feature.content,
                        included: feature.included,
                      })),
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
