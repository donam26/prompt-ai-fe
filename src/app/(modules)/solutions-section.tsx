"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { SOLUTIONS_DATA } from "@/constants";

export const SolutionsSection = () => {
  const [activeTag, setActiveTag] =
    useState<keyof typeof SOLUTIONS_DATA>("Solopreneur");
  const [animateCards, setAnimateCards] = useState(false);

  const handleTagChange = (tag: keyof typeof SOLUTIONS_DATA) => {
    if (tag === activeTag) return;

    // Kích hoạt animation
    setAnimateCards(true);

    // Đặt timer để tắt hiệu ứng animation sau một khoảng thời gian
    setTimeout(() => {
      setAnimateCards(false);
    }, 700);

    // Cập nhật tag active
    setActiveTag(tag);
  };

  return (
    <section className="bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto container">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="bg-clip-text bg-gradient-to-r from-[#5700C6] to-[#001AFF] text-transparent">
              Giải pháp toàn diện dành riêng cho
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {Object.keys(SOLUTIONS_DATA).map(tag => (
            <Button
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              onClick={() =>
                handleTagChange(tag as keyof typeof SOLUTIONS_DATA)
              }
              className={`text-sm sm:text-base ${
                activeTag === tag
                  ? "bg-[#5700C6] hover:bg-[#4a00a8] text-white"
                  : "text-gray-600 border-gray-300 hover:bg-[#5700C6]/10 hover:border-[#5700C6] hover:text-[#5700C6]"
              } transition-all duration-200`}
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="mb-6 sm:mb-8 text-center">
          <p className="mx-auto max-w-4xl text-gray-600 text-base sm:text-lg">
            {SOLUTIONS_DATA[activeTag].subtitle}
          </p>
        </div>

        <div className="items-center gap-4 sm:gap-8 grid grid-cols-1 lg:grid-cols-3">
          <Card
            className={`p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${animateCards ? "animate-pulse" : ""}`}
          >
            <Badge className="bg-[#5700C6]/10 mb-4 border-[#5700C6]/20 text-[#5700C6]">
              {SOLUTIONS_DATA[activeTag].prompts[0].cardLabel}
            </Badge>
            <h3 className="mb-3 font-bold text-lg sm:text-xl">
              {SOLUTIONS_DATA[activeTag].prompts[0].title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {SOLUTIONS_DATA[activeTag].prompts[0].subtitle}
            </p>
          </Card>

          <div className="hidden lg:block">
            <Image
              src={SOLUTIONS_DATA[activeTag].imgSrc}
              alt="Solutions"
              width={400}
              height={300}
              className="shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300"
            />
          </div>

          <Card
            className={`p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${animateCards ? "animate-pulse" : ""}`}
          >
            <Badge className="bg-[#001AFF]/10 mb-4 border-[#001AFF]/20 text-[#001AFF]">
              {SOLUTIONS_DATA[activeTag].prompts[1].cardLabel}
            </Badge>
            <h3 className="mb-3 font-bold text-lg sm:text-xl">
              {SOLUTIONS_DATA[activeTag].prompts[1].title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {SOLUTIONS_DATA[activeTag].prompts[1].subtitle}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
