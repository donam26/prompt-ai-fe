"use client";

import { useRouter } from "next/navigation";
import { PricingCard } from "@/components/user/PricingCard";
import { PricingFAQ } from "@/components/user/PricingFAQ";
import { PricingLoadingState } from "@/components/user/PricingLoadingState";
import { usePricingPlans } from "@/hooks/user/usePricingPlans";
import Image from "next/image";

export default function PricingPage() {
  const router = useRouter();

  // Fetch pricing plans from API
  const { plans, isLoading, error, refetch } = usePricingPlans();

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      router.push("/login");
    } else if (planId === "premium") {
      router.push("/login?plan=premium");
    } else if (planId === "basic") {
      router.push("/login?plan=basic");
    } else if (planId === "pro") {
      router.push("/login?plan=pro");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto px-4 container">
        {/* Hero Section */}
        <section className="relative">
          <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h1 className="mb-4 sm:mb-6 font-bold text-[#1D1E25] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Chọn gói dịch vụ phù hợp
              </h1>
              <p className="mx-auto mb-6 sm:mb-8 max-w-3xl text-[#1D1E25] text-base sm:text-lg">
                Từ miễn phí đến doanh nghiệp, chúng tôi có gói dịch vụ phù hợp
                với mọi nhu cầu của bạn
              </p>
            </div>
          </div>
        </section>
        {/* Pricing Cards */}
        <section className="py-4 sm:py-6">
          <div className=" ">
            <PricingLoadingState
              isLoading={isLoading}
              error={error}
              onRetry={refetch}
            />

            {!isLoading && !error && (
              <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {plans.map(plan => (
                  <PricingCard
                    key={plan.id}
                    plan={plan}
                    isYearly={false}
                    onSelectPlan={handleSelectPlan}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="relative rounded-2xl w-full h-full overflow-hidden">
          <Image
            src="/images/pricing/pricing-img.png"
            alt="Pricing Background"
            fill
            className="h-[170px] object-contain"
          />
        </div>
        {/* FAQ Section */}
        <PricingFAQ />
      </div>
    </div>
  );
}
