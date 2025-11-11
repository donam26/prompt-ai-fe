"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PricingFAQ } from "@/components/user/PricingFAQ";
import { ContactModal } from "@/components/user/ContactModal";
import { PaymentMethod } from "@/types/enums/payment-method";
import { VNPaySection } from "./modules/VNPaySection";
import { usePricingSubscriptions } from "@/hooks/usePricingSubscriptions";
import { PaymentTutorialSection } from "./modules/payment-tutorial-section";
import { ROUTES_URL } from "@/constants/routes-url";

export default function PricingPage() {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Get subscriptions data for checkout
  const { subscriptions } = usePricingSubscriptions();

  const handleSelectPlan = (planId: string, method: PaymentMethod) => {
    if (method === PaymentMethod.SKOOL) {
      router.push(ROUTES_URL.PRICING);
    } else {
      // Redirect to checkout page with plan data
      const plan = subscriptions.find(p => p.id?.toString() === planId);
      if (plan) {
        const params = new URLSearchParams({
          planId: plan.id?.toString() || "",
          planName: plan.name || "",
          planPrice: plan.price?.toString() || "0",
          planType: plan.type?.toString() || "1",
          features: plan.features?.join(",") || "",
          paymentMethod: PaymentMethod.VNPAY,
        });

        router.push(`/checkout?${params.toString()}`);
      }
    }
  };

  return (
    <div className="mx-auto p-4 min-h-screen container">
      <PaymentTutorialSection />
      <VNPaySection
        paymentMethod={PaymentMethod.VNPAY}
        onSelectPlan={handleSelectPlan}
      />

      {/* FAQ Section */}
      <div className="mb-8">
        <PricingFAQ />
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
