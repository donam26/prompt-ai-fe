"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogFilterState } from "@/types/admin/blog";

interface BlogActiveFiltersProps {
  filters: BlogFilterState;
  onFilterChange: (filters: BlogFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}

export const BlogActiveFilters = ({
  filters,
  onFilterChange,
  onClearAll,
  onPageReset,
}: BlogActiveFiltersProps): React.JSX.Element => {
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
      case "dateFrom":
        newFilters.dateFrom = "";
        break;
      case "dateTo":
        newFilters.dateTo = "";
        break;
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
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

      {/* Date From filter */}
      {filters.dateFrom && (
        <Badge key="dateFrom" variant="secondary" className="gap-1">
          <span className="text-xs">Từ: {filters.dateFrom}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("dateFrom")}
          />
        </Badge>
      )}

      {/* Date To filter */}
      {filters.dateTo && (
        <Badge key="dateTo" variant="secondary" className="gap-1">
          <span className="text-xs">Đến: {filters.dateTo}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("dateTo")}
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
