import type { FeedbackFilterState } from "@/types/admin/feedback";

export const FEEDBACKS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
  } as FeedbackFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    FEEDBACKS: "/admin/feedbacks",
    FEEDBACK_VIEW: (id: string | number) => `/admin/feedbacks/${id}`,
  },

  // Status values
  STATUS: {
    PENDING: 1, // Chưa xử lý
    PROCESSED: 2, // Đã xử lý
  },

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    USER: "user",
    EMAIL: "email",
    PHONE: "phone",
    MESSAGE: "message",
    STATUS: "status",
    CREATED_AT: "createdAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 20,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 1000,
  },

  // API endpoints
  API: {
    FEEDBACKS: "/api/admin/feedbacks",
    FEEDBACK_BY_ID: (id: string | number) => `/api/admin/feedbacks/${id}`,
  },
} as const;
