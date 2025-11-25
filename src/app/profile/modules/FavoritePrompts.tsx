"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFavoritePrompts } from "@/hooks/user/useFavoritePrompts";
import { PromptCardV2 } from "@/app/prompt-library/[...slug]/modules";

interface FavoritePromptsProps {
  user: any;
}

export default function FavoritePrompts({ user }: FavoritePromptsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 12;

  const {
    favoritePrompts,
    favoriteIdsMap,
    favoritePromptsWithPagination,
    isFetching,
    removeFavoritePrompt,
  } = useFavoritePrompts({
    userId: user.id,
    pagination: {
      pageIndex: currentPage,
      pageSize: pageSize,
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPromptCards = () => {
    if (isFetching) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
            <p className="text-gray-500">Đang tải...</p>
          </div>
        </div>
      );
    }

    if (favoritePrompts.length === 0) {
      return (
        <div className="py-20 text-center">
          <Heart className="mx-auto mb-4 w-16 h-16 text-gray-300" />
          <h3 className="mb-2 font-semibold text-gray-900 text-lg">
            {searchTerm
              ? "Không tìm thấy prompt nào"
              : "Bạn chưa có Prompt yêu thích nào!"}
          </h3>
          <p className="mb-4 text-gray-500">
            {searchTerm
              ? "Hãy thử tìm kiếm với từ khóa khác"
              : "Hãy khám phá và thêm các prompt yêu thích của bạn."}
          </p>
          {!searchTerm && (
            <Button onClick={() => (window.location.href = "/prompt-library")}>
              Khám phá Prompts
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 w-full min-w-0">
        {favoritePrompts.map(prompt => (
          <div key={prompt.id} className="relative w-full min-w-0">
            <PromptCardV2
              prompt={prompt}
              favoriteList={favoritePrompts.map(p => String(p.id))}
              favoriteIdsMap={favoriteIdsMap}
              onFavoriteChange={() => removeFavoritePrompt(String(prompt.id))}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      <div className="w-full min-w-0">
        <h1 className="mb-2 font-bold text-2xl">Prompt yêu thích</h1>
        <p className="text-gray-600 break-words">
          Xem các Prompts yêu thích của bạn theo danh mục dưới đây!
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md min-w-0">
        <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
        <Input
          placeholder="Tìm kiếm prompt yêu thích..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-10 w-full min-w-0"
        />
      </div>

      {/* Stats */}
      {!isFetching && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600 text-sm min-w-0">
            <span className="whitespace-nowrap">
              Tổng cộng:{" "}
              <strong>
                {favoritePromptsWithPagination?.total || favoritePrompts.length}
              </strong>{" "}
              prompt
            </span>
            {searchTerm && (
              <span className="whitespace-nowrap">
                Kết quả:{" "}
                <strong>
                  {favoritePromptsWithPagination?.total ||
                    favoritePrompts.length}
                </strong>{" "}
                prompt
              </span>
            )}
          </div>

          {/* Pagination Info */}
          {favoritePromptsWithPagination &&
            favoritePromptsWithPagination.totalPages > 1 && (
              <div className="text-gray-600 text-sm whitespace-nowrap">
                Trang {currentPage + 1} /{" "}
                {favoritePromptsWithPagination.totalPages}
              </div>
            )}
        </div>
      )}

      {/* Prompt Cards */}
      <div className="w-full min-w-0">{renderPromptCards()}</div>

      {/* Pagination Controls */}
      {favoritePromptsWithPagination &&
        favoritePromptsWithPagination.totalPages > 1 &&
        !searchTerm && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8 w-full min-w-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0 || isFetching}
              className="flex items-center space-x-1 flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </Button>

            <div className="flex flex-wrap items-center gap-1 min-w-0">
              {Array.from(
                { length: favoritePromptsWithPagination.totalPages },
                (_, i) => i
              ).map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  disabled={isFetching}
                  className="p-0 w-8 h-8 flex-shrink-0"
                >
                  {page + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage >= favoritePromptsWithPagination.totalPages - 1 ||
                isFetching
              }
              className="flex items-center space-x-1 flex-shrink-0"
            >
              <span>Sau</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
    </div>
  );
}
