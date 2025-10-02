import type { ProductFilterState } from "@/types/admin/product";

/**
 * Product management constants
 */
export const PRODUCT_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    categoryIds: [],
    dateFrom: "",
    dateTo: "",
  } as ProductFilterState,

  // Routes
  ROUTES: {
    PRODUCTS: "/admin/products",
    PRODUCT_CREATE: "/admin/products/create",
    PRODUCT_EDIT: (id: string | number) => `/admin/products/${id}`,
    PRODUCT_DETAIL: (id: string | number) => `/admin/products/${id}`,
  },

  // Messages
  MESSAGES: {
    CREATE_SUCCESS: "Tạo sản phẩm thành công",
    UPDATE_SUCCESS: "Cập nhật sản phẩm thành công",
    DELETE_SUCCESS: "Xóa sản phẩm thành công",
    DELETE_ERROR: "Có lỗi xảy ra khi xóa sản phẩm",
    SAVE_ERROR: "Có lỗi xảy ra khi lưu sản phẩm",
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Table columns
  TABLE_COLUMNS: {
    IMAGE: "image",
    NAME: "name",
    LINK: "link",
    SECTION: "section",
    CREATED_AT: "createdAt",
    UPDATED_AT: "updatedAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
  },
} as const;
