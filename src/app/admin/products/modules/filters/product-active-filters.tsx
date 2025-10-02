"use client";

import React from "react";
import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { ProductFilterState } from "@/types/admin/product";
import type { Section } from "@/types";
import { Button } from "@/components/ui/button";

interface ProductActiveFiltersProps {
  filters: ProductFilterState;
  sections: Section[];
  onFilterChange: (filters: ProductFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}

export const ProductActiveFilters = ({
  filters,
  sections,
  onFilterChange,
  onClearAll,
  onPageReset,
}: ProductActiveFiltersProps): React.JSX.Element => {
  if (!filters) {
    return <></>;
  }

  // Helper to remove a single filter
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };

    if (key === "searchTerm") {
      newFilters.searchTerm = "";
    } else if (key === "sectionIds") {
      newFilters.sectionIds = [];
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Helper to remove a specific section
  const handleRemoveSection = (sectionId: string) => {
    const newFilters = { ...filters };
    newFilters.sectionIds = (newFilters.sectionIds || []).filter(
      id => id !== sectionId
    );
    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
    filters.sectionIds && filters.sectionIds.length > 0,
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

      {/* Section filters */}
      {filters.sectionIds && filters.sectionIds.length > 0 && (
        <>
          {filters.sectionIds.map(sectionId => {
            const section = sections.find(
              cat => cat.id.toString() === sectionId
            );
            return (
              <Badge
                key={`section-${sectionId}`}
                variant="secondary"
                className="gap-1"
              >
                <span className="text-xs">
                  Section: {section?.name || sectionId}
                </span>
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleRemoveSection(sectionId)}
                />
              </Badge>
            );
          })}
        </>
      )}

      <Button variant="outline" onClick={onClearAll}>
        <X className="w-3 h-3" />
        Xóa tất cả{" "}
      </Button>
    </div>
  );
};
