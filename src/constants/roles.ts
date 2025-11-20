import type { RoleFilterState } from "@/types";

export const ROLE_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
  } as RoleFilterState,

  // Messages
  MESSAGES: {
    DELETE_SUCCESS: "Vai trò đã được xóa thành công",
    DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa vai trò này không?",
    CREATE_SUCCESS: "Vai trò đã được tạo thành công",
    UPDATE_SUCCESS: "Vai trò đã được cập nhật thành công",
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    NAME: "name",
    DESCRIPTION: "description",
    PERMISSIONS: "permissions",
    USERS_COUNT: "usersCount",
    CREATED_AT: "createdAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 500,
    PERMISSIONS_MIN_COUNT: 1,
  },

  // API endpoints
  API: {
    ROLES: "/api/admin/roles",
    ROLE_BY_ID: (id: string | number) => `/api/admin/roles/${id}`,
  },

  // Routes
  ROUTES: {
    ROLES: "/admin/roles",
    ROLE_CREATE: "/admin/roles/create",
    ROLE_EDIT: (id: string | number) => `/admin/roles/${id}`,
    ROLE_VIEW: (id: string | number) => `/admin/roles/${id}/view`,
  },

  // Screen permissions - based on ADMIN_SCREENS and sidebar-config
  // Note: These are in camelCase format as used in frontend
  // API may return snake_case (blog_category, send_mail, upload_word) which will be normalized
  PERMISSIONS: [
    "dashboard",
    "prompt",
    "blog",
    "blogCategory",
    "topic",
    "category",
    "section",
    "industry",
    "product",
    "user",
    "users",
    "role",
    "roles",
    "subscription",
    "coupon",
    "payment",
    "contact",
    "feedback",
    "sendMail",
    "tool",
    "uploadWord",
  ],
} as const;
