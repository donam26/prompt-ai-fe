import type { ContactFilterState } from "@/types";

export const CONTACTS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    status: "all",
    type: "all",
    dateFrom: "",
    dateTo: "",
  } as ContactFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    CONTACTS: "/admin/contacts",
    CONTACT_VIEW: (id: string | number) => `/admin/contacts/${id}`,
  },

  // Status values
  STATUS: {
    UNREPLIED: 1,
    REPLIED: 2,
  },

  // Type values
  TYPE: {
    SUPPORT: 1,
    REGISTRATION: 2,
    OTHER: 3,
  },

  // Table columns
  TABLE_COLUMNS: {
    NAME: "name",
    EMAIL: "email",
    PHONE: "phone",
    SUBJECT: "subject",
    STATUS: "status",
    CREATED_AT: "createdAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 255,
    PHONE_MAX_LENGTH: 20,
    SUBJECT_MIN_LENGTH: 5,
    SUBJECT_MAX_LENGTH: 200,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 1000,
  },

  // API endpoints
  API: {
    CONTACTS: "/api/admin/contacts",
    CONTACT_BY_ID: (id: string | number) => `/api/admin/contacts/${id}`,
  },
} as const;
