"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CHROME_EXTENSION_URL } from "@/constants/homepage";
import { ROUTES_URL } from "@/constants/routes-url";
import { PromptLibraryHome } from "@/app/prompt-library/[...slug]/modules";

import decorLeft from "@/../public/images/ui-elements/imgdecor2.png";
import decorBottomRight from "@/../public/images/ui-elements/imgdecor1.png";
import promptImage from "@/../public/images/ui-elements/nang-cap-prompt-image.png";
import promptText from "@/../public/images/ui-elements/nang-cap-prompt-text.png";
import astronautImage from "@/../public/images/home/astronaut/phi-hanh-gia-trang-chu.png";
import extensionPreview from "@/../public/images/ui-elements/extention.gif";
import CTAButton from "@/components/cta-button";
import { ArrowDown } from "lucide-react";

const PROMPT_LIBRARY_LIMIT_DESKTOP = 9;
const PROMPT_LIBRARY_LIMIT_MOBILE = 6;

interface PartnerLogo {
  src?: string;
  alt: string;
  isText?: boolean;
  text?: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { src: "/images/ai-tools/gpt.png", alt: "ChatGPT" },
  { src: "/images/ai-tools/mid.png", alt: "Midjourney" },
  { src: "/images/ai-tools/imggrok.png", alt: "Grok" },
  { src: "/images/ui-elements/imgAiHay.png", alt: "AIHay" },
  { src: "/images/ai-tools/imgdeep.png", alt: "DeepSeek" },
  { src: "/images/ai-tools/gen.png", alt: "Gemini" },
  { src: "/images/logos/logoclaude.png", alt: "Claude" },
  { src: "/images/ai-tools/dall.png", alt: "DALL-E" },
  { isText: true, text: "và nhiều hơn nữa!", alt: "More partners" },
];

export const HeroRevampSection = (): React.JSX.Element => {
  const router = useRouter();
  const [isExtensionVisible, setIsExtensionVisible] = useState(true);

  const handleOpenExtension = () => {
    window.open(CHROME_EXTENSION_URL, "_blank", "noopener");
  };

  const handleNavigateToPromptLibrary = () => {
    router.push(ROUTES_URL.PROMPT_LIBRARY);
  };

  const handleCloseExtension = () => {
    setIsExtensionVisible(false);
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(90deg, #e1f6ff 0%, #e6b8ff 100%)" }}
    >
      <section className="relative flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 lg:pb-8 w-full">
        <Image
          src={decorLeft}
          alt=""
          priority
          className="hidden sm:block top-10 left-0 absolute w-32 md:w-44 lg:w-56 h-auto pointer-events-none"
        />
        <Image
          src={decorBottomRight}
          alt=""
          priority
          className="hidden sm:block right-0 bottom-0 z-10 absolute w-32 md:w-44 lg:w-56 h-auto pointer-events-none"
        />

        <div className="z-10 relative flex flex-col items-center mx-auto w-full max-w-6xl text-center">
          <h1
            className="flex flex-col items-center gap-1 mb-4 font-sans font-extrabold sm:text-3xl text-4xl md:text-5xl lg:text-6xl uppercase !leading-tight"
            style={{ fontFamily: "'Be Vietnam Pro', 'Inter', sans-serif" }}
          >
            <span className="block relative text-[#001AFF]">
              Thư Viện &amp; Nâng Cấp
              <span className="absolute inset-0 bg-clip-text bg-gradient-to-r from-[#5700C6] to-[#001AFF] text-transparent">
                Thư Viện &amp; Nâng Cấp
              </span>
            </span>
            <span className="block relative text-[#001AFF]">
              Prompt chỉ với 1 nút bấm!
              <span className="absolute inset-0 bg-clip-text bg-gradient-to-r from-[#5700C6] to-[#001AFF] text-transparent">
                Prompt chỉ với 1 nút bấm!
              </span>
            </span>
          </h1>

          <p className="max-w-2xl font-semibold text-[#1F1F20] text-xs sm:text-base md:text-lg text-center">
            Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI
          </p>
        </div>
        <div className="relative">
          {/* Text and Image Section */}
          <div className="hidden left-[-8rem] sm:left-[-7rem] md:left-[-10rem] lg:left-[-17.5rem] absolute sm:flex md:flex-row flex-col justify-center items-center gap-2">
            <Image
              src={promptImage}
              alt="Nâng Cấp Prompt"
              className="order-1 md:order-2 md:mb-6 w-auto h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24"
              priority
            />
            <Image
              src={promptText}
              alt="Nâng Cấp Prompt Text"
              className="order-2 md:order-1 w-auto h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24"
              priority
            />
          </div>

          {/* Desktop CTA & Illustration */}
          <div className="hidden sm:flex justify-center items-center gap-4 mt-4 sm:mt-4 md:mt-6">
            {/* Buttons Section */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-4 w-full">
              <CTAButton
                className="flex justify-center items-center gap-2 bg-[radial-gradient(42.61%_55.51%_at_60.46%_100%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%),radial-gradient(58.56%_126.24%_at_31.37%_0%,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_77.6%),radial-gradient(74.14%_74.14%_at_102.47%_39.73%,#B566E6_0%,rgba(181,102,230,0)_77.6%),radial-gradient(88.4%_88.4%_at_86.12%_6.46%,#FF1C89_0%,rgba(229,102,163,0)_56.56%),radial-gradient(73.57%_73.57%_at_0%_67.49%,#5666EF_0%,rgba(86,102,239,0)_69.33%),radial-gradient(124.52%_124.52%_at_-3.99%_35.36%,#0066FF_0%,rgba(0,78,255,0)_69.33%),#D0E0F3] shadow-[inset_0px_0px_12px_rgba(255,255,255,0.6)] rounded-full w-[212px] h-[53.5px]"
                onClick={handleOpenExtension}
              >
                Tải ngay
                <ArrowDown className="w-4 h-4" />
              </CTAButton>
              <Button
                onClick={handleNavigateToPromptLibrary}
                className="relative flex justify-center items-center gap-2 bg-[rgba(214,214,214,0.3)] hover:bg-[rgba(214,214,214,0.3)] shadow-[0px_69px_69px_rgba(255,255,255,0.09),0px_17px_38px_rgba(255,255,255,0.1)] backdrop-blur-[9px] px-4 py-3 rounded-full w-[212px] h-[53.5px] overflow-hidden font-semibold text-[#5700C6] text-lg hover:scale-105 transition-transform duration-300"
              >
                <span>Thư viện prompt</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.00002L13 1M13 1L13 13M13 1L1.00002 13"
                    stroke="#5700C6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1.00002L13 1M13 1L13 13M13 1L1.00002 13"
                    stroke="url(#paint0_linear_hero_prompt_mobile)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_hero_prompt_mobile"
                      x1="1"
                      y1="7"
                      x2="13"
                      y2="7"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F0E8FF" stopOpacity="0" />
                      <stop offset="1" stopColor="#3F09A8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] border border-white/60 rounded-full pointer-events-none" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile CTA & Illustration */}
        <div className="sm:hidden relative flex justify-center items-center gap-4 mt-4">
          <div className="left-[-5rem] sm:left-[-12rem] md:left-[-15rem] lg:left-[-17.5rem] xl:left-[-20rem] absolute flex flex-col items-center gap-2 rem]">
            <Image
              src={promptImage}
              alt="Nâng Cấp Prompt"
              className="order-1 md:order-2 w-auto h-12"
              priority
            />
            <Image
              src={promptText}
              alt="Nâng Cấp Prompt Text"
              className="order-2 md:order-1 w-auto h-12"
              priority
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <CTAButton
              className="flex justify-center items-center gap-2 bg-[radial-gradient(42.61%_55.51%_at_60.46%_100%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%),radial-gradient(58.56%_126.24%_at_31.37%_0%,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_77.6%),radial-gradient(74.14%_74.14%_at_102.47%_39.73%,#B566E6_0%,rgba(181,102,230,0)_77.6%),radial-gradient(88.4%_88.4%_at_86.12%_6.46%,#FF1C89_0%,rgba(229,102,163,0)_56.56%),radial-gradient(73.57%_73.57%_at_0%_67.49%,#5666EF_0%,rgba(86,102,239,0)_69.33%),radial-gradient(124.52%_124.52%_at_-3.99%_35.36%,#0066FF_0%,rgba(0,78,255,0)_69.33%),#D0E0F3] shadow-[inset_0px_0px_12px_rgba(255,255,255,0.6)] rounded-full w-[212px] h-[53.5px]"
              onClick={handleOpenExtension}
            >
              Tải ngay
              <ArrowDown className="w-4 h-4" />
            </CTAButton>
            <Button
              onClick={handleNavigateToPromptLibrary}
              className="relative flex justify-center items-center gap-2 bg-[rgba(214,214,214,0.3)] shadow-[0px_69px_69px_rgba(255,255,255,0.09),0px_17px_38px_rgba(255,255,255,0.1)] backdrop-blur-[9px] px-4 py-3 rounded-full w-[212px] h-[53.5px] overflow-hidden font-semibold text-[#5700C6] text-lg hover:scale-105 transition-transform duration-300"
            >
              <span>Thư viện prompt</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.00002L13 1M13 1L13 13M13 1L1.00002 13"
                  stroke="#5700C6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1.00002L13 1M13 1L13 13M13 1L1.00002 13"
                  stroke="url(#paint0_linear_hero_prompt_mobile)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] border border-white/60 rounded-full pointer-events-none" />
            </Button>
          </div>
        </div>

        {/* Partner logos */}
        <div className="z-[3] flex sm:flex-col justify-center sm:items-center gap-1 sm:mt-5 max-w-[1400px] sm:max-w-[600px]">
          {/* Desktop: Show full list without animation */}
          <div className="hidden sm:flex sm:flex-wrap justify-around items-center gap-3 px-5 rounded-2xl min-w-[750px] h-[100px] scrollbar-hide">
            {PARTNER_LOGOS.map((partner, index) => (
              <div
                key={`partner-desktop-${partner.alt}-${index}`}
                className="flex justify-center items-center text-[#6e6e6e] text-xl"
              >
                {partner.isText ? (
                  <span>{partner.text}</span>
                ) : (
                  partner.src && (
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={50}
                      height={36}
                      className="h-9 object-contain"
                    />
                  )
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Slider with animation */}
          <div className="sm:hidden flex flex-nowrap justify-around items-center gap-3 px-5 rounded-2xl min-w-fit h-[50px] overflow-hidden partners-logos-container scrollbar-hide">
            {/* Duplicate list 2 times for seamless animation on mobile */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, index) => (
              <div
                key={`partner-mobile-${partner.alt}-${index}`}
                className="flex flex-[0_0_auto] justify-center items-center mr-5 text-[#6e6e6e] text-xs partner-item"
              >
                {partner.isText ? (
                  <span>{partner.text}</span>
                ) : (
                  partner.src && (
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={50}
                      height={36}
                      className="h-[25px] object-contain"
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-8 sm:mt-16 w-full">
          <div className="hidden md:block -top-20 lg:-top-28 -left-8 lg:-left-16 z-20 absolute pointer-events-none">
            <Image
              src={astronautImage}
              alt="Astronaut"
              className="drop-shadow-[0_20px_40px_rgba(87,0,198,0.25)] w-auto h-48 md:h-56 lg:h-[420px] animate-float"
              priority
            />
          </div>

          {isExtensionVisible && (
            <div className="top-4 right-4 z-20 absolute">
              <div className="relative flex flex-col items-end">
                <button
                  type="button"
                  onClick={handleCloseExtension}
                  className="-top-3 -right-3 absolute flex justify-center items-center bg-gradient-to-r from-[#5700C6] to-[#8B5CF6] shadow-lg border border-white/60 rounded-full w-8 h-8 text-white hover:scale-105 transition-transform duration-300"
                  aria-label="Đóng xem trước tiện ích"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Image
                  src={extensionPreview}
                  alt="Extension Demo"
                  width={400}
                  height={280}
                  className="shadow-2xl rounded-2xl w-40 sm:w-52 md:w-64 lg:w-80 xl:w-[400px] h-auto object-contain"
                  priority
                />
              </div>
            </div>
          )}

          <div className="z-10 relative bg-white/70 shadow-[0px_24px_60px_rgba(87,0,198,0.08)] backdrop-blur-md p-4 sm:p-4 pb-0 sm:pb-4 border border-[#F4F0FF] rounded-2xl">
            {/* Desktop: Show 9 prompts */}
            <div className="hidden sm:block">
              <PromptLibraryHome limit={PROMPT_LIBRARY_LIMIT_DESKTOP} />
            </div>
            {/* Mobile: Show 6 prompts - Remove extra padding */}
            <div className="sm:hidden block -mx-4 -mb-4 p-4">
              <div className="[&>div]:!py-0 [&>div>div]:!py-0 [&>div>div]:!pb-0 [&>div]:!min-h-0">
                <PromptLibraryHome limit={PROMPT_LIBRARY_LIMIT_MOBILE} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
