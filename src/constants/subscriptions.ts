import type { SubscriptionFilterState } from "@/types/admin/subscription";

export const SUBSCRIPTIONS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
  } as SubscriptionFilterState,

  // Messages
  MESSAGES: {
    DELETE_SUCCESS: "Gói đăng ký đã được xóa thành công",
    DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa gói đăng ký này không?",
    CREATE_SUCCESS: "Gói đăng ký đã được tạo thành công",
    UPDATE_SUCCESS: "Gói đăng ký đã được cập nhật thành công",
    LOAD_ERROR: "Lỗi khi tải danh sách gói đăng ký",
    SAVE_ERROR: "Lỗi khi lưu gói đăng ký",
    DELETE_ERROR: "Lỗi khi xóa gói đăng ký",
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    NAME: "name_sub",
    TOKEN: "duration",
    PRICE: "price",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MIN_LENGTH: 10,
    DESCRIPTION_MAX_LENGTH: 500,
    PRICE_MIN: 0,
    DURATION_MIN: 1,
  },

  // API endpoints
  API: {
    SUBSCRIPTIONS: "/api/admin/subscriptions",
    SUBSCRIPTION_BY_ID: (id: string | number) =>
      `/api/admin/subscriptions/${id}`,
  },

  // Routes
  ROUTES: {
    SUBSCRIPTIONS: "/admin/subscriptions",
    SUBSCRIPTION_CREATE: "/admin/subscriptions/create",
    SUBSCRIPTION_EDIT: (id: string | number) => `/admin/subscriptions/${id}`,
  },

  // Status values
  STATUS: {
    ACTIVE: 1,
    INACTIVE: 0,
  },
} as const;

// Helper functions
export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
