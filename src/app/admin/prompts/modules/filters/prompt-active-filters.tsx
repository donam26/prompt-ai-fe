"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category, PromptFilterState } from "@/types";

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

  // Helper to remove item from array filter
  const removeFromArrayFilter = (
    arr: string[] | undefined,
    valueToRemove: string
  ): string[] | undefined => {
    if (!arr || !valueToRemove) return arr;
    const updated = arr.filter(item => item !== valueToRemove);
    return updated.length > 0 ? updated : undefined;
  };

  // Helper to remove a single filter
  const handleRemoveFilter = (key: string, valueToRemove?: string) => {
    const newFilters = { ...filters };

    switch (key) {
      case "searchTerm":
        newFilters.searchTerm = "";
        break;
      case "isType":
        newFilters.isType = undefined;
        break;
      case "industryIds":
        if (valueToRemove) {
          newFilters.industryIds =
            removeFromArrayFilter(filters.industryIds, valueToRemove) || [];
        } else {
          newFilters.industryIds = [];
        }
        break;
      case "dateRange":
        newFilters.dateFrom = "";
        newFilters.dateTo = "";
        break;
      case "categoryIds":
        if (valueToRemove) {
          newFilters.categoryIds =
            removeFromArrayFilter(filters.categoryIds, valueToRemove) || [];
        } else {
          newFilters.categoryIds = [];
        }
        break;
      default:
        break;
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  const getTypeName = (type: number | undefined): string => {
    if (type === 2) return "Premium";
    if (type === 1) return "Miễn phí";
    return "";
  };

  // Calculate active filter count
  const activeTotal =
    (filters.searchTerm ? 1 : 0) +
    (filters.categoryIds?.length || 0) +
    (filters.industryIds?.length || 0) +
    (filters.isType !== undefined ? 1 : 0) +
    (filters.dateFrom || filters.dateTo ? 1 : 0);

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

      {/* Category filters - individual badges */}
      {filters.categoryIds?.map(categoryId => {
        const category = categories.find(c => c.id.toString() === categoryId);
        return category ? (
          <Badge
            key={`category-${categoryId}`}
            variant="secondary"
            className="gap-1"
          >
            <span className="text-xs">Danh mục: {category.name}</span>
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => handleRemoveFilter("categoryIds", categoryId)}
            />
          </Badge>
        ) : null;
      })}

      {/* Industry filters - individual badges */}
      {filters.industryIds?.map(industryId => {
        const industry = industries.find(i => i.id.toString() === industryId);
        return industry ? (
          <Badge
            key={`industry-${industryId}`}
            variant="secondary"
            className="gap-1"
          >
            <span className="text-xs">Ngành nghề: {industry.name}</span>
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => handleRemoveFilter("industryIds", industryId)}
            />
          </Badge>
        ) : null;
      })}

      {/* Premium filter */}
      {filters.isType !== undefined && (
        <Badge key="isType" variant="secondary" className="gap-1">
          <span className="text-xs">Loại: {getTypeName(filters.isType)}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("isType")}
          />
        </Badge>
      )}

      {/* Date range filter */}
      {(filters.dateFrom || filters.dateTo) && (
        <Badge key="dateRange" variant="secondary" className="gap-1">
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
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("dateRange")}
          />
        </Badge>
      )}

      {/* Clear all button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          onClearAll();
          onPageReset?.();
        }}
        className="hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded-full text-xs"
      >
        Xóa tất cả ({activeTotal})
      </Button>
    </div>
  );
};
