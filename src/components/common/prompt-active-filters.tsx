"use client";

import React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type {
  PromptActiveFiltersProps,
  PromptActiveFilterItem,
} from "@/types/admin";

/**
 * Prompt active filters component
 *
 * @param props - The component props
 * @returns The prompt active filters JSX
 */
export const PromptActiveFilters = ({
  filters,
  categories,
  onFilterChange,
  onClearAll,
  onPageReset,
}: PromptActiveFiltersProps): React.JSX.Element => {
  const activeFilters = getActiveFilters(filters, categories);

  const removeItemFromFilter = (key: keyof typeof filters): void => {
    switch (key) {
      case "searchTerm":
        onFilterChange({ ...filters, searchTerm: "" });
        break;
      case "categoryId":
        onFilterChange({ ...filters, categoryId: "all" });
        break;
      case "status":
        onFilterChange({ ...filters, status: "all" });
        break;
      case "isPremium":
        onFilterChange({ ...filters, isPremium: "all" });
        break;
      case "tags":
        onFilterChange({ ...filters, tags: [] });
        break;
    }
    onPageReset?.();
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-900 text-sm">
          Bộ lọc đang áp dụng ({activeFilters.length})
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-gray-500 hover:text-gray-700"
        >
          Xóa tất cả
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map(filter => (
          <PromptFilterBadge
            key={filter.key}
            label={`${filter.label}: ${filter.value}`}
            onRemove={() => removeItemFromFilter(filter.key)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Prompt filter badge component
 *
 * @param props - The component props
 * @returns The prompt filter badge JSX
 */
const PromptFilterBadge = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}): React.JSX.Element => (
  <Badge
    variant="secondary"
    className="flex items-center gap-1 px-2 py-1 text-xs"
  >
    {label}
    <button
      type="button"
      onClick={onRemove}
      className="hover:bg-gray-200 ml-1 p-0.5 rounded-full"
    >
      <X className="w-3 h-3" />
    </button>
  </Badge>
);

/**
 * Get active filters from filter state
 *
 * @param filters - The filter state
 * @param categories - Available categories
 * @returns Array of active filter items
 */
const getActiveFilters = (
  filters: any,
  categories: any[]
): PromptActiveFilterItem[] => {
  const activeFilters: PromptActiveFilterItem[] = [];

  if (filters.searchTerm) {
    activeFilters.push({
      key: "searchTerm",
      label: "Tìm kiếm",
      value: filters.searchTerm,
    });
  }

  if (filters.categoryId !== "all") {
    const category = categories.find(
      cat => cat.id.toString() === filters.categoryId
    );
    activeFilters.push({
      key: "categoryId",
      label: "Danh mục",
      value: category?.name || filters.categoryId,
    });
  }

  if (filters.status !== "all") {
    const statusLabels: Record<string, string> = {
      active: "Hoạt động",
      inactive: "Không hoạt động",
      draft: "Bản nháp",
    };
    activeFilters.push({
      key: "status",
      label: "Trạng thái",
      value: statusLabels[filters.status] || filters.status,
    });
  }

  if (filters.isPremium !== "all") {
    const premiumLabels: Record<string, string> = {
      premium: "Premium",
      free: "Miễn phí",
    };
    activeFilters.push({
      key: "isPremium",
      label: "Loại",
      value: premiumLabels[filters.isPremium] || filters.isPremium,
    });
  }

  if (filters.tags.length > 0) {
    activeFilters.push({
      key: "tags",
      label: "Tags",
      value: `${filters.tags.length} tag(s)`,
    });
  }

  return activeFilters;
};
