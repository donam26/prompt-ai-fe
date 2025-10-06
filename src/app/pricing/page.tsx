"use client";

import { PricingFAQ } from "@/components/user/PricingFAQ";
import Image from "next/image";

export default function PricingPage() {
  return (
    <div className="bg-white py-8 lg:py-16 min-h-screen">
      <div className="mx-auto px-4 container">
        {/* Hero Section */}
        <section className="relative mb-9">
          <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h1 className="mb-4 sm:mb-6 font-bold text-[#1D1E25] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Gấp đôi hiệu năng làm việc với gói PromptX phù hợp
              </h1>
              <span className="text-[#1D1E25] text-base sm:text-lg">
                Nâng cấp để truy cập KHÔNG GIỚI HẠN thư viện Prompt cao cấp
              </span>
            </div>
          </div>
        </section>
        <div className="hidden sm:block max-w-[1400px] max-h-[570px]">
          <Image
            src="/images/cta/cta-desktop-pricing.png"
            alt="Pricing"
            width={1400}
            height={570}
            className="object-cover"
          />
        </div>
        <div className="sm:hidden block relative w-full aspect-[9/16]">
          <Image
            src="/images/cta/cta-mobile-pricing.png"
            alt="Pricing"
            fill
            className="object-contain"
          />
        </div>

        {/* FAQ Section */}
        <PricingFAQ />
      </div>
    </div>
  );
}
