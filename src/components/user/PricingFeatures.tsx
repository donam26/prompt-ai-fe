"use client";

import Image from "next/image";
import { PRICING_FEATURES } from "@/constants/pricing";

export const PricingFeatures = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-gray-900 text-3xl sm:text-4xl lg:text-5xl">
            {PRICING_FEATURES.title}
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-lg">
            {PRICING_FEATURES.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_FEATURES.features.map((feature, index) => (
            <div
              key={index}
              className="group text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="flex justify-center items-center bg-white shadow-lg group-hover:shadow-xl rounded-2xl w-16 h-16 transition-shadow duration-300">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
              </div>
              <h3 className="mb-3 font-semibold text-gray-900 text-xl">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
