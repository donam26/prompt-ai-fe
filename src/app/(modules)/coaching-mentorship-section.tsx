"use client";

import Image from "next/image";
import { CTAButton } from "@/components/ui";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES_URL } from "@/constants/routes-url";

const CoachingMentorshipSection = () => {
  return (
    <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 bg-coaching-gradient mx-auto p-6 sm:p-9 rounded-2xl h-[540px] overflow-hidden">
      {/* Left Section - Coaching & Mentorship */}
      <div className="relative flex-[0_0_60%] rounded-xl overflow-hidden">
        <div className="z-10 relative flex flex-col justify-center grid p-8 rounded-xl h-full h-full">
          <div className="bg-coaching-primary mb-4 px-4 py-1 rounded-full w-fit font-semibold text-white text-sm uppercase tracking-wider">
            PROM AI HUB
          </div>
          <h2 className="mb-6 font-bold text-white text-3xl lg:text-4xl leading-tight">
            Học trực tiếp từ những chuyên gia AI trong nhiều lĩnh vực hot nhất!
          </h2>
          <p className="mb-8 text-white text-base leading-relaxed">
            Modules và những khóa học dạy từng bước một, giúp bạn dễ dàng lĩnh
            hội những kĩ năng AI có thể kiếm được tiền luôn!
          </p>
          <Link href={ROUTES_URL.PRICING} className="inline-block">
            <CTAButton className="w-[275px]">
              Khám phá ngay
              <ArrowRightIcon className="size-4" />
            </CTAButton>
          </Link>
        </div>
      </div>

      {/* Right Section - Video Call Interface */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="z-10 relative grid h-full h-full">
          {/* Video Call Interface */}
          <Image
            src="/images/home/comprehensive/coaching-mentorship-section.jpg"
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
