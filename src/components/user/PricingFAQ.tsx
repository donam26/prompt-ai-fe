"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PRICING_FAQ } from "@/constants/pricing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto p-6 sm:p-8 px-4 sm:px-6 lg:px-8 border border-[#E2D0FF] rounded-2xl max-w-7xl">
        <div className="gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Questions */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 font-bold text-[#1D1E25] text-2xl sm:text-3xl lg:text-4xl">
                Câu hỏi
              </h2>
              <p className="text-[#1D1E25] text-base sm:text-lg leading-relaxed">
                Hướng dẫn để thành thạo việc viết prompt. Khám phá các hướng dẫn
                hoặc tạo prompt ngay bây giờ.
              </p>
            </div>
            <div className="flex sm:flex-row flex-col gap-3">
              <Button
                variant="outline"
                className="bg-[#F4F0FF] hover:bg-[#D4C0F0] px-6 py-2 border-[#E2D0FF] rounded-full font-medium text-[#1D1E25]"
              >
                More Questions
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-[#1D1E25] underline"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-4">
            {PRICING_FAQ.faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-gray-200 border-b last:border-b-0"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="group flex justify-between items-start w-full text-left"
                >
                  <span className="pr-4 font-medium text-[#1D1E25] text-sm sm:text-base leading-relaxed">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 mt-1">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-[#1D1E25]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#1D1E25]" />
                    )}
                  </div>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === index
                      ? "max-h-96 opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-[#1D1E25] text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="">
          <div className="mx-auto p-6 sm:p-8 border border-[#5700C6] rounded-2xl max-w-2xl">
            <h3 className="mb-6 font-bold text-[#1D1E25] text-xl sm:text-2xl text-center">
              Bạn có những thắc mắc?
            </h3>
            <div className="flex sm:flex-row flex-col justify-center items-center gap-4 sm:gap-8">
              <div className="text-center">
                <p className="mb-1 font-medium text-[#1D1E25] text-sm sm:text-base">
                  Zalo
                </p>
                <p className="text-[#1D1E25] text-sm">0909.107.018</p>
              </div>
              <div className="text-center">
                <p className="mb-1 font-medium text-[#1D1E25] text-sm sm:text-base">
                  Email
                </p>
                <p className="text-[#1D1E25] text-sm">contact@prom.io</p>
              </div>
              <div className="text-center">
                <p className="mb-1 font-medium text-[#1D1E25] text-sm sm:text-base">
                  Discord
                </p>
                <p className="text-[#1D1E25] text-sm">@support_prom.io</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
