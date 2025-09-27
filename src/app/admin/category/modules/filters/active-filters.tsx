"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ActiveFiltersProps } from "@/types/admin";

export const ActiveFilters = ({
  filters,
  industries,
  onFilterChange,
  onClearAll,
  onPageReset,
}: ActiveFiltersProps): React.JSX.Element => {
  if (!filters) {
    return <></>;
  }

  // Helper to remove an item from array filter
  const removeFromArrayFilter = (
    arr: any[] | undefined,
    valueToRemove: any
  ) => {
    if (!arr || !valueToRemove) {
      return arr;
    }
    const updated = arr.filter(item => item !== valueToRemove);
    return updated.length > 0 ? updated : undefined;
  };

  // Main remove filter handler
  const SINGLE_VALUE_FILTERS = ["searchTerm", "sectionId", "status"];

  const handleRemoveFilter = (key: string, valueToRemove?: string) => {
    const newFilters = { ...filters };

    if (SINGLE_VALUE_FILTERS.includes(key)) {
      if (key === "searchTerm") {
        (newFilters as any)[key] = "";
      } else {
        (newFilters as any)[key] = "all";
      }
    } else if (key === "industryIds") {
      (newFilters as any)[key] = valueToRemove
        ? removeFromArrayFilter((newFilters as any)[key], valueToRemove)
        : [];
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Helper function to clear all filters
  const handleClearAll = () => {
    onFilterChange({
      searchTerm: "",
      sectionId: "all",
      status: "all",
      industryIds: [],
    });
    onClearAll();
    onPageReset?.();
  };

  // Calculate total active filters
  const activeTotal = Object.values(filters).reduce(
    (acc: number, v) =>
      acc +
      (Array.isArray(v) ? v.length : v && v !== "all" && v !== "" ? 1 : 0),
    0
  );

  if (activeTotal === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-700 text-sm">
          Bộ lọc đang áp dụng:
        </span>
      </div>

      {filters.searchTerm && (
        <Badge key="search" variant="secondary" className="gap-1">
          <span>Tìm kiếm: {filters.searchTerm}</span>
          <X
            className="w-3 h-3 cursor-pointer pointer-events-auto"
            onClick={() => handleRemoveFilter("searchTerm")}
          />
        </Badge>
      )}

      {filters.status && filters.status !== "all" && (
        <Badge key="status" variant="secondary" className="gap-1">
          <span>
            Trạng thái:{" "}
            {filters.status === "active" ? "Hoạt động" : "Sắp ra mắt"}
          </span>
          <X
            className="w-3 h-3 cursor-pointer pointer-events-auto"
            onClick={() => handleRemoveFilter("status")}
          />
        </Badge>
      )}

      {filters.industryIds?.map(industryId => {
        const industry = industries.find(
          ind => ind.id.toString() === industryId
        );
        return industry ? (
          <Badge
            key={`industry-${industryId}`}
            variant="secondary"
            className="gap-1"
          >
            <span>Ngành nghề: {industry.name}</span>
            <X
              className="w-3 h-3 cursor-pointer pointer-events-auto"
              onClick={() => handleRemoveFilter("industryIds", industryId)}
            />
          </Badge>
        ) : null;
      })}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleClearAll}
        className="hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded-full text-xs"
      >
        Xóa tất cả ({activeTotal})
      </Button>
    </div>
  );
};
