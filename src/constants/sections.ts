import type { SectionFilterState } from "@/types/admin/section";

export const SECTIONS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    status: "",
    dateRange: {
      from: "",
      to: "",
    },
  } as SectionFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    SECTIONS: "/admin/sections",
    SECTION_CREATE: "/admin/sections/create",
    SECTION_EDIT: (id: string | number) => `/admin/sections/${id}`,
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
    SECTIONS: "/api/admin/sections",
    SECTION_BY_ID: (id: string | number) => `/api/admin/sections/${id}`,
  },
} as const;
