import type { BlogFilterState } from "@/types/admin/blog";

export const BLOG_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
    dateFrom: "",
    dateTo: "",
  } as BlogFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  // Status options
  STATUS_OPTIONS: [
    { id: "draft", name: "Bản nháp" },
    { id: "published", name: "Đã xuất bản" },
    { id: "archived", name: "Đã lưu trữ" },
  ] as const,

  // Category options
  CATEGORY_OPTIONS: [
    { id: "AI", name: "AI" },
    { id: "Công nghệ", name: "Công nghệ" },
    { id: "Kinh doanh", name: "Kinh doanh" },
    { id: "Marketing", name: "Marketing" },
    { id: "Giáo dục", name: "Giáo dục" },
    { id: "Lối sống", name: "Lối sống" },
  ] as const,

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    TITLE: "title",
    CATEGORY: "category",
    STATUS: "status",
    FEATURED_IMAGE: "featuredImage",
    PUBLISHED_AT: "publishedAt",
    ACTIONS: "actions",
  },

  // Form validation
  VALIDATION: {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    EXCERPT_MIN_LENGTH: 10,
    EXCERPT_MAX_LENGTH: 500,
    CONTENT_MIN_LENGTH: 50,
    TAGS_MAX_COUNT: 10,
  },

  // API endpoints
  API: {
    BLOGS: "/api/admin/blogs",
    BLOG_BY_ID: (id: string | number) => `/api/admin/blogs/${id}`,
  },

  // Routes
  ROUTES: {
    BLOGS: "/admin/blogs",
    BLOG_CREATE: "/admin/blogs/create",
    BLOG_EDIT: (id: string | number) => `/admin/blogs/${id}`,
    BLOG_VIEW: (id: string | number) => `/admin/blogs/${id}/view`,
  },

  // Status values
  STATUS: {
    DRAFT: "draft",
    PUBLISHED: "published",
    ARCHIVED: "archived",
  },

  // Category values
  CATEGORY: {
    AI: "AI",
    TECHNOLOGY: "Công nghệ",
    BUSINESS: "Kinh doanh",
    MARKETING: "Marketing",
    EDUCATION: "Giáo dục",
    LIFESTYLE: "Lối sống",
  },
} as const;
