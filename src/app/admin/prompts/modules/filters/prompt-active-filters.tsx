"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { PromptFilterState } from "@/types/entities/prompt";

interface PromptActiveFiltersProps {
  filters: PromptFilterState;
  categories: Category[];
  industries: Category[];
  onFilterChange: (filters: PromptFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}

export const PromptActiveFilters = ({
  filters,
  categories,
  industries,
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

    switch (key) {
      case "searchTerm":
        newFilters.searchTerm = "";
        break;
      case "isType":
        newFilters.isType = undefined;
        break;
      case "industryIds":
        newFilters.industryIds = [];
        break;
      case "dateFrom":
        newFilters.dateFrom = "";
        break;
      case "dateTo":
        newFilters.dateTo = "";
        break;
      case "categoryIds":
        newFilters.categoryIds = [];
        break;
      default:
        break;
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
    filters.categoryIds && filters.categoryIds.length > 0,
    filters.isType && filters.isType !== undefined,
    filters.industryIds && filters.industryIds.length > 0,
    filters.dateFrom || filters.dateTo,
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
      {filters.categoryIds && filters.categoryIds.length > 0 && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">
            Danh mục: {filters.categoryIds.join(", ")}
          </span>
          <button
            onClick={() => handleRemoveFilter("categoryId")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Categories multiple filter */}
      {filters.categoryIds && filters.categoryIds.length > 0 && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">
            Danh mục:{" "}
            {filters.categoryIds
              .map(id => categories.find(cat => cat.id.toString() === id)?.name)
              .filter(Boolean)
              .join(", ")}
          </span>
          <button
            onClick={() => handleRemoveFilter("categoryIds")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Premium filter */}
      {filters.isType && filters.isType !== undefined && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">Premium: {filters.isType}</span>
          <button
            onClick={() => handleRemoveFilter("isType")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Industries filter */}
      {filters.industryIds && filters.industryIds.length > 0 && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">
            Ngành nghề:{" "}
            {filters.industryIds
              .map(id => industries.find(ind => ind.id.toString() === id)?.name)
              .filter(Boolean)
              .join(", ")}
          </span>
          <button
            onClick={() => handleRemoveFilter("industryIds")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Date range filter */}
      {(filters.dateFrom || filters.dateTo) && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">
            Khoảng thời gian:{" "}
            {filters.dateFrom && filters.dateTo
              ? `${new Date(filters.dateFrom).toLocaleDateString("vi-VN")} - ${new Date(filters.dateTo).toLocaleDateString("vi-VN")}`
              : filters.dateFrom
                ? `Từ ${new Date(filters.dateFrom).toLocaleDateString("vi-VN")}`
                : filters.dateTo
                  ? `Đến ${new Date(filters.dateTo).toLocaleDateString("vi-VN")}`
                  : ""}
          </span>
          <button
            onClick={() => handleRemoveFilter("dateFrom")}
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
