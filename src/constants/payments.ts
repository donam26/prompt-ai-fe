import type { PaymentFilterState } from "@/types/admin/payment";

/**
 * Payments constants following Berklee pattern
 */
export const PAYMENTS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    status: "all",
    method: "all",
    dateRange: {
      from: "",
      to: "",
    },
  } as PaymentFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    PAYMENTS: "/admin/payments",
    PAYMENT_VIEW: (id: string | number) => `/admin/payments/${id}/view`,
  },

  // Status values
  STATUS: {
    PENDING: "pending",
    COMPLETED: "completed",
    FAILED: "failed",
    REFUNDED: "refunded",
  },

  // Payment method values
  PAYMENT_METHOD: {
    CREDIT_CARD: "credit_card",
    BANK_TRANSFER: "bank_transfer",
    PAYPAL: "paypal",
    STRIPE: "stripe",
  },

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    USER: "user",
    AMOUNT: "amount",
    STATUS: "status",
    PAYMENT_METHOD: "payment_method",
    CREATED_AT: "created_at",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    AMOUNT_MIN: 0,
    AMOUNT_MAX: 999999.99,
  },

  // API endpoints
  API: {
    PAYMENTS: "/api/admin/payments",
    PAYMENT_BY_ID: (id: string | number) => `/api/admin/payments/${id}`,
  },
} as const;
