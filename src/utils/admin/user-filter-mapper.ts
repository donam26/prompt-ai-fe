import type { UserFilterState } from "@/types/admin/user";

/**
 * Maps frontend filter state to backend API format
 *
 * @param filters - The frontend filter state
 * @returns The backend filter format
 */
export const mapUserFiltersToBackend = (
  filters: UserFilterState
): Record<string, unknown> => {
  const backendFilters: Record<string, unknown> = {};

  // Map searchTerm
  if (filters.searchTerm) {
    backendFilters.searchTerm = filters.searchTerm;
  }

  // Map status (convert "active"/"inactive" to account_status number)
  if (filters.status && filters.status !== "all") {
    if (filters.status === "active") {
      backendFilters.account_status = 1;
    } else if (filters.status === "inactive") {
      backendFilters.account_status = 0;
    } else {
      backendFilters.account_status = filters.status;
    }
  }

  // Map role
  if (filters.role && filters.role !== "all") {
    backendFilters.role = filters.role;
  }

  // Map date range
  if (filters.dateFrom) {
    backendFilters.dateFrom = filters.dateFrom;
  }

  if (filters.dateTo) {
    backendFilters.dateTo = filters.dateTo;
  }

  return backendFilters;
};
