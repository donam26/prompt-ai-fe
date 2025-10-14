"use client";

import { Category } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

// Constants
const PREMIUM_BACKGROUND_IMAGE = "/images/backgrounds/bg-over-black.png";

interface CategoryCardProps {
  category: Category;
  link: string;
  isPremium?: boolean;
}

export const CategoryCard = ({
  category,
  link,
  isPremium = false,
}: CategoryCardProps) => {
  const isComingSoonStatus = category.isComingSoon === true;

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl p-4 w-full h-28 sm:h-[250px] rounded-3xl ${
        isComingSoonStatus ? "opacity-60" : ""
      } ${
        isPremium
          ? "bg-cover bg-center bg-no-repeat"
          : "bg-gradient-to-r from-purple-50 to-purple-200"
      }`}
      style={
        isPremium
          ? {
              backgroundImage: `url('${PREMIUM_BACKGROUND_IMAGE}')`,
            }
          : undefined
      }
    >
      <Link
        href={isComingSoonStatus ? "#" : link}
        className={`flex flex-col h-full text-decoration-none ${
          isPremium ? "text-white" : "text-gray-900"
        }`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-auto">
          <h2
            className={`m-0 font-bold text-lg sm:text-3xl leading-tight sm:leading-11 ${
              isPremium ? "text-white" : "text-gray-900"
            }`}
          >
            {category.name}
          </h2>
          <div className="flex shrink-0">
            <ChevronRight
              className={`w-4 h-4 sm:w-6 sm:h-6 ${
                isPremium ? "text-white" : "text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="relative flex justify-start items-end mt-0 w-full">
          <div className="flex items-center gap-1 font-normal text-base leading-6">
            <span
              className={`${isPremium ? "text-gray-200" : "text-gray-900"}`}
            >
              {isComingSoonStatus ? "Coming Soon" : ""}
            </span>
          </div>
        </div>
      </Link>

      {/* Category Image */}
      <div className="right-[5%] -bottom-2 sm:-bottom-10 z-10 absolute w-16 sm:w-40 h-16 sm:h-40">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            width={160}
            height={160}
            className="w-full h-full object-contain"
            loading="lazy"
            sizes="(max-width: 640px) 64px, 160px"
          />
        ) : (
          <div className="flex justify-center items-center bg-gray-100 rounded-lg w-full h-full">
            <span className="text-gray-400 text-xs sm:text-sm">No Image</span>
          </div>
        )}
      </div>
    </div>
  );
};
