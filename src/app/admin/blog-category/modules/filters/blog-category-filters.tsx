"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { BlogCategoryFilterProps } from "@/types/admin/blog-category";

export const BlogCategoryFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className = "",
}: BlogCategoryFilterProps): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters.searchTerm) {
        onFilterChange({ searchTerm });
        onPageReset?.();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters.searchTerm, onFilterChange, onPageReset]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    onClearFilters();
  }, [onClearFilters]);

  const hasActiveFilters = filters.searchTerm !== "";

  return (
    <div className={`bg-white p-4 rounded-lg border ${className}`}>
      <div className="flex sm:flex-row flex-col gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
            <Input
              placeholder="Tìm kiếm blog category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-600 text-sm">Bộ lọc đang áp dụng:</span>
            {filters.searchTerm && (
              <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-md text-blue-800 text-sm">
                Tìm kiếm: {filters.searchTerm}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    onFilterChange({ searchTerm: "" });
                    onPageReset?.();
                  }}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
