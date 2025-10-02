"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ContactFilterState } from "@/types/admin/contact";
import {
  getStatusDisplayName,
  getTypeDisplayName,
} from "@/types/enums/contact-filter";

interface ContactActiveFiltersProps {
  filters: ContactFilterState;
  onFilterChange: (filters: ContactFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}

export const ContactActiveFilters = ({
  filters,
  onFilterChange,
  onClearAll,
  onPageReset,
}: ContactActiveFiltersProps): React.JSX.Element => {
  if (!filters) {
    return <></>;
  }

  // Helper to remove a single filter
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };

    if (key === "searchTerm") {
      newFilters.searchTerm = "";
    } else if (key === "status") {
      newFilters.status = "all";
    } else if (key === "type") {
      newFilters.type = "all";
    } else if (key === "dateRange") {
      newFilters.dateFrom = "";
      newFilters.dateTo = "";
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
    filters.status && filters.status !== "all",
    filters.type && filters.type !== "all",
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

      {/* Status filter */}
      {filters.status && filters.status !== "all" && (
        <Badge key="status" variant="secondary" className="gap-1">
          <span className="text-xs">
            Trạng thái: {getStatusDisplayName(filters.status)}
          </span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("status")}
          />
        </Badge>
      )}

      {/* Type filter */}
      {filters.type && filters.type !== "all" && (
        <Badge key="type" variant="secondary" className="gap-1">
          <span className="text-xs">
            Loại: {getTypeDisplayName(filters.type)}
          </span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("type")}
          />
        </Badge>
      )}

      {/* Date range filter */}
      {(filters.dateFrom || filters.dateTo) && (
        <Badge key="dateRange" variant="secondary" className="gap-1">
          <span className="text-xs">
            Ngày: {filters.dateFrom || "..."} - {filters.dateTo || "..."}
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
