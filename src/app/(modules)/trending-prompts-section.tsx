import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Prompt } from "@/types";
import Image from "next/image";

interface TrendingPromptsSectionProps {
  newestPrompts: Prompt[];
}

// Mock data for the trending prompts
const trendingPromptsData = [
  {
    id: 1,
    title: "Build Predictive test Promy Analytics for Sales",
    description: "Chat GPT",
    image: "/images/ai-tools/gpt.png",
    tags: ["New", "Premium"],
    content: "3 MULTI-STEP PROMPTS FOR YOUR BUSINESS",
    isPremium: true,
  },
  {
    id: 2,
    title: "Build Predictive test Promy Analytics for Sales",
    description: "Chat GPT",
    image: "/images/ai-tools/gpt.png",
    tags: ["New", "Premium"],
    content: "Space exploration and alien world discovery prompts",
    isPremium: true,
  },
  {
    id: 3,
    title: "Build Predictive test Promy Analytics for Sales",
    description: "Chat GPT",
    image: "/images/ai-tools/gpt.png",
    tags: ["New", "Premium"],
    content: "Social media engagement and digital marketing strategies",
    isPremium: true,
  },
  {
    id: 4,
    title: "Build Predictive test Promy Analytics for Sales",
    description: "Chat GPT",
    image: "/images/ai-tools/gpt.png",
    tags: ["New", "Premium"],
    content: "Data analysis and business intelligence automation",
    isPremium: true,
  },
];

export const TrendingPromptsSection = ({}: TrendingPromptsSectionProps) => {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto container">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl md:text-5xl lg:text-6xl leading-[56px]">
            <span className="text-[#5700C6]">+10 Xu hướng</span>{" "}
            <span className="text-[#1D1E25]">
              Prompts nổi bật giúp ích cho cuộc sống của bạn
            </span>
          </h2>
        </div>

        {/* Cards Section */}
        <div className="mb-16">
          <div className="mx-auto max-w-7xl">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {trendingPromptsData.map(prompt => (
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
                        />
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-red-500 px-2 py-1 rounded-full text-white text-xs">
                          New
                        </Badge>
                        <Badge className="flex items-center gap-1 bg-trending-gradient px-2 py-1 rounded-full text-[#6D6D6D] text-xs">
                          <Image
                            src="/icons/ui/star-gray.svg"
                            alt="star"
                            width={16}
                            height={16}
                          />
                          Premium
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="gap-4 grid p-0">
                    <div className="bg-white p-4 rounded-lg">
                      {" "}
                      {/* Description */}
                      <p className="mb-2 text-gray-500 text-base">
                        {prompt.description}
                      </p>
                      {/* Title */}
                      <CardTitle className="font-bold text-black text-lg leading-tight">
                        {prompt.title}
                      </CardTitle>
                      {/* Image/Content Area */}
                      <div className="mb-6">
                        <Image
                          src="/images/sample.png"
                          alt="gpt"
                          width={282}
                          height={154}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* View Prom Button */}
                    <Button className="bg-[#DACDFF] hover:bg-[#DACDFF] py-2 rounded-full w-full font-medium text-[#5700C6] hover:text-[#5700C6]">
                      View Prom
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA Section */}
        <div className="text-center">
          <Link href="/thu-vien-prompt">
            <span className="inline-flex items-center gap-2 font-medium text-purple-500 hover:text-purple-400 text-xl transition-colors cursor-pointer">
              Tìm Hiểu Thêm
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
