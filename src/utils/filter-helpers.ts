import type { FilterState } from "@/types/admin";

/**
 * Filter helper utilities for dynamic filter operations
 * Based on Berklee project pattern
 */

/**
 * Checks if there are any active filters
 */
export const hasActiveFilters = (filters: FilterState): boolean => {
  return Object.values(filters).some(val => {
    if (Array.isArray(val)) {
      return val.length > 0;
    }
    return val != null && val !== "" && val !== "all";
  });
};

/**
 * Gets the count of active filters
 */
export const getActiveFilterCount = (filters: FilterState): number => {
  return Object.values(filters).reduce<number>((count, val) => {
    if (Array.isArray(val)) {
      return count + (val.length > 0 ? 1 : 0);
    }
    return count + (val != null && val !== "" && val !== "all" ? 1 : 0);
  }, 0);
};

/**
 * Clears all filters to initial state
 */
export const clearAllFilters = (): FilterState => ({
  searchTerm: "",
  sectionId: "all",
  status: "all",
  industryIds: [],
});

/**
 * Updates a search filter
 */
export const updateSearchFilter = (
  filters: FilterState,
  key: keyof FilterState,
  value: string
): FilterState => ({
  ...filters,
  [key]: value.trim() === "" ? "" : value,
});

/**
 * Updates a single value filter (section, status)
 */
export const updateSingleFilter = (
  filters: FilterState,
  key: keyof FilterState,
  value: string
): FilterState => ({
  ...filters,
  [key]: value,
});

/**
 * Updates an array filter (industryIds)
 */
export const updateArrayFilter = (
  filters: FilterState,
  key: keyof FilterState,
  selectedIds: string[]
): FilterState => ({
  ...filters,
  [key]: selectedIds.length === 0 ? [] : selectedIds,
});

/**
 * Removes an item from an array filter
 */
export const removeItemFromFilter = (
  filters: FilterState,
  key: keyof FilterState,
  itemId: string
): FilterState => {
  const currentIds = Array.isArray(filters[key])
    ? (filters[key] as string[])
    : [];
  const filteredIds = currentIds.filter(id => id !== itemId);
  return {
    ...filters,
    [key]: filteredIds,
  };
};

/**
 * Resets a specific filter to default value
 */
export const resetFilter = (
  filters: FilterState,
  key: keyof FilterState
): FilterState => {
  const defaultValues: Record<keyof FilterState, string | string[]> = {
    searchTerm: "",
    sectionId: "all",
    status: "all",
    industryIds: [],
  };

  return {
    ...filters,
    [key]: defaultValues[key],
  };
};
