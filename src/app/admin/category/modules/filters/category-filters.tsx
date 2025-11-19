"use client";

import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseSelect } from "@/components/ui/base-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Card, CardContent } from "@/components/ui/card";
import type {
  CategoryFilterProps,
  FilterCardProps,
  StatusFilterProps,
} from "@/types/admin/category";
import type { Industry } from "@/types";
import { FILTER_CONSTANTS, DEBOUNCE_DELAY } from "@/constants";
import { debounce } from "@/lib/utils";
import {
  hasActiveFilters,
  clearAllFilters,
  updateSearchFilter,
  updateStateFilter,
  updateItemFromFilter,
} from "@/utils/filter-helpers";
import type { CategoryFilterState } from "@/types/admin";
import { ActiveFilters } from "@/app/admin/category/modules/filters/active-filters";

export const CategoryFilter = ({
  filters,
  industries,
  industriesLoading = false,
  onIndustriesSearch,
  onIndustriesScrollToBottom,
  hasMoreIndustries = false,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: CategoryFilterProps): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState(filters.searchTerm || "");

  // Clear all filters function
  const handleClearAllFilters = () => clearAllFilters<CategoryFilterState>();

  const updateSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useLayoutEffect(() => {
    updateSearchValue(filters.searchTerm || "");
  }, [filters.searchTerm, updateSearchValue]);

  const debouncedSearchHandler = useMemo(
    () =>
      debounce((value: string) => {
        onFilterChange(
          updateSearchFilter(
            filters as Record<string, unknown>,
            "searchTerm",
            value
          ) as unknown as CategoryFilterState
        );
        onPageReset?.();
      }, DEBOUNCE_DELAY),
    [filters, onFilterChange, onPageReset]
  );

  /**
   * Handles search input changes with debouncing
   */
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearchHandler(value);
    },
    [debouncedSearchHandler]
  );

  /**
   * Handles status filter changes
   */
  const handleStatusChange = useCallback(
    (value: string) => {
      onFilterChange(
        updateStateFilter(
          filters as Record<string, unknown>,
          "status",
          value
        ) as unknown as CategoryFilterState
      );
      onPageReset?.();
    },
    [filters, onFilterChange, onPageReset]
  );

  /**
   * Handles industry filter changes
   */
  const handleIndustryChange = useCallback(
    (values: string[]): void => {
      onFilterChange(
        updateItemFromFilter(
          filters as Record<string, unknown>,
          "industryIds",
          values
        ) as unknown as CategoryFilterState
      );
      onPageReset?.();
    },
    [filters, onFilterChange, onPageReset]
  );

  /**
   * Clears all filters and resets to initial state
   */
  const handleClearFilters = useCallback((): void => {
    setSearchValue("");
    const clearedFilters = handleClearAllFilters();
    onFilterChange(clearedFilters);
    onClearFilters();
    onPageReset?.();
  }, [onFilterChange, onClearFilters, onPageReset]);

  // Check if there are any active filters using helper
  const showActiveFilters = hasActiveFilters({
    ...filters,
    searchTerm: searchValue,
  } as Record<string, unknown>);

  return (
    <Card className={`${className || ""}`}>
      <CardContent className="p-6">
        <div className={FILTER_CONSTANTS.CONTAINER}>
          <FilterCard
            filters={
              { ...filters, searchTerm: searchValue } as CategoryFilterState
            }
            industries={industries}
            industriesLoading={industriesLoading}
            onIndustriesSearch={onIndustriesSearch}
            onIndustriesScrollToBottom={onIndustriesScrollToBottom}
            hasMoreIndustries={hasMoreIndustries}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onIndustryChange={handleIndustryChange}
            onClearFilters={handleClearFilters}
            hasActiveFilters={showActiveFilters}
          />

          {/* Integrated ActiveFilters */}
          {showActiveFilters && (
            <ActiveFilters
              filters={
                { ...filters, searchTerm: searchValue } as CategoryFilterState
              }
              industries={industries}
              onFilterChange={onFilterChange}
              onClearAll={handleClearFilters}
              onPageReset={onPageReset}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Filter card component that contains the filter controls
 *
 * @param props - The component props
 * @returns The filter card JSX
 */
const FilterCard = ({
  filters,
  industries,
  industriesLoading = false,
  onIndustriesSearch,
  onIndustriesScrollToBottom,
  hasMoreIndustries = false,
  onSearchChange,
  onStatusChange,
  onIndustryChange,
}: FilterCardProps): React.JSX.Element => (
  <>
    {/* Search Input */}
    <div className="relative">
      <Search className={FILTER_CONSTANTS.SEARCH_ICON} />
      <Input
        placeholder="Tìm kiếm danh mục..."
        value={filters.searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>

    {/* Filter Grid */}
    <div className={FILTER_CONSTANTS.SPACING}>
      <div className="gap-4 grid xl:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Trạng thái</Label>
          <StatusFilter value={filters.status} onChange={onStatusChange} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Ngành nghề</Label>
          <IndustryFilter
            value={filters.industryIds || []}
            industries={industries}
            industriesLoading={industriesLoading}
            onIndustriesSearch={onIndustriesSearch}
            onIndustriesScrollToBottom={onIndustriesScrollToBottom}
            hasMoreIndustries={hasMoreIndustries}
            onChange={onIndustryChange}
          />
        </div>
      </div>
    </div>
  </>
);

/**
 * Status filter component
 *
 * @param props - The component props
 * @returns The status filter JSX
 */
const StatusFilter = ({
  value,
  onChange,
}: StatusFilterProps): React.JSX.Element => {
  const statusOptions = [
    { id: "all", name: "Tất cả trạng thái" },
    { id: "active", name: "Hoạt động" },
    { id: "comingSoon", name: "Sắp ra mắt" },
  ];

  return (
    <BaseSelect
      items={statusOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Tất cả trạng thái"
      triggerClassName="w-full"
    />
  );
};

/**
 * Industry filter component
 *
 * @param props - The component props
 * @returns The industry filter JSX
 */

const IndustryFilter = ({
  value,
  industries,
  industriesLoading = false,
  onIndustriesSearch,
  onIndustriesScrollToBottom,
  hasMoreIndustries = false,
  onChange,
}: {
  readonly value: readonly string[];
  readonly industries: Industry[];
  readonly industriesLoading?: boolean;
  readonly onIndustriesSearch?: (search: string) => void;
  readonly onIndustriesScrollToBottom?: () => void;
  readonly hasMoreIndustries?: boolean;
  readonly onChange: (values: string[]) => void;
}): React.JSX.Element => {
  const options = industries.map((industry: Industry) => ({
    value: industry.id.toString(),
    label: industry.name,
  }));

  return (
    <MultiSelect
      options={options}
      defaultValue={Array.isArray(value) ? [...value] : []}
      onValueChange={onChange}
      placeholder="Chọn ngành nghề..."
      maxCount={3}
      className="w-full"
      shouldFilter={false}
      onSearch={onIndustriesSearch}
      onScrollToBottom={onIndustriesScrollToBottom}
      isLoading={industriesLoading}
      hasMore={hasMoreIndustries}
    />
  );
};
