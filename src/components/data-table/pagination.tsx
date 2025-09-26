import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  loading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  className,
  // showPrevNext = true,
  // maxVisiblePages = 5,
  loading = false,
}: PaginationProps) => {
  // Page size options
  const pageSizeOptions = [5, 10, 20, 50, 100];

  // If no page size selector and only 1 page, don't show pagination
  if (totalPages <= 1 && !onPageSizeChange) return null;

  // const getVisiblePages = () => {
  //   const pages: (number | string)[] = [];
  //   const half = Math.floor(maxVisiblePages / 2);

  //   let start = Math.max(1, currentPage - half);
  //   let end = Math.min(totalPages, currentPage + half);

  //   // Adjust if we're near the beginning or end
  //   if (end - start + 1 < maxVisiblePages) {
  //     if (start === 1) {
  //       end = Math.min(totalPages, start + maxVisiblePages - 1);
  //     } else {
  //       start = Math.max(1, end - maxVisiblePages + 1);
  //     }
  //   }

  //   // Add first page and ellipsis if needed
  //   if (start > 1) {
  //     pages.push(1);
  //     if (start > 2) {
  //       pages.push("...");
  //     }
  //   }

  //   // Add visible pages
  //   for (let i = start; i <= end; i++) {
  //     pages.push(i);
  //   }

  //   // Add ellipsis and last page if needed
  //   if (end < totalPages) {
  //     if (end < totalPages - 1) {
  //       pages.push("...");
  //     }
  //     pages.push(totalPages);
  //   }

  //   return pages;
  // };

  // const visiblePages = getVisiblePages();

  // Calculate display info
  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;
  const displayInfo = totalItems
    ? `${startItem}–${endItem} của ${totalItems}`
    : "";

  return (
    <div className={className}>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col space-y-4">
        {onPageSizeChange ? (
          // Show page size selector when available
          <div className="flex flex-col items-center space-y-2">
            {totalPages > 1 && (
              <div className="flex justify-center items-center font-semibold text-gray-700 dark:text-gray-200 text-sm">
                Trang {currentPage} của {totalPages}
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 text-xs">
                Hiển thị:
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={value => onPageSizeChange(Number(value))}
                disabled={loading}
              >
                <SelectTrigger className="w-16 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map(size => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-gray-600 dark:text-gray-300 text-xs">
                mục
              </span>
            </div>
          </div>
        ) : (
          // Show page info when no page size selector
          <div className="flex justify-center items-center font-semibold text-gray-700 dark:text-gray-200 text-sm">
            {totalPages > 0 ? (
              <>
                Trang {currentPage} của {totalPages}
              </>
            ) : (
              "Không có trang"
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-9 h-9 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || loading}
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-9 h-9 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-9 h-9 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || loading}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-9 h-9 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || loading}
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-gray-600 dark:text-gray-300 text-base">
            {displayInfo && (
              <span className="flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {displayInfo}
              </span>
            )}
          </div>

          {onPageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Hiển thị:
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={value => onPageSizeChange(Number(value))}
                disabled={loading}
              >
                <SelectTrigger className="w-20 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map(size => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                mục
              </span>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex justify-center items-center w-[120px] font-medium text-gray-700 dark:text-gray-200 text-base">
              Trang {currentPage} của {totalPages}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden lg:flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-10 h-10 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1 || loading}
              >
                <ChevronsLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-10 h-10 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-10 h-10 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || loading}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="hidden lg:flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-0 border-gray-200 dark:border-gray-600 rounded-lg w-10 h-10 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages || loading}
              >
                <ChevronsRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
