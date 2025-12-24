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
    .filter(plan => plan.isActive)
    .sort(
      (planA, planB) =>
        (planA.displayOrder ?? Number.MAX_SAFE_INTEGER) -
        (planB.displayOrder ?? Number.MAX_SAFE_INTEGER)
    );

  const renderPricingCards = (plans: typeof filteredSubscriptions) => {
    const isSmallLayout = plans.length <= 2;
    let cardClassName: string;
    let containerClassName: string;

    if (isSmallLayout) {
      cardClassName = "w-full max-w-[360px]";
      containerClassName = "flex flex-wrap justify-center gap-10 w-full";
    } else {
      cardClassName = "w-full";
      containerClassName =
        "justify-center gap-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full";
    }

    return (
      <div className={containerClassName}>
        {plans.map(plan => (
          <PricingCardV2
            key={plan.id}
            plan={{
              id: plan.id?.toString() || "",
              name: plan.name,
              price: Number(plan.price),
              description: "",
              isPopular: plan.isPopular,
              badge: plan.isPopular ? "Bán chạy" : "",
              buttonText: "Nâng cấp",
              buttonVariant: "default",
              contentSubscriptions: plan.contentSubscriptions?.map(feature => ({
                content: feature.content,
                included: feature.included,
              })),
              billingCycle: plan.billingCycle,
            }}
            onSelectPlan={onSelectPlan}
            paymentMethod={paymentMethod}
            className={cardClassName}
          />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoadingSubscriptions) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 border-purple-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-gray-600">Đang tải gói đăng ký...</p>
          </div>
        </div>
      );
    }

    if (subscriptionsError) {
      return (
        <div className="py-12 text-center">
          <p className="mb-4 text-red-600">
            Lỗi khi tải dữ liệu: {subscriptionsError}
          </p>
          <Button onClick={refetch} variant="outline">
            Thử lại
          </Button>
        </div>
      );
    }

    if (filteredSubscriptions.length > 0) {
      return (
        <div className="flex justify-center items-start mx-auto w-full max-w-6xl">
          {renderPricingCards(filteredSubscriptions)}
        </div>
      );
    }

    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">Chưa có gói Premium nào</p>
      </div>
    );
  };

  return <div className="mt-8 sm:mt-12">{renderContent()}</div>;
};
