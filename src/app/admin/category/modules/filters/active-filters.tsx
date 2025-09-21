"use client";

import React from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilterBadge } from "../../../../../components/common/filter-badge";
import type {
  FilterState,
  Section,
  ActiveFiltersProps,
  ActiveFilterItem,
} from "@/types/admin";
import type { Industry } from "@/lib/types";
import {
  hasActiveFilters,
  removeItemFromFilter,
  resetFilter,
} from "@/utils/filter-helpers";
import { ACTIVE_FILTERS_CONSTANTS } from "@/constants";

/**
 * Active filters component that displays applied filters with remove functionality
 * Reusable component for showing active filters across different admin pages
 *
 * @param props - The component props
 * @returns The active filters JSX
 */
export const ActiveFilters = ({
  filters,
  sections,
  industries,
  onFilterChange,
  onClearAll,
  onPageReset,
}: ActiveFiltersProps): React.JSX.Element => {
  const activeFilters = getActiveFilters(filters, sections, industries);
  const activeTotal = activeFilters.length;

  if (!hasActiveFilters(filters)) {
    return <></>;
  }

  return (
    <div className={ACTIVE_FILTERS_CONSTANTS.CONTAINER}>
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-700 text-sm">
          Bộ lọc đang áp dụng:
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter: ActiveFilterItem, index: number) => (
          <FilterBadge
            key={`${filter.key}-${index}`}
            label={`${filter.label}: ${filter.value}`}
            onRemove={() => {
              if (filter.key === "industryIds") {
                // For industry filters, we need to find the industry ID and remove it
                const industry = industries.find(
                  (ind: Industry) => ind.name === filter.value
                );
                if (industry) {
                  const newFilters = removeItemFromFilter(
                    filters,
                    "industryIds",
                    industry.id.toString()
                  );
                  onFilterChange(newFilters);
                  onPageReset?.();
                }
              } else {
                // Handle other filters using resetFilter helper
                const newFilters = resetFilter(filters, filter.key);
                onFilterChange(newFilters);
                onPageReset?.();
              }
            }}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onClearAll}
        className={ACTIVE_FILTERS_CONSTANTS.CLEAR_BUTTON}
      >
        Xóa tất cả ({activeTotal})
      </Button>
    </div>
  );
};

/**
 * Gets the list of active filters for display
 *
 * @param filters - The current filter state
 * @param sections - The sections array
 * @param industries - The industries array
 * @returns Array of active filter items
 */
function getActiveFilters(
  filters: FilterState,
  sections: Section[],
  industries: Industry[]
): ActiveFilterItem[] {
  const activeFilters: ActiveFilterItem[] = [];

  if (filters.searchTerm) {
    activeFilters.push({
      key: "searchTerm",
      label: "Tìm kiếm",
      value: filters.searchTerm,
    });
  }

  if (filters.sectionId && filters.sectionId !== "all") {
    const section = sections.find(
      (s: Section) => String(s.id) === filters.sectionId
    );
    activeFilters.push({
      key: "sectionId",
      label: "Phân loại",
      value: section?.name || "Không xác định",
    });
  }

  if (filters.status && filters.status !== "all") {
    const statusLabel =
      filters.status === "active" ? "Hoạt động" : "Sắp ra mắt";
    activeFilters.push({
      key: "status",
      label: "Trạng thái",
      value: statusLabel,
    });
  }

  // Add industry filters
  if (filters.industryIds && filters.industryIds.length > 0) {
    filters.industryIds.forEach(industryId => {
      const industry = industries.find(ind => ind.id.toString() === industryId);
      if (industry) {
        activeFilters.push({
          key: "industryIds",
          label: "Ngành nghề",
          value: industry.name,
        });
      }
    });
  }

  return activeFilters;
}
