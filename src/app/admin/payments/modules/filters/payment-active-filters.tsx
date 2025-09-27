"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PaymentFilterState } from "@/types/admin/payment";

interface PaymentActiveFiltersProps {
  filters: PaymentFilterState;
  onFilterChange: (filters: PaymentFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}

export const PaymentActiveFilters = ({
  filters,
  onFilterChange,
  onClearAll,
  onPageReset,
}: PaymentActiveFiltersProps): React.JSX.Element => {
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
    } else if (key === "paymentMethod") {
      newFilters.method = "all";
    } else if (key === "dateRange") {
      newFilters.dateRange = { from: "", to: "" };
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
    filters.status && filters.status !== "all",
    filters.method && filters.method !== "all",
    filters.dateRange.from || filters.dateRange.to,
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

      {/* Payment method filter */}
      {filters.method && filters.method !== "all" && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">Phương thức: {filters.method}</span>
          <button
            onClick={() => handleRemoveFilter("method")}
            className="hover:bg-gray-300 ml-1 p-0.5 rounded-full"
            type="button"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {/* Date range filter */}
      {(filters.dateRange.from || filters.dateRange.to) && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">
            Ngày: {filters.dateRange.from || "..."} -{" "}
            {filters.dateRange.to || "..."}
          </span>
          <button
            onClick={() => handleRemoveFilter("dateRange")}
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
