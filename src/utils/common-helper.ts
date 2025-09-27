import castArray from "lodash/castArray";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";

export function applyNonEmptyFiltersToQuery(
  filters: Record<string, unknown>,
  query: Record<string, unknown>
): void {
  for (const [key, value] of Object.entries(filters)) {
    const isArrayWithValues = isArray(value) && !isEmpty(value);
    const isValidPrimitive =
      !isArray(value) && !isUndefined(value) && !isNull(value) && value !== "";

    if (!isArrayWithValues && !isValidPrimitive) {
      continue;
    }

    query[key] = value;
  }
}

export function buildQueryStringFromFilters(
  filters: Record<string, unknown>
): string {
  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (isArray(value) && !isEmpty(value)) {
      castArray(value).forEach(item => {
        if (isUndefined(item) || isNull(item) || item === "") {
          return;
        }
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`
        );
      });
      continue;
    }

    // Special handling for locationType - allow empty string to be included as locationType=
    if (key === "locationType" && value === "") {
      queryParams.push(`${encodeURIComponent(key)}=`);
      continue;
    }

    if (isUndefined(value) || isNull(value) || value === "") {
      continue;
    }

    queryParams.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );
  }

  return queryParams.join("&");
}

/**
 * Check if a value is valid (not null, undefined, empty string, or "null"/"undefined" strings)
 * @param value - The value to check
 * @returns true if the value is valid, false otherwise
 */
export const isValidValue = (value: string | null | undefined): boolean => {
  return !!(
    value &&
    value !== "null" &&
    value !== "undefined" &&
    value.trim() !== ""
  );
};
