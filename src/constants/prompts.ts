import { PromptFilterState } from "@/types";

export const PROMPTS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    categoryIds: [],
    topicIds: [],
    isType: undefined,
    industryIds: [],
    dateFrom: "",
    dateTo: "",
  } as PromptFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    PROMPTS: "/admin/prompts",
    PROMPT_CREATE: "/admin/prompts/create",
    PROMPT_EDIT: (id: string | number) => `/admin/prompts/${id}`,
    PROMPT_VIEW: (id: string | number) => `/admin/prompts/${id}/view`,
  },

  // Status values
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    DRAFT: "draft",
  },

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    TITLE: "title",
    CATEGORY: "category",
    STATUS: "status",
    CREATED_AT: "createdAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    CONTENT_MIN_LENGTH: 10,
    CONTENT_MAX_LENGTH: 5000,
  },

  // API endpoints
  API: {
    PROMPTS: "/api/admin/prompts",
    PROMPT_BY_ID: (id: string | number) => `/api/admin/prompts/${id}`,
  },

  // Form options
  FORM_OPTIONS: {
    TYPE_OPTIONS: [
      { value: "1", label: "Free" },
      { value: "2", label: "Premium" },
    ],
    SUB_TYPE_OPTIONS: [
      { value: "1", label: "Standard" },
      { value: "2", label: "Advanced" },
    ],
  },
} as const;
