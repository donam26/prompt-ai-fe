"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES_URL } from "@/constants/routes-url";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Prompt } from "@/types";
import Image from "next/image";
import { useLatestPrompts } from "@/hooks/lib-category-prompt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/components/ui/toast";

import "swiper/css";
import "swiper/css/pagination";

interface TrendingPromptsSectionProps {
  newestPrompts?: Prompt[];
}

export const TrendingPromptsSection = ({}: TrendingPromptsSectionProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  const { latestPrompts, isLoading, error } = useLatestPrompts({
    pageSize: 4,
    enabled: true,
    // Category ID for Sales
    categoryId: 8,
  });

  // Check if user has Free subscription
  const isFreeUser =
    user?.userSub?.subscription?.nameSub === "Free" ||
    !user?.userSub?.subscription?.nameSub;

  // Handle prompt click with subscription check
  const handlePromptClick = (prompt: Prompt, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Check if prompt is premium and user is Free
    if (prompt.subType === 2 && isFreeUser) {
      showToast.error(
        "Bạn cần nâng cấp gói Premium để xem prompt này. Đang chuyển đến trang giá..."
      );
      setTimeout(() => {
        router.push(ROUTES_URL.PRICING);
      }, 500);
      return;
    }

    // Navigate to prompt detail if allowed
    router.push(`${ROUTES_URL.PROMPT_LIBRARY}/${prompt.id}?tab=my-prompt`);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check if prompt is new (created within last 7 days)
  const isPromptNew = (createdAt?: string | Date) => {
    if (!createdAt) return false;
    const promptDate = new Date(createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return promptDate > sevenDaysAgo;
  };

  return (
    <div className="gap-4 lg:gap-8 grid overflow-hidden trending-prompts-container">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="mb-4 font-bold text-4xl md:text-5xl lg:text-6xl leading-[56px]">
          <span className="text-[#5700C6]">+10 Xu hướng</span>{" "}
          <span className="text-[#1D1E25]">
            Prompts nổi bật giúp ích cho cuộc sống của bạn
          </span>
        </h2>
      </div>

      {/* Cards Section */}
      <div className="w-full overflow-hidden">
        <div className="mx-auto w-full max-w-7xl overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="border-4 border-purple-200 border-t-purple-600 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : isMobile ? (
            <div
              className="w-full max-w-full overflow-hidden trending-prompts-swiper"
              style={{ maxWidth: "100vw", width: "100%" }}
            >
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 3,
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0",
                  padding: "0 1rem",
                }}
              >
                {latestPrompts.map(prompt => (
                  <SwiperSlide
                    key={prompt.id}
                    style={{ width: "100%", maxWidth: "100%" }}
                    className="!w-full trending-prompts-slide"
                  >
                    <div
                      className="w-full max-w-full overflow-hidden"
                      style={{ width: "100%", maxWidth: "100%" }}
                    >
                      <Card
                        className="group gap-1 bg-[#F4F0FF] shadow-lg hover:shadow-xl p-4 rounded-xl transition-all duration-300"
                        style={{ width: "100%", maxWidth: "100%" }}
                      >
                        <CardHeader>
                          {/* Top Bar with Logo and Tags */}
                          <div className="flex justify-between items-start">
                            <div className="flex justify-center items-center p-1 rounded w-8 h-8">
                              <Image
                                src="/images/ai-tools/gpt.png"
                                alt="gpt"
                                width={26}
                                height={26}
                                className="object-contain"
                              />
                            </div>
                            <div className="flex gap-2">
                              {isPromptNew(prompt.createdAt) && (
                                <Badge className="bg-red-500 px-2 py-1 rounded-full text-white text-xs">
                                  New
                                </Badge>
                              )}
                              {prompt.subType === 2 && (
                                <Badge className="flex items-center gap-1 bg-trending-gradient px-2 py-1 rounded-full text-[#6D6D6D] text-xs">
                                  <Image
                                    src="/icons/ui/star-gray.svg"
                                    alt="star"
                                    width={16}
                                    height={16}
                                  />
                                  Premium
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="gap-4 grid p-0">
                          <div className="bg-white p-4 rounded-lg">
                            {/* Title */}
                            <CardTitle className="mb-12 font-bold text-black text-lg line-clamp-3 leading-tight">
                              {prompt.title}
                            </CardTitle>
                            <div className="text-gray-500 text-sm line-clamp-5 leading-tight">
                              {prompt.shortDescription}
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="font-bold text-gray-500 text-sm text-center line-clamp-3 leading-tight">
                              {prompt.category?.name}
                            </p>
                          </div>

                          {/* View Prom Button */}
                          <Button
                            onClick={e => handlePromptClick(prompt, e)}
                            className="bg-[#DACDFF] hover:bg-[#5700C6] py-2 rounded-full w-full font-medium text-[#5700C6] hover:text-white"
                          >
                            Xem Prompt
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {latestPrompts.map(prompt => (
                <Card
                  key={prompt.id}
                  className="group gap-1 bg-[#F4F0FF] shadow-lg hover:shadow-xl p-4 rounded-xl transition-all duration-300"
                >
                  <CardHeader>
                    {/* Top Bar with Logo and Tags */}
                    <div className="flex justify-between items-start">
                      <div className="flex justify-center items-center p-1 rounded w-8 h-8">
                        <Image
                          src="/images/ai-tools/gpt.png"
                          alt="gpt"
                          width={26}
                          height={26}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex gap-2">
                        {isPromptNew(prompt.createdAt) && (
                          <Badge className="bg-red-500 px-2 py-1 rounded-full text-white text-xs">
                            New
                          </Badge>
                        )}
                        {prompt.subType === 2 && (
                          <Badge className="flex items-center gap-1 bg-trending-gradient px-2 py-1 rounded-full text-[#6D6D6D] text-xs">
                            <Image
                              src="/icons/ui/star-gray.svg"
                              alt="star"
                              width={16}
                              height={16}
                            />
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="gap-4 grid p-0">
                    <div className="gap-4 bg-white p-4 rounded-lg">
                      {/* Title */}
                      <CardTitle className="mb-12 h-20 font-bold text-black text-lg line-clamp-3 leading-tight">
                        {prompt.title}
                      </CardTitle>
                      <div className="text-gray-500 text-sm line-clamp-5 leading-tight">
                        {prompt.shortDescription}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-bold text-gray-500 text-sm text-center line-clamp-3 leading-tight">
                        {prompt.category?.name}
                      </p>
                    </div>
                    {/* View Prom Button */}
                    <Button
                      onClick={e => handlePromptClick(prompt, e)}
                      className="bg-[#DACDFF] hover:bg-[#5700C6] py-2 rounded-full w-full font-medium text-[#5700C6] hover:text-white"
                    >
                      Xem Prompt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="text-center">
        <Link href={ROUTES_URL.PROMPT_LIBRARY}>
          <span className="inline-flex items-center gap-2 bg-[#F4F0FF] p-4 rounded-full font-medium text-purple-500 hover:text-purple-400 text-xl transition-colors cursor-pointer">
            Tìm Hiểu Thêm
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </div>
  );
};
