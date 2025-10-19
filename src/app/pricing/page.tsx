"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PricingFAQ } from "@/components/user/PricingFAQ";
import { ContactModal } from "@/components/user/ContactModal";
import { PaymentMethod } from "@/types/enums/payment-method";
import { cn } from "@/lib/utils";
import { SkoolCommunitySection } from "./modules/SkoolCommunitySection";
import { VNPaySection } from "./modules/VNPaySection";
import { usePricingSubscriptions } from "@/hooks/usePricingSubscriptions";

const SKOOL_COMMUNITY_URL =
  "https://www.skool.com/prom-aihub/about?ref=1a6136e6caba48bcaf8d6a8120bc0cb8";

export default function PricingPage() {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.SKOOL
  );

  // Get subscriptions data for checkout
  const { subscriptions } = usePricingSubscriptions();

  // Features data
  const featuresData = [
    {
      id: 41,
      content: "Truy cập Premium prompts",
      included: true,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:49:30.000Z",
    },
    {
      id: 42,
      content: "Truy cập tài liệu AI không giới hạn, cập nhật hàng tuần",
      included: true,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:50:45.000Z",
    },
    {
      id: 43,
      content: "Prompt tùy chỉnh cá nhân hóa không giới hạn",
      included: true,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:52:59.000Z",
    },
    {
      id: 44,
      content: "Sử dụng trình nâng cấp và cá nhân hoá prompt",
      included: true,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-03T15:00:40.000Z",
    },
    {
      id: 45,
      content: "Loại bỏ quảng cáo",
      included: true,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:57:16.000Z",
    },
    {
      id: 46,
      content: "x20 lần số lần nâng cấp prompt so với free",
      included: true,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:57:16.000Z",
    },
    {
      id: 114,
      content:
        "Sử dụng Prom's Master Prompter để tạo system prompt cho cá nhân và doanh nghiệp",
      included: true,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:57:16.000Z",
    },
    {
      id: 122,
      content: "1 Module áp dụng AI vào Marketing từ Hiếu AI ",
      included: false,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:57:16.000Z",
    },
    {
      id: 123,
      content: "1 giờ tư vấn từ Hiếu AI ( trị giá 4 triệu )",
      included: false,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:57:16.000Z",
    },
    {
      id: 126,
      content: " 200 prompts cá nhân hóa theo yêu cầu doanh nghiệp",
      included: false,
      createdAt: "2025-03-03T15:00:40.000Z",
      updatedAt: "2025-03-12T17:57:16.000Z",
    },
  ];

  const handleSelectPlan = (planId: string, method: PaymentMethod) => {
    if (method === PaymentMethod.SKOOL) {
      // Redirect to Skool Community
      window.open(SKOOL_COMMUNITY_URL, "_blank");
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
      {/* Payment Method Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4 bg-white shadow-lg p-2 border rounded-full">
          <button
            onClick={() => setPaymentMethod(PaymentMethod.SKOOL)}
            className={cn(
              "px-6 py-3 rounded-full font-semibold transition-all duration-300",
              paymentMethod === PaymentMethod.SKOOL
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:text-purple-600"
            )}
          >
            Skool Community
          </button>
          <button
            onClick={() => setPaymentMethod(PaymentMethod.VNPAY)}
            className={cn(
              "px-6 py-3 rounded-full font-semibold transition-all duration-300",
              paymentMethod === PaymentMethod.VNPAY
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:text-purple-600"
            )}
          >
            VNPay
          </button>
        </div>
      </div>

      {/* Skool Community Section */}
      {paymentMethod === PaymentMethod.SKOOL && <SkoolCommunitySection />}

      {/* VNPay Section */}
      {paymentMethod === PaymentMethod.VNPAY && (
        <VNPaySection
          paymentMethod={paymentMethod}
          onSelectPlan={handleSelectPlan}
          featuresData={featuresData}
        />
      )}

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
