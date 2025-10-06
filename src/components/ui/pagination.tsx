"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  showSizeChanger?: boolean;
  size?: "small" | "default";
  responsive?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  size = "default",
}: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages - 2, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 1) {
      rangeWithDots.push(0, "...");
    } else {
      rangeWithDots.push(0);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 2) {
      rangeWithDots.push("...", totalPages - 1);
    } else {
      rangeWithDots.push(totalPages - 1);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous Button */}
      <Button
        variant="outline"
        size={size === "small" ? "sm" : "default"}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        className="flex items-center gap-2 w-8 h-8"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Button
              key={pageNumber}
              variant={isActive ? "default" : "outline"}
              size={size === "small" ? "sm" : "default"}
              onClick={() => onPageChange(pageNumber)}
              className={`min-w-8 h-8 rounded-full ${
                isActive
                  ? "bg-purple-700 text-white hover:bg-purple-600"
                  : "hover:bg-purple-50"
              }`}
            >
              {pageNumber + 1}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size={size === "small" ? "sm" : "default"}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex items-center gap-2 w-8 h-8"
      >
        <ChevronRight className="w- h-4" />
      </Button>
    </div>
  );
};
