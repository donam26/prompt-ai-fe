"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const SKOOL_COMMUNITY_URL =
  "https://www.skool.com/prom-aihub/about?ref=1a6136e6caba48bcaf8d6a8120bc0cb8";

export const SkoolCommunitySection = () => {
  return (
    <div className="relative mb-8 rounded-xl overflow-hidden">
      {/* Background Image for Desktop */}
      <Image
        src="/images/pricing/pricing-background.jpg"
        alt="Pricing Background"
        width={1270}
        height={600}
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      />

      {/* Background Image for Mobile */}
      <Image
        src="/images/pricing/pricing-background-mobile.jpg"
        alt="Pricing Background Mobile"
        fill
        className="md:hidden block absolute inset-0 w-full h-full object-cover"
      />

      {/* Content Overlay */}
      <div className="z-10 relative px-8 lg:px-16 py-16 lg:py-24 text-white md:text-left text-center">
        <div className="mx-auto max-w-[1270px]">
          <h1 className="mb-6 font-bold text-white text-2xl md:text-4xl lg:text-6xl leading-tight">
            Prom AI Hub - Hub AI Hàng Đầu Việt Nam
          </h1>
          <p className="mb-8 max-w-2xl text-white/90 text-lg md:text-xl">
            Cộng Đồng AI First dành cho các entrepreneurs,
            <br /> Gen-Z, freelancers, và các chủ doanh nghiệp!
          </p>

          {/* Features List */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-white/90 text-base md:text-lg">
                Sử dụng Thư viện 10,000 prompts & Extension Nâng Cấp Prompt
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-white/90 text-base md:text-lg">
                Modules hướng dẫn trong nhiều lĩnh vực AI
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-white/90 text-base md:text-lg">
                6 chuyên gia AI cầm-tay-chỉ-việc
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-white/90 text-base md:text-lg">
                Livestream / Giveaway hàng tuần
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-white/90 text-base md:text-lg">
                Module 1-0-2: Deepfake, Jailbreak LLM, System Prompt và ??
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Button
              className="flex justify-center items-center shadow-[inset_0px_0px_12px_rgba(255,255,255,0.6)] border rounded-full w-[330px] h-[53.5px] font-semibold text-white text-lg hover:scale-105 transition-all duration-300 hero-button-gradient"
              style={{ padding: "16px" }}
              onClick={() => window.open(SKOOL_COMMUNITY_URL, "_blank")}
            >
              Tham gia ngay
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
