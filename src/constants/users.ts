import type { UserFilterState } from "@/types/admin/user";

export const USERS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    status: "",
    role: "",
    dateRange: {
      from: "",
      to: "",
    },
  } as UserFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    USERS: "/admin/users",
    USER_CREATE: "/admin/users/create",
    USER_EDIT: (id: string | number) => `/admin/users/${id}`,
    USER_VIEW: (id: string | number) => `/admin/users/${id}/view`,
  },

  // Status values
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    PENDING: "pending",
  },

  // Role values
  ROLE: {
    ADMIN: "admin",
    USER: "user",
    MODERATOR: "moderator",
  },

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    NAME: "name",
    EMAIL: "email",
    ROLE: "role",
    STATUS: "status",
    CREATED_AT: "createdAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 255,
  },

  // API endpoints
  API: {
    USERS: "/api/admin/users",
    USER_BY_ID: (id: string | number) => `/api/admin/users/${id}`,
  },
} as const;
