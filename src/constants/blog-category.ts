import type { BlogCategoryFilterState } from "@/types/admin/blog-category";

export const BLOG_CATEGORY_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
  } as BlogCategoryFilterState,

  // Messages
  MESSAGES: {
    DELETE_SUCCESS: "Blog Category đã được xóa thành công",
    DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa blog category này không?",
    CREATE_SUCCESS: "Blog Category đã được tạo thành công",
    UPDATE_SUCCESS: "Blog Category đã được cập nhật thành công",
  },

  // Form fields
  FORM: {
    FIELDS: {
      NAME: {
        LABEL: "Tên Blog Category",
        PLACEHOLDER: "Nhập tên blog category",
      },
      DESCRIPTION: {
        LABEL: "Mô tả",
        PLACEHOLDER: "Nhập mô tả blog category",
      },
    },
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Routes
  ROUTES: {
    BLOG_CATEGORIES: "/admin/blog-category",
    BLOG_CATEGORY_CREATE: "/admin/blog-category/create",
    BLOG_CATEGORY_EDIT: (id: string | number) => `/admin/blog-category/${id}`,
  },

  // Table columns
  TABLE: {
    COLUMNS: {
      ID: "id",
      NAME: "name",
      DESCRIPTION: "description",
      CREATED_AT: "createdAt",
      UPDATED_AT: "updatedAt",
      ACTIONS: "actions",
    },
  },

  // Form validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 500,
  },

  // API endpoints
  API: {
    BLOG_CATEGORIES: "/api/admin/blog-categories",
    BLOG_CATEGORY_BY_ID: (id: string | number) =>
      `/api/admin/blog-categories/${id}`,
  },
} as const;
