"use client";

import { Prompt } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePromptFavorites } from "@/hooks";
import { getPromptDetailUrl, ROUTES_URL } from "@/constants/routes-url";
import { showToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface PromptCardV2Props {
  prompt: Prompt;
  favoriteList?: string[];
  favoriteIdsMap?: { [promptId: string]: string };
  onPromptClick?: (promptId: string | number, prompt?: Prompt) => void;
  onFavoriteChange?: () => void;
}

export const PromptCardV2 = ({
  prompt,
  favoriteList = [],
  favoriteIdsMap = {},
  onPromptClick,
  onFavoriteChange,
}: PromptCardV2Props) => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite } = usePromptFavorites();
  const [isFavorite, setIsFavorite] = useState(
    favoriteList.includes(String(prompt.id))
  );
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const router = useRouter();

  // Check if user has Free subscription
  const isFreeUser =
    user?.userSub?.subscription?.nameSub === "Free" ||
    !user?.userSub?.subscription?.nameSub;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      showToast.error("Vui lòng đăng nhập để thêm vào yêu thích");
      return;
    }

    if (isTogglingFavorite) return;

    try {
      setIsTogglingFavorite(true);

      if (isFavorite) {
        const favoriteId = favoriteIdsMap[String(prompt.id)];
        if (favoriteId) {
          const success = await removeFavorite(favoriteId);
          if (success) {
            setIsFavorite(false);
          }
        }
      } else {
        const success = await addFavorite({
          promptId: String(prompt.id),
          userId: String(user.id),
        });
        if (success) {
          setIsFavorite(true);
        }
      }

      // Call parent callback to refresh favorite list
      onFavoriteChange?.();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      showToast.error("Có lỗi xảy ra khi cập nhật yêu thích");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const detailUrl = getPromptDetailUrl(prompt.id);

  const hasOptimizationGuide = Boolean(
    typeof prompt.optimizationGuide === "string" &&
      prompt.optimizationGuide.trim().length > 0
  );

  // Check if prompt is new (created within last 7 days)
  const isNew = (() => {
    const createdAt = new Date(prompt.createdAt || "");
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  })();

  // Determine section type
  const isMidjourney = prompt.category?.section?.name === "Midjourney";
  const sectionName = isMidjourney ? "Midjourney" : "Chat GPT";

  const handleCardClick = (e: React.MouseEvent) => {
    if (!hasOptimizationGuide) {
      e.preventDefault();
      return;
    }

    // Check if prompt is premium and user is Free
    if (prompt.subType === 2 && isFreeUser) {
      e.preventDefault();
      showToast.error("Bạn cần nâng cấp gói Premium để xem prompt này");
      setTimeout(() => {
        router.push(ROUTES_URL.PRICING);
      }, 500);
      return;
    }

    // Call parent callback if provided
    if (onPromptClick) {
      e.preventDefault();
      onPromptClick(prompt.id, prompt);
    }
  };

  return (
    <Link
      href={detailUrl}
      onClick={handleCardClick}
      className="flex justify-center h-full no-underline"
    >
      <div className="relative flex flex-col gap-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg p-4 rounded-2xl max-w-[320px] h-full transition-all hover:-translate-y-2 duration-300 ease-in-out">
        {/* Header with logo and badges */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-white shadow-sm rounded-lg w-8 h-8">
              {isMidjourney ? (
                <span className="text-purple-600 text-lg">🎨</span>
              ) : (
                <Image
                  src="/images/ai-tools/gpt.png"
                  alt="ChatGPT"
                  width={32}
                  height={32}
                />
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            {/* Premium/Free badge */}
            <span
              className={`px-3 py-1 font-semibold text-xs flex items-center gap-1 ${
                prompt.subType === 2
                  ? "bg-gradient-to-b from-gray-300 to-gray-400 text-gray-700 rounded-full shadow-sm"
                  : "bg-green-500 text-white rounded-full"
              }`}
            >
              {prompt.subType === 2 && (
                <Star className="fill-current w-3 h-3" />
              )}
              {prompt.subType === 2 ? "Premium" : "Free"}
            </span>
            {isNew && (
              <span className="bg-red-500 px-2 py-1 rounded-full font-semibold text-white text-xs">
                New
              </span>
            )}
            {/* Favorite button */}
            <button
              onClick={handleToggleFavorite}
              disabled={isTogglingFavorite}
              className="group bg-white hover:bg-gray-50 disabled:opacity-50 shadow-sm p-2 rounded-full transition-colors"
              aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
            >
              <Heart
                className={`w-6 h-6 transition-all duration-200 ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 group-hover:text-red-500 group-hover:fill-red-500"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 bg-white p-4 rounded-xl">
          {/* Section name */}
          <p className="mb-2 text-gray-500 text-sm">{sectionName}</p>

          {/* Title */}
          <h3 className="mb-3 font-bold text-gray-900 text-lg line-clamp-5">
            {prompt.title}
          </h3>

          {/* Description */}
          <p className="flex-1 max-h-[6rem] overflow-y-auto text-gray-700 text-sm">
            {prompt.shortDescription || prompt.content}
          </p>
        </div>

        {/* Category tag */}
        {prompt.category?.name && (
          <div className="items-center bg-white mt-auto px-3 py-2 border-2 border-purple-200 hover:border-purple-400 rounded-lg text-center transition-colors duration-200">
            <span className="font-semibold text-gray-900 text-sm">
              {prompt.category.name}
            </span>
          </div>
        )}

        {/* Action button */}
        <button
          disabled={!hasOptimizationGuide}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();

            if (!hasOptimizationGuide) {
              return;
            }

            // Check if prompt is premium and user is Free
            if (prompt.subType === 2 && isFreeUser) {
              e.preventDefault();
              showToast.error("Bạn cần nâng cấp gói Premium để xem prompt này");
              setTimeout(() => {
                router.push(ROUTES_URL.PRICING);
              }, 500);
              return;
            }

            // Call parent callback if provided, otherwise use default navigation
            if (onPromptClick) {
              onPromptClick(prompt.id, prompt);
            } else {
              router.push(
                `${ROUTES_URL.PROMPT_LIBRARY}/${prompt.id}?tab=my-prompt`
              );
            }
          }}
          className={`bg-[#DACDFFE5] mt-auto px-4 py-3 rounded-full w-full font-semibold text-purple-700 transition-colors ${
            hasOptimizationGuide
              ? "hover:bg-primary hover:text-white"
              : "opacity-60 cursor-not-allowed"
          }`}
        >
          Xem Prompt
        </button>
      </div>
    </Link>
  );
};
