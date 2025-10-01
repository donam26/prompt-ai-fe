import type { CategoryFilterState } from "@/types/admin";
import { CATEGORY_TYPE_OPTIONS } from "@/types/enums";

export enum SectionType {
  CHATGPT = "1",
  CLAUDE = "2",
  GEMINI = "3",
}

export const CATEGORY_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    sectionId: "",
    status: "",
    industryIds: [],
  } as CategoryFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    CATEGORY_LIST: "/admin/category",
    CATEGORY_DETAIL: (id: string | number) => `/admin/category/${id}`,
    CATEGORY_CREATE: "/admin/category/create",
    CATEGORY_EDIT: (id: string | number) => `/admin/category/${id}`,
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
    SECTION: "section",
    STATUS: "status",
    INDUSTRIES: "industries",
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
    CATEGORIES: "/api/admin/categories",
    CATEGORY_BY_ID: (id: string | number) => `/api/admin/categories/${id}`,
  },

  // Form options
  FORM_OPTIONS: {
    SECTION_OPTIONS: [
      { value: SectionType.CHATGPT, label: "ChatGPT" },
      { value: SectionType.CLAUDE, label: "Claude" },
      { value: SectionType.GEMINI, label: "Gemini" },
    ],
    TYPE_OPTIONS: CATEGORY_TYPE_OPTIONS,
  },
} as const;
