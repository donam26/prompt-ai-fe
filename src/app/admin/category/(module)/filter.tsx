import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  Section,
  FilterState,
  CategoryFilterProps,
  ActiveFilterItem,
  FilterCardProps,
  SearchFilterProps,
  SectionFilterProps,
  StatusFilterProps,
  ActiveFiltersListProps,
} from "@/types/admin";

/**
 * Initial filter state
 */
const INITIAL_FILTER_STATE: FilterState = {
  searchTerm: "",
  sectionId: "all",
  status: "all",
};

/**
 * Category filter component that provides search and filtering functionality
 *
 * @param props - The component props
 * @returns The category filter JSX
 */
export const CategoryFilter = ({
  sections,
  onFilterChange,
  onClearFilters,
  initialFilters = {},
  className,
  showActiveFilters = true,
}: CategoryFilterProps): React.JSX.Element => {
  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTER_STATE,
    ...initialFilters,
  });

  /**
   * Handles individual filter changes
   *
   * @param key - The filter key to update
   * @param value - The new filter value
   */
  const handleFilterChange = (key: keyof FilterState, value: string): void => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  /**
   * Clears all filters and resets to initial state
   */
  const handleClearFilters = (): void => {
    setFilters(INITIAL_FILTER_STATE);
    onClearFilters();
  };

  /**
   * Removes a specific filter
   *
   * @param key - The filter key to remove
   */
  const handleRemoveFilter = (key: keyof FilterState): void => {
    const newFilters = { ...filters, [key]: key === "searchTerm" ? "" : "all" };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  /**
   * Checks if there are any active filters
   *
   * @returns True if there are active filters
   */
  const hasActiveFilters = (): boolean => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === "searchTerm") return value !== "";
      return value !== "all";
    });
  };

  /**
   * Gets the list of active filters for display
   *
   * @returns Array of active filter items
   */
  const getActiveFilters = (): ActiveFilterItem[] => {
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

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className={className}>
      <FilterCard
        filters={filters}
        sections={sections}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters()}
      />
      {showActiveFilters && activeFilters.length > 0 && (
        <ActiveFiltersList
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearFilters}
        />
      )}
    </div>
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
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}: FilterCardProps): React.JSX.Element => (
  <Card>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span className="flex items-center">
          <Filter className="mr-2 w-4 h-4" />
          Tìm kiếm và lọc
        </span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 w-3 h-3" />
            Xóa bộ lọc
          </Button>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        <SearchFilter
          value={filters.searchTerm}
          onChange={(value: string) => onFilterChange("searchTerm", value)}
        />
        <SectionFilter
          value={filters.sectionId}
          sections={sections}
          onChange={(value: string) => onFilterChange("sectionId", value)}
        />
        <StatusFilter
          value={filters.status}
          onChange={(value: string) => onFilterChange("status", value)}
        />
      </div>
    </CardContent>
  </Card>
);

/**
 * Search filter component
 *
 * @param props - The component props
 * @returns The search filter JSX
 */
const SearchFilter = ({
  value,
  onChange,
}: SearchFilterProps): React.JSX.Element => (
  <div className="space-y-2">
    <Label htmlFor="search">Tìm kiếm</Label>
    <div className="relative">
      <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
      <Input
        id="search"
        placeholder="Tìm kiếm danh mục..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  </div>
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
}: SectionFilterProps): React.JSX.Element => (
  <div className="space-y-2">
    <Label htmlFor="section">Phân loại</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Tất cả phân loại" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả phân loại</SelectItem>
        {sections.map((section: Section) => (
          <SelectItem key={section.id} value={String(section.id)}>
            {section.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
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
}: StatusFilterProps): React.JSX.Element => (
  <div className="space-y-2">
    <Label htmlFor="status">Trạng thái</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Tất cả trạng thái" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả trạng thái</SelectItem>
        <SelectItem value="active">Hoạt động</SelectItem>
        <SelectItem value="coming_soon">Sắp ra mắt</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

/**
 * Active filters list component
 *
 * @param props - The component props
 * @returns The active filters list JSX
 */
const ActiveFiltersList = ({
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersListProps): React.JSX.Element => (
  <div className="space-y-2 mt-4">
    <div className="flex justify-between items-center">
      <span className="font-medium text-muted-foreground text-sm">
        Bộ lọc đang áp dụng:
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="px-2 h-6 text-muted-foreground hover:text-foreground"
      >
        Xóa tất cả
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      {activeFilters.map((filter: ActiveFilterItem) => (
        <Badge
          key={filter.key}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          <span className="text-xs">
            {filter.label}: <strong>{filter.value}</strong>
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveFilter(filter.key)}
            className="hover:bg-transparent p-0 w-4 h-4"
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      ))}
    </div>
  </div>
);
