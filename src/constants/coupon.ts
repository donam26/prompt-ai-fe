import type { CouponFilterState } from "@/types/admin/coupon";

/**
 * Coupon management constants
 */
export const COUPON_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    type: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  } as CouponFilterState,

  // Routes
  ROUTES: {
    COUPONS: "/admin/coupons",
    COUPON_CREATE: "/admin/coupons/create",
    COUPON_EDIT: (id: string | number) => `/admin/coupons/${id}`,
    COUPON_DETAIL: (id: string | number) => `/admin/coupons/${id}`,
  },

  // Messages
  MESSAGES: {
    CREATE_SUCCESS: "Tạo mã giảm giá thành công",
    UPDATE_SUCCESS: "Cập nhật mã giảm giá thành công",
    DELETE_SUCCESS: "Xóa mã giảm giá thành công",
    DELETE_ERROR: "Có lỗi xảy ra khi xóa mã giảm giá",
    SAVE_ERROR: "Có lỗi xảy ra khi lưu mã giảm giá",
    COPY_SUCCESS: "Mã giảm giá đã được copy vào clipboard",
    COPY_ERROR: "Không thể copy mã giảm giá",
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Table columns
  TABLE_COLUMNS: {
    CODE: "code",
    DISCOUNT: "discount",
    TYPE: "type",
    USAGE: "usage",
    STATUS: "status",
    EXPIRY_DATE: "expiryDate",
    CREATED_AT: "createdAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    CODE_MIN_LENGTH: 3,
    CODE_MAX_LENGTH: 20,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 500,
    VALUE_MIN: 0,
    VALUE_MAX: 1000000,
    USAGE_LIMIT_MIN: 1,
    USAGE_LIMIT_MAX: 1000000,
  },

  // Coupon types
  TYPES: {
    PERCENT: "percent",
    FIXED: "fixed",
  },

  // Coupon statuses
  STATUSES: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    EXPIRED: "expired",
    USED_UP: "used_up",
  },

  // Type labels
  TYPE_LABELS: {
    percent: "Phần trăm",
    fixed: "Số tiền cố định",
  },

  // Status labels
  STATUS_LABELS: {
    active: "Hoạt động",
    inactive: "Không hoạt động",
    expired: "Hết hạn",
    used_up: "Hết lượt sử dụng",
  },
} as const;
