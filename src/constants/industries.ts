import type { IndustryFilterState } from "@/types/admin/industry";

export const INDUSTRIES_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    status: "",
    dateRange: {
      from: "",
      to: "",
    },
  } as IndustryFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    INDUSTRIES: "/admin/industries",
    INDUSTRY_CREATE: "/admin/industries/create",
    INDUSTRY_EDIT: (id: string | number) => `/admin/industries/${id}`,
  },

  // Status values
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
  },

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    NAME: "name",
    DESCRIPTION: "description",
    STATUS: "status",
    CREATED_AT: "created_at",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 500,
  },

  // API endpoints
  API: {
    INDUSTRIES: "/api/admin/industries",
    INDUSTRY_BY_ID: (id: string | number) => `/api/admin/industries/${id}`,
  },
} as const;
