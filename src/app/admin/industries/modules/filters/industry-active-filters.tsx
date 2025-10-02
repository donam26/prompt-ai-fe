"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IndustryFilterState } from "@/types/admin/industry";
import type { Category } from "@/types";

interface IndustryActiveFiltersProps {
  filters: IndustryFilterState;
  categories: Category[];
  onFilterChange: (filters: IndustryFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}

export const IndustryActiveFilters = ({
  filters,
  categories,
  onFilterChange,
  onClearAll,
  onPageReset,
}: IndustryActiveFiltersProps): React.JSX.Element => {
  if (!filters) {
    return <></>;
  }

  // Helper to remove a single filter
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };

    if (key === "searchTerm") {
      newFilters.searchTerm = "";
    } else if (key === "categoryIds") {
      newFilters.categoryIds = [];
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Helper to remove a specific category
  const handleRemoveCategory = (categoryId: string) => {
    const newFilters = { ...filters };
    newFilters.categoryIds = (newFilters.categoryIds || []).filter(
      id => id !== categoryId
    );
    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
    filters.categoryIds && filters.categoryIds.length > 0,
  ].filter(Boolean).length;

  if (activeTotal === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-700 text-sm">
          Bộ lọc đang hoạt động:
        </span>
      </div>

      {/* Search filter */}
      {filters.searchTerm && filters.searchTerm !== "" && (
        <Badge key="search" variant="secondary" className="gap-1">
          <span className="text-xs">Tìm kiếm: {filters.searchTerm}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("searchTerm")}
          />
        </Badge>
      )}

      {/* Category filters */}
      {filters.categoryIds && filters.categoryIds.length > 0 && (
        <>
          {filters.categoryIds.map(categoryId => {
            const category = categories.find(
              cat => cat.id.toString() === categoryId
            );
            return (
              <Badge
                key={`category-${categoryId}`}
                variant="secondary"
                className="gap-1"
              >
                <span className="text-xs">
                  Danh mục: {category?.name || categoryId}
                </span>
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleRemoveCategory(categoryId)}
                />
              </Badge>
            );
          })}
        </>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded-full text-xs"
      >
        Xóa tất cả ({activeTotal})
      </Button>
    </div>
  );
};
