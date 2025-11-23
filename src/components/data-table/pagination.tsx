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
import { cn } from "@/lib/utils";

export interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems?: number;
  readonly pageSize?: number;
  readonly onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  readonly onPageChange?: (page: number) => void;
  readonly onPageSizeChange?: (pageSize: number) => void;
  readonly className?: string;
  readonly showPrevNext?: boolean;
  readonly maxVisiblePages?: number;
  readonly loading?: boolean;
  readonly compact?: boolean;
  readonly showPageSizeSelector?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  onPaginationChange,
  onPageChange,
  onPageSizeChange,
  className,
  showPrevNext = true,
  maxVisiblePages = 5,
  loading = false,
  compact = false,
  showPageSizeSelector = true,
}: PaginationProps) => {
  // Page size options
  const pageSizeOptions = [5, 10, 20, 50, 100];

  // If only 1 page and no page size selector, don't show pagination
  if (totalPages <= 1 && !onPageSizeChange && !onPaginationChange) return null;

  const getVisiblePages = (): (number | string)[] => {
    if (compact) {
      return [currentPage];
    }

    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Adjust if we're near the beginning or end
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  // Calculate display info
  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;
  const displayInfo = totalItems
    ? `${startItem}–${endItem} của ${totalItems}`
    : "";

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !loading) {
      if (onPaginationChange) {
        onPaginationChange({ pageIndex: page - 1, pageSize });
      } else if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  const handlePageSizeChange = (newPageSize: number): void => {
    if (newPageSize !== pageSize && !loading) {
      if (onPaginationChange) {
        onPaginationChange({ pageIndex: 0, pageSize: newPageSize });
      } else if (onPageSizeChange) {
        onPageSizeChange(newPageSize);
      }
    }
  };

  return (
    <div className={cn("pagination-container w-full min-w-0 px-2 sm:px-0", className)}>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col space-y-4 w-full min-w-0">
        {showPageSizeSelector && (onPageSizeChange || onPaginationChange) ? (
          // Show page size selector when available
          <div className="flex flex-col items-center space-y-2 w-full min-w-0">
            {totalPages > 1 && (
              <div className="flex justify-center items-center font-medium text-gray-700 dark:text-gray-200 text-sm whitespace-nowrap px-2">
                Trang {currentPage} của {totalPages}
              </div>
            )}

            <div className="flex items-center gap-2 flex-wrap justify-center px-2">
              <span className="text-gray-600 dark:text-gray-300 text-xs whitespace-nowrap">
                Hiển thị:
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={value => handlePageSizeChange(Number(value))}
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
              <span className="text-gray-600 dark:text-gray-300 text-xs whitespace-nowrap">
                mục
              </span>
            </div>
          </div>
        ) : (
          // Show page info when no page size selector
          <div className="flex justify-center items-center font-medium text-gray-700 dark:text-gray-200 text-sm whitespace-nowrap px-2">
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
          <div className="flex justify-center items-center space-x-2 w-full min-w-0 px-2">
            {showPrevNext && (
              <Button
                variant="outline"
                className="p-0 w-8 h-8 flex-shrink-0"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1 || loading}
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="outline"
              className="p-0 w-8 h-8 flex-shrink-0"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="p-0 w-8 h-8 flex-shrink-0"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || loading}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            {showPrevNext && (
              <Button
                variant="outline"
                className="p-0 w-8 h-8 flex-shrink-0"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages || loading}
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-between items-center">
        <div className="flex items-center gap-4">
          {displayInfo && (
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {displayInfo}
              </span>
            </div>
          )}

          {showPageSizeSelector && (onPageSizeChange || onPaginationChange) && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Hiển thị:
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={value => handlePageSizeChange(Number(value))}
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
          <div className="flex items-center space-x-4">
            <div className="flex justify-center items-center min-w-[120px] font-medium text-gray-700 dark:text-gray-200 text-sm">
              Trang {currentPage} của {totalPages}
            </div>

            <div className="flex items-center space-x-1">
              {showPrevNext && (
                <Button
                  variant="outline"
                  className="p-0 w-8 h-8"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1 || loading}
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="outline"
                className="p-0 w-8 h-8"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Page numbers */}
              {!compact && (
                <div className="flex items-center space-x-1">
                  {visiblePages.map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-2 py-1 text-gray-500 text-sm">
                          ...
                        </span>
                      ) : (
                        <Button
                          variant={page === currentPage ? "default" : "outline"}
                          className="p-0 w-8 h-8 text-sm"
                          onClick={() => handlePageChange(page as number)}
                          disabled={loading}
                        >
                          {page}
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                className="p-0 w-8 h-8"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || loading}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              {showPrevNext && (
                <Button
                  variant="outline"
                  className="p-0 w-8 h-8"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || loading}
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
