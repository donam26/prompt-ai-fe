/**
 * Generic filter helpers that can be reused across all modules
 */

import isBoolean from "lodash/isBoolean";
import isEmpty from "lodash/isEmpty";

// Constants for boolean filter options
export const BOOLEAN_SELECT_OPTIONS = {
  TRUE: "true",
  FALSE: "false",
  ALL: "all",
} as const;

export type TSelectValue =
  (typeof BOOLEAN_SELECT_OPTIONS)[keyof typeof BOOLEAN_SELECT_OPTIONS];

const selectToBooleanMap: Record<TSelectValue, boolean | null> = {
  [BOOLEAN_SELECT_OPTIONS.TRUE]: true,
  [BOOLEAN_SELECT_OPTIONS.FALSE]: false,
  [BOOLEAN_SELECT_OPTIONS.ALL]: null,
};

/**
 * Parses a select value to boolean
 */
export const parseBooleanSelect = (value: string): boolean | null => {
  const normalizedValue = value.toLowerCase();
  return normalizedValue in selectToBooleanMap
    ? selectToBooleanMap[normalizedValue as TSelectValue]
    : null;
};

/**
 * Converts boolean value to select value
 */
export const booleanToSelectValue = (
  value: boolean | null | string
): TSelectValue => {
  if (typeof value === "string") {
    const normalizedValue = value.toLowerCase();
    if (normalizedValue in selectToBooleanMap) {
      return normalizedValue as TSelectValue;
    }
  }

  if (isBoolean(value)) {
    return value ? BOOLEAN_SELECT_OPTIONS.TRUE : BOOLEAN_SELECT_OPTIONS.FALSE;
  }

  return BOOLEAN_SELECT_OPTIONS.ALL;
};

/**
 * Checks if there are any active filters
 */
export const hasActiveFilters = <T extends Record<string, unknown>>(
  filters: T
): boolean =>
  Object.values(filters).some(val =>
    Array.isArray(val) ? !isEmpty(val) : val != null && val !== ""
  );

/**
 * Gets the count of active filters
 */
export const getActiveFilterCount = <T extends Record<string, unknown>>(
  filters: T
): number =>
  Object.values(filters).reduce<number>((count, val) => {
    if (Array.isArray(val)) {
      return count + (!isEmpty(val) ? 1 : 0);
    }
    return count + (val != null && val !== "" ? 1 : 0);
  }, 0);

/**
 * Clears all filters (returns empty object)
 */
export const clearAllFilters = <T>(): T => ({}) as T;

/**
 * Updates a search filter
 */
export const updateSearchFilter = <T extends Record<string, unknown>>(
  filters: T,
  key: keyof T,
  value: string
): T => ({
  ...filters,
  [key]: isEmpty(value) ? undefined : value,
});

/**
 * Updates a boolean filter (for true/false/all values)
 */
export const updateBooleanFilter = <T extends Record<string, unknown>>(
  filters: T,
  key: keyof T,
  value: string
): T => ({
  ...filters,
  [key]:
    value === BOOLEAN_SELECT_OPTIONS.ALL
      ? undefined
      : value === BOOLEAN_SELECT_OPTIONS.TRUE,
});

/**
 * Updates a single value filter (for status, section, etc.)
 */
export const updateStateFilter = <T extends Record<string, unknown>>(
  filters: T,
  key: keyof T,
  value: string
): T => ({
  ...filters,
  [key]: isEmpty(value) ? undefined : value,
});

/**
 * Updates an array filter (for industryIds, etc.)
 */
export const updateItemFromFilter = <T extends Record<string, unknown>>(
  filters: T,
  key: keyof T,
  selectedIds: string[]
): T => ({
  ...filters,
  [key]: isEmpty(selectedIds) ? undefined : selectedIds,
});

/**
 * Removes an item from an array filter
 */
export const removeItemFromFilter = <T extends Record<string, unknown>>(
  filters: T,
  key: keyof T,
  itemId: string
): T => {
  const currentIds = Array.isArray(filters[key])
    ? (filters[key] as string[])
    : [];
  const filteredIds = currentIds.filter(id => id !== itemId);
  return {
    ...filters,
    [key]: isEmpty(filteredIds) ? undefined : filteredIds,
  };
};

/**
 * Gets the deleted filter value for display
 */
export const getDeletedFilterValue = <T extends Record<string, unknown>>(
  filters: T
): string => {
  const map: Record<string, string> = {
    true: BOOLEAN_SELECT_OPTIONS.TRUE,
    false: BOOLEAN_SELECT_OPTIONS.FALSE,
  };
  return map[String(filters.isDeleted)] ?? BOOLEAN_SELECT_OPTIONS.ALL;
};

/**
 * Creates boolean filter options for select components
 */
export const createBooleanFilterOptions = (t: (key: string) => string) => [
  { label: t("all"), value: BOOLEAN_SELECT_OPTIONS.ALL },
  { label: t("yes"), value: BOOLEAN_SELECT_OPTIONS.TRUE },
  { label: t("no"), value: BOOLEAN_SELECT_OPTIONS.FALSE },
];

/**
 * Gets boolean filter label for display
 */
export const getBooleanFilterLabel = (
  value: boolean | null,
  t: (key: string) => string
): string => {
  if (value === true) {
    return t("yes");
  }
  if (value === false) {
    return t("no");
  }
  return t("all");
};

// Legacy aliases for backward compatibility
export const updateSingleFilter = updateStateFilter;
export const updateArrayFilter = updateItemFromFilter;
