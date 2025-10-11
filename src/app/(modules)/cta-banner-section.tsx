"use client";
import { CTAButton } from "@/components/ui";
import { CHROME_EXTENSION_URL } from "@/constants/homepage";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  className?: string;
}

export const CTABannerSection: React.FC<Props> = ({ className = "" }) => {
  const handleClick = () => {
    window.open(CHROME_EXTENSION_URL, "_blank");
  };

  return (
    <div
      className={`max-w-[1400px] mx-4 sm:mx-auto rounded-[36px] bg-cta-banner-gradient p-6 sm:p-8 lg:p-12 ${className}`}
    >
      <div className="px-4">
        <div className="items-center gap-12 grid lg:grid-cols-2">
          {/* Left Column - Text and CTAs */}
          <div className="relative space-y-8">
            {/* Notification Bubble */}
            <div className="-top-4 right-0 absolute cta-notification-bubble">
              <Image
                src="/images/home/cta-banner/cta-1.png"
                alt="Notification Bubble"
                width={94}
                height={28}
                className="object-cover"
              />
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h2 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
                Hãy tạo những dự án tuyệt vời và chính xác từ Prom
              </h2>

              <p className="text-white/90 text-xl leading-relaxed">
                Tạo nội dung cho chính bạn một cách nhanh chóng và chuẩn xác
                nhất
              </p>

              {/* CTA Buttons */}
              <div className="flex sm:flex-row flex-col gap-4">
                <CTAButton className="w-[240px]" onClick={handleClick}>
                  Tải ngay
                  <ArrowRightIcon className="w-4 h-4" />
                </CTAButton>
              </div>

              <div className="flex flex-end justify-center cta-notification-bubble">
                <Image
                  src="/images/home/cta-banner/cta-2.png"
                  alt="Notification Bubble"
                  width={150}
                  height={50}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Astronaut Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative cta-astronaut-container">
              {/* Astronaut SVG */}
              <div className="z-10 relative grid h-full cta-astronaut">
                <Image
                  src="/images/home/cta-banner/cta-banner-section.png"
                  alt="Astronaut"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
