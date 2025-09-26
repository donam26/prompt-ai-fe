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
  SectionFilterProps,
  StatusFilterProps,
  IndustryFilterProps,
} from "@/types/admin";
import type { Industry, Section } from "@/lib/types";
import { FILTER_CONSTANTS, DEBOUNCE_DELAY } from "@/constants";
import { debounce } from "@/lib/utils";
import {
  hasActiveFilters,
  clearAllFilters,
  updateSearchFilter,
  updateSingleFilter,
  updateArrayFilter,
  // removeItemFromFilter,
} from "@/utils/filter-helpers";
import { ActiveFilters } from "@/components/common";

export const CategoryFilter = ({
  filters,
  sections,
  industries,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: CategoryFilterProps): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState(filters.searchTerm || "");

  const updateSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useLayoutEffect(() => {
    updateSearchValue(filters.searchTerm || "");
  }, [filters.searchTerm, updateSearchValue]);

  const debouncedSearchHandler = useMemo(
    () =>
      debounce((value: string) => {
        onFilterChange(updateSearchFilter(filters, "searchTerm", value));
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
   * Handles section filter changes
   */
  const handleSectionChange = useCallback(
    (value: string) => {
      const newFilters = updateSingleFilter(filters, "sectionId", value);
      onFilterChange(newFilters);
      onPageReset?.();
    },
    [filters, onFilterChange, onPageReset]
  );

  /**
   * Handles status filter changes
   */
  const handleStatusChange = useCallback(
    (value: string) => {
      const newFilters = updateSingleFilter(filters, "status", value);
      onFilterChange(newFilters);
      onPageReset?.();
    },
    [filters, onFilterChange, onPageReset]
  );

  /**
   * Handles industry filter changes
   */
  const handleIndustryChange = useCallback(
    (values: string[]): void => {
      const newFilters = updateArrayFilter(filters, "industryIds", values);
      onFilterChange(newFilters);
      onPageReset?.();
    },
    [filters, onFilterChange, onPageReset]
  );

  /**
   * Handles removing individual industry from filter
   */
  // const handleIndustryRemove = useCallback(
  //   (industryId: string) => {
  //     const newFilters = removeItemFromFilter(
  //       filters,
  //       "industryIds",
  //       industryId
  //     );
  //     onFilterChange(newFilters);
  //     onPageReset?.();
  //   },
  //   [filters, onFilterChange, onPageReset]
  // );

  /**
   * Clears all filters and resets to initial state
   */
  const handleClearFilters = useCallback((): void => {
    setSearchValue("");
    const clearedFilters = clearAllFilters();
    onFilterChange(clearedFilters);
    onClearFilters();
    onPageReset?.();
  }, [onFilterChange, onClearFilters, onPageReset]);

  // Check if there are any active filters using helper
  const showActiveFilters = hasActiveFilters({
    ...filters,
    searchTerm: searchValue,
  });

  return (
    <Card className={`${className || ""}`}>
      <CardContent className="p-6">
        <div className={FILTER_CONSTANTS.CONTAINER}>
          <FilterCard
            filters={{ ...filters, searchTerm: searchValue }}
            sections={sections}
            industries={industries}
            onSearchChange={handleSearchChange}
            onSectionChange={handleSectionChange}
            onStatusChange={handleStatusChange}
            onIndustryChange={handleIndustryChange}
            onClearFilters={handleClearFilters}
            hasActiveFilters={showActiveFilters}
          />

          {/* Integrated ActiveFilters */}
          {showActiveFilters && (
            <ActiveFilters
              filters={{ ...filters, searchTerm: searchValue }}
              sections={sections}
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
  sections,
  industries,
  onSearchChange,
  onSectionChange,
  onStatusChange,
  onIndustryChange,
  // onClearFilters,
  // hasActiveFilters,
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
          <Label className="font-medium text-sm">Phân loại</Label>
          <SectionFilter
            value={filters.sectionId}
            sections={sections}
            onChange={onSectionChange}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Trạng thái</Label>
          <StatusFilter value={filters.status} onChange={onStatusChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-sm">Ngành nghề</Label>
        <IndustryFilter
          value={filters.industryIds}
          industries={industries}
          onChange={onIndustryChange}
        />
      </div>
    </div>
  </>
);

/**
 * Section filter component
 *
 * @param props - The component props
 * @returns The section filter JSX
 */
const SectionFilter = ({
  value,
  sections,
  onChange,
}: SectionFilterProps): React.JSX.Element => {
  const sectionOptions = [
    { id: "all", name: "Tất cả phân loại" },
    ...sections.map((section: Section) => ({
      id: String(section.id),
      name: section.name,
    })),
  ];

  return (
    <BaseSelect
      items={sectionOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Tất cả phân loại"
      triggerClassName="w-full"
    />
  );
};

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
    { id: "coming_soon", name: "Sắp ra mắt" },
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
  onChange,
}: IndustryFilterProps): React.JSX.Element => {
  const options = industries.map((industry: Industry) => ({
    value: industry.id.toString(),
    label: industry.name,
  }));

  return (
    <MultiSelect
      options={options}
      defaultValue={[...value]}
      onValueChange={onChange}
      placeholder="Chọn ngành nghề..."
      maxCount={3}
      className="w-full"
    />
  );
};
