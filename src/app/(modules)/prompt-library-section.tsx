"use client";

import { CTAButton } from "@/components/ui";
import { CHROME_EXTENSION_URL } from "@/constants/homepage";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES_URL } from "@/constants/routes-url";

const PromptLibrarySection = () => {
  const router = useRouter();
  return (
    <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
      {/* Left Section - Prompt Library Discovery */}
      <div className="relative bg-prompt-library-gradient p-8 pb-0 rounded-2xl overflow-hidden">
        <div className="z-10 relative grid h-full">
          <h2 className="mb-6 font-bold text-3xl lg:text-4xl leading-tight">
            Khám phá Thư Viện 10,000 Prompts!
          </h2>
          <p className="mb-8 text-base leading-relaxed">
            15 lĩnh vực, 60 ngành nghề khác nhau, 10.000 prompts chuyên sâu đang
            chờ bạn!
          </p>
          <CTAButton
            variant="gradient"
            size="lg"
            onClick={() => {
              router.push(ROUTES_URL.PROMPT_LIBRARY);
            }}
            iconPosition="right"
            className="mb-8 w-[275px]"
          >
            Thư Viện Prompt
            <ArrowRightIcon className="w-5 h-5" />
          </CTAButton>

          {/* Astronaut Illustration */}
          <div className="relative">
            <Image
              src="/images/home/comprehensive/prompt-library-section.png"
              alt="Prompt Library Section"
              width={640}
              height={430}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Section - Upgrade Prompt */}
      <div
        className="relative p-8 pb-0 border border-white/20 rounded-3xl overflow-hidden"
        style={{
          backgroundColor: "#D0E0F3",
          backgroundImage: `
            radial-gradient(124.52% 124.52% at -3.99% 35.36%, #0066FF 0%, rgba(0, 78, 255, 0) 69.33%),
            radial-gradient(73.57% 73.57% at 0% 67.49%, #5666EF 0%, rgba(86, 102, 239, 0) 69.33%),
            radial-gradient(88.4% 88.4% at 86.12% 6.46%, #FF1C89 0%, rgba(229, 102, 163, 0) 56.56%),
            radial-gradient(74.14% 74.14% at 102.47% 39.73%, #B566E6 0%, rgba(181, 102, 230, 0) 77.6%),
            radial-gradient(58.56% 126.24% at 31.37% 0%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 77.6%),
            radial-gradient(42.61% 55.51% at 60.46% 100%, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 100%)
          `,
        }}
      >
        <div className="z-10 relative grid h-full">
          <h2 className="mb-6 font-bold text-white text-3xl lg:text-4xl leading-tight">
            Nâng cấp prompt
          </h2>
          <p className="mb-8 text-gray-300 text-lg leading-relaxed">
            Tạo prompt AI chuyên nghiệp, với các chế độ chuyên sâu, sáng tạo
          </p>
          <CTAButton
            variant="gradient"
            size="lg"
            onClick={() => {
              window.open(CHROME_EXTENSION_URL, "_blank");
            }}
            icon={
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            iconPosition="right"
            className="mb-8 w-[218px]"
          >
            Tải ngay
          </CTAButton>

          {/* Mobile App Interface */}
          <div className="relative">
            <Image
              src="/images/home/comprehensive/upgrade-prompt-section.png"
              alt="Upgrade Prompt Section"
              width={640}
              height={430}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptLibrarySection;
