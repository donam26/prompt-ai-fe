"use client";

import { Prompt } from "@/types";
import Link from "next/link";
import { getPromptDetailUrl } from "@/constants/routes-url";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePromptFavorites } from "@/hooks";
import { showToast } from "@/components/ui/toast";

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

interface PromptCardProps {
  prompt: Prompt;
  favoriteList?: string[];
  favoriteIdsMap?: { [promptId: string]: string };
  navigationState?: NavigationState;
}

export const PromptCard = ({
  prompt,
  favoriteList = [],
  favoriteIdsMap = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigationState: _navigationState,
}: PromptCardProps) => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite } = usePromptFavorites();
  const [isFavorited, setIsFavorited] = useState(
    favoriteList.includes(String(prompt.id))
  );
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

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

  const detailUrl = getPromptDetailUrl(prompt.id);

  return (
    <Link
      href={detailUrl}
      className="block no-underline hover:scale-105 transition-transform"
    >
      <div className="relative flex flex-col bg-white shadow-md hover:shadow-xl rounded-xl h-full overflow-hidden transition-shadow">
        {/* Image Section */}
        <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 w-full h-48">
          {prompt.imageCard || prompt.image ? (
            <Image
              src={prompt.imageCard || prompt.image || ""}
              alt={prompt.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <span className="text-purple-300 text-4xl">🤖</span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
            className="top-3 right-3 absolute bg-white hover:bg-gray-100 disabled:opacity-50 p-2 rounded-full transition-colors"
            aria-label={isFavorited ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="mb-2 font-semibold text-gray-900 text-lg line-clamp-2">
            {prompt.title}
          </h3>

          {prompt.shortDescription && (
            <p className="flex-1 mb-3 text-gray-600 text-sm line-clamp-2">
              {prompt.shortDescription}
            </p>
          )}

          {/* Footer Info */}
          <div className="flex justify-between items-center mt-auto pt-3 border-gray-100 border-t">
            <div className="flex items-center gap-2">
              {prompt.category?.name && (
                <span className="bg-purple-100 px-2 py-1 rounded-full text-purple-700 text-xs">
                  {prompt.category.name}
                </span>
              )}
              {prompt.subType === 2 && (
                <span className="bg-yellow-100 px-2 py-1 rounded-full text-yellow-700 text-xs">
                  Premium
                </span>
              )}
            </div>
            {prompt.sumView !== undefined && (
              <span className="text-gray-500 text-xs">
                {prompt.sumView} lượt xem
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
