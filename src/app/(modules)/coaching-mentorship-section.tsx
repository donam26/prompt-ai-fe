"use client";

import Image from "next/image";
import { CTAButton } from "@/components/ui";
import { ArrowRightIcon } from "lucide-react";

const CoachingMentorshipSection = () => {
  return (
    <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 bg-coaching-gradient mx-auto mb-8 p-9 rounded-2xl h-[540px] overflow-hidden">
      {/* Left Section - Coaching & Mentorship */}
      <div className="relative flex-[0_0_60%] rounded-xl overflow-hidden">
        <div className="z-10 relative flex flex-col justify-center p-8 rounded-xl h-full">
          <div className="bg-coaching-primary mb-4 px-4 py-1 rounded-full w-fit font-semibold text-white text-sm uppercase tracking-wider">
            COACHING & MENTORSHIP
          </div>
          <h2 className="mb-6 font-bold text-white text-3xl lg:text-4xl leading-tight">
            Learn 1-on-1 from Real Ecom Experts Who&apos;ve Built $100M+ Brands
          </h2>
          <p className="mb-8 text-white text-base leading-relaxed">
            Personalized guidance from mentors with unmatched experience scaling
            7, 8, and 9-figure brands.
          </p>
          <CTAButton className="w-[275px]">
            Xem danh sách
            <ArrowRightIcon className="size-4" />
          </CTAButton>
        </div>
      </div>

      {/* Right Section - Video Call Interface */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="z-10 relative h-full">
          {/* Video Call Interface */}
          <Image
            src="/images/home/comprehensive/coaching-mentorship-section.png"
            alt="Coaching Mentorship Section"
            width={640}
            height={430}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CoachingMentorshipSection;
