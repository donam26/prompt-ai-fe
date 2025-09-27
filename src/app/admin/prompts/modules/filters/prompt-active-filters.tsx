"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PromptFilterState } from "@/types/admin/prompt";

interface PromptActiveFiltersProps {
  filters: PromptFilterState;
  categories: any[];
  onFilterChange: (filters: PromptFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}

export const PromptActiveFilters = ({
  filters,
  onFilterChange,
  onClearAll,
  onPageReset,
}: PromptActiveFiltersProps): React.JSX.Element => {
  if (!filters) {
    return <></>;
  }

  // Helper to remove a single filter
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };

    if (key === "searchTerm") {
      newFilters.searchTerm = "";
    } else if (key === "categoryId") {
      newFilters.categoryId = "all";
    } else if (key === "status") {
      newFilters.status = "all";
    } else if (key === "isPremium") {
      newFilters.isPremium = "all";
    } else if (key === "tags") {
      newFilters.tags = [];
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
    filters.categoryId && filters.categoryId !== "all",
    filters.status && filters.status !== "all",
    filters.isPremium && filters.isPremium !== "all",
    filters.tags && filters.tags.length > 0,
  ].filter(Boolean).length;

  if (activeTotal === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-700 text-sm">
          Bộ lọc đang hoạt động ({activeTotal}):
        </span>
      </div>

      {/* Search filter */}
      {filters.searchTerm && filters.searchTerm !== "" && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">Tìm kiếm: {filters.searchTerm}</span>
          <button
            onClick={() => handleRemoveFilter("searchTerm")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Category filter */}
      {filters.categoryId && filters.categoryId !== "all" && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">Danh mục: {filters.categoryId}</span>
          <button
            onClick={() => handleRemoveFilter("categoryId")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Status filter */}
      {filters.status && filters.status !== "all" && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">Trạng thái: {filters.status}</span>
          <button
            onClick={() => handleRemoveFilter("status")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Premium filter */}
      {filters.isPremium && filters.isPremium !== "all" && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">Premium: {filters.isPremium}</span>
          <button
            onClick={() => handleRemoveFilter("isPremium")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Tags filter */}
      {filters.tags && filters.tags.length > 0 && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">Tags: {filters.tags.join(", ")}</span>
          <button
            onClick={() => handleRemoveFilter("tags")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Clear all button */}
      {activeTotal > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onClearAll();
            onPageReset?.();
          }}
          className="text-gray-600 hover:text-gray-800 text-xs"
        >
          Xóa tất cả
        </Button>
      )}
    </div>
  );
};
