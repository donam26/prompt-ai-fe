"use client";

import { Prompt } from "@/types";
import Link from "next/link";
import { getMidjourneyPromptDetailUrl } from "@/constants/routes-url";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { promptService } from "@/services";
import { toast } from "sonner";

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

interface MidjourneyPromptCardProps {
  prompt: Prompt;
  favoriteList?: string[];
  navigationState?: NavigationState;
}

export const MidjourneyPromptCard = ({
  prompt,
  favoriteList = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigationState: _navigationState,
}: MidjourneyPromptCardProps) => {
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

  const detailUrl = getMidjourneyPromptDetailUrl(prompt.id);

  return (
    <Link
      href={detailUrl}
      className="block no-underline hover:scale-105 transition-transform"
    >
      <div className="relative flex flex-col bg-white shadow-md hover:shadow-xl rounded-xl h-full overflow-hidden transition-shadow">
        {/* Image Section - Larger for Midjourney */}
        <div className="relative bg-gradient-to-br from-indigo-100 to-purple-200 w-full h-64">
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
              <span className="text-purple-300 text-5xl">🎨</span>
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

          {/* Midjourney Badge */}
          <div className="bottom-3 left-3 absolute bg-indigo-600 px-3 py-1 rounded-full">
            <span className="font-semibold text-white text-xs">Midjourney</span>
          </div>
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
                <span className="bg-indigo-100 px-2 py-1 rounded-full text-indigo-700 text-xs">
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
