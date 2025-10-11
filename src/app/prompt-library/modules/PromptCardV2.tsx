"use client";

import { Prompt } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { promptService } from "@/services";
import { toast } from "sonner";
import { getPromptDetailUrl } from "@/constants/routes-url";

interface NavigationState {
  currentPage: number;
  searchText: string;
  topicId?: string | number | null;
  isType: number | string;
  pageSize: number;
  category?: {
    id: number | string;
    name: string;
  };
  activeSection?: {
    name: string;
  };
  fromNewest?: boolean;
}

interface PromptCardV2Props {
  prompt: Prompt;
  favoriteList?: string[];
  navigationState?: NavigationState;
}

export const PromptCardV2 = ({
  prompt,
  favoriteList = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigationState: _navigationState,
}: PromptCardV2Props) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(
    favoriteList.includes(String(prompt.id))
  );
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm vào yêu thích");
      return;
    }

    if (isTogglingFavorite) return;

    try {
      setIsTogglingFavorite(true);

      if (isFavorited) {
        await promptService.removeFavoritePrompt(String(prompt.id));
        setIsFavorited(false);
        toast.success("Đã xóa khỏi danh sách yêu thích");
      } else {
        await promptService.addFavoritePrompt({
          promptId: String(prompt.id),
          userId: String(user.id),
        });
        setIsFavorited(true);
        toast.success("Đã thêm vào danh sách yêu thích");
      }

      // Dispatch event to refresh favorite list
      window.dispatchEvent(new Event("favoriteChanged"));
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Có lỗi xảy ra khi cập nhật yêu thích");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const detailUrl = getPromptDetailUrl(prompt.id);

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

  return (
    <Link href={detailUrl} className="block h-full no-underline">
      <div className="relative flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg p-4 rounded-2xl h-full transition-shadow">
        {/* Header with logo and badges */}
        <div className="flex justify-between items-center mb-3">
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
          <div className="flex gap-2">
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
              aria-label={isFavorited ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
            >
              <Heart
                className={`w-6 h-6 transition-all duration-200 ${
                  isFavorited
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 group-hover:text-red-500 group-hover:fill-red-500"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 bg-white mb-3 p-4 rounded-xl">
          {/* Section name */}
          <p className="mb-2 text-gray-500 text-sm">{sectionName}</p>

          {/* Title */}
          <h3 className="mb-3 font-bold text-gray-900 text-lg line-clamp-2">
            {prompt.title}
          </h3>

          {/* Description */}
          <p className="flex-1 mb-4 text-gray-700 text-sm line-clamp-3">
            {prompt.shortDescription || prompt.content}
          </p>

          {/* Category tag */}
          {prompt.category?.name && (
            <div className="items-center bg-white mt-auto px-3 py-2 border-2 border-purple-200 hover:border-purple-400 rounded-lg text-center transition-colors duration-200">
              <span className="font-semibold text-gray-900 text-sm">
                {prompt.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          onClick={e => {
            e.preventDefault();
            window.location.href = detailUrl;
          }}
          className="bg-[#DACDFFE5] hover:bg-primary mt-auto px-4 py-3 rounded-full w-full font-semibold text-purple-700 hover:text-white transition-colors"
        >
          View Prom
        </button>
      </div>
    </Link>
  );
};
