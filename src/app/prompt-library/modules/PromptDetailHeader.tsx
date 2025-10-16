"use client";

import { Prompt } from "@/types";
import Image from "next/image";
import { Heart, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePromptFavorites } from "@/hooks";
import { showToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PromptDetailHeaderProps {
  prompt: Prompt;
  favoriteList?: string[];
  favoriteIdsMap?: { [promptId: string]: string };
}

export const PromptDetailHeader = ({
  prompt,
  favoriteList = [],
  favoriteIdsMap = {},
}: PromptDetailHeaderProps) => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite } = usePromptFavorites();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(
    favoriteList.includes(String(prompt.id))
  );
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const handleToggleFavorite = async () => {
    if (!user) {
      showToast.error("Vui lòng đăng nhập để thêm vào yêu thích");
      return;
    }

    if (isTogglingFavorite) return;

    try {
      setIsTogglingFavorite(true);

      if (isFavorited) {
        const favoriteId = favoriteIdsMap[String(prompt.id)];
        if (favoriteId) {
          const success = await removeFavorite(favoriteId);
          if (success) {
            setIsFavorited(false);
          }
        }
      } else {
        const success = await addFavorite({
          promptId: String(prompt.id),
          userId: String(user.id),
        });
        if (success) {
          setIsFavorited(true);
        }
      }

      // Dispatch event to refresh favorite list
      window.dispatchEvent(new Event("favoriteChanged"));
    } catch (error) {
      console.error("Error toggling favorite:", error);
      showToast.error("Có lỗi xảy ra khi cập nhật yêu thích");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

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

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleGoBack}
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Quay lại
      </Button>

      <div className="flex lg:flex-row flex-col gap-6">
        {/* Left side - Logo and badges */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-4 mb-4">
            {/* Logo */}
            <div className="flex justify-center items-center bg-white shadow-sm rounded-lg w-16 h-16">
              {isMidjourney ? (
                <span className="text-purple-600 text-3xl">🎨</span>
              ) : (
                <Image
                  src="/images/ai-tools/gpt.png"
                  alt="ChatGPT"
                  width={64}
                  height={64}
                />
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-col gap-2">
              {/* Premium/Free badge */}
              <span
                className={`px-3 py-1 font-semibold text-sm flex items-center gap-1 w-fit ${
                  prompt.isType
                    ? "bg-gradient-to-b from-gray-300 to-gray-400 text-gray-700 rounded-full shadow-sm"
                    : "bg-green-500 text-white rounded-full"
                }`}
              >
                {prompt.isType && <Star className="fill-current w-3 h-3" />}
                {prompt.isType ? "Premium" : "Free"}
              </span>

              {isNew && (
                <span className="bg-red-500 px-3 py-1 rounded-full w-fit font-semibold text-white text-sm">
                  New
                </span>
              )}
            </div>
          </div>

          {/* Favorite button */}
          <Button
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
            variant="outline"
            className="w-full lg:w-auto"
          >
            <Heart
              className={`w-4 h-4 mr-2 transition-all duration-200 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
            {isFavorited ? "Đã yêu thích" : "Thêm vào yêu thích"}
          </Button>
        </div>

        {/* Right side - Content */}
        <div className="flex-1">
          {/* Section name */}
          <p className="mb-2 text-gray-500 text-sm">
            {isMidjourney ? "Midjourney" : "ChatGPT"}
          </p>

          {/* Title */}
          <h1 className="mb-4 font-bold text-gray-900 text-3xl">
            {prompt.title}
          </h1>

          {/* Description */}
          <p className="mb-4 text-gray-700 text-lg leading-relaxed">
            {prompt.shortDescription || prompt.description}
          </p>

          {/* Category tag */}
          {prompt.category?.name && (
            <div className="inline-flex items-center bg-white px-4 py-2 border-2 border-purple-200 rounded-lg">
              <span className="font-semibold text-gray-900">
                {prompt.category.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
