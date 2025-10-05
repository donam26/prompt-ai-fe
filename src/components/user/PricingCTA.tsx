"use client";

import { Button } from "@/components/ui/button";
import { PRICING_CTA } from "@/constants/pricing";
import Image from "next/image";

export const PricingCTA = () => {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        {/* Background Image */}

        {/* Content */}
        <div className="z-10 relative">
          <h2 className="mb-4 font-bold text-white text-3xl sm:text-4xl lg:text-5xl">
            {PRICING_CTA.title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-purple-100 text-lg">
            {PRICING_CTA.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 shadow-lg hover:shadow-xl px-8 py-4 rounded-full font-semibold text-purple-600 text-lg transition-all duration-200"
            >
              {PRICING_CTA.buttonText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-white px-8 py-4 border-white rounded-full font-semibold text-white hover:text-purple-600 text-lg transition-all duration-200"
            >
              {PRICING_CTA.buttonSecondaryText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
