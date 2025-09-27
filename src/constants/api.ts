// API Endpoints Constants
export const ENDPOINTS = {
  // Prompt endpoints
  PROMPTS: {
    BASE: "/prompts",
    UPLOAD: "/prompts/upload",
    BY_CATEGORY: "/prompts/by-category",
    TOPICS_BY_CATEGORY: "/prompts/topics/by-category",
    NEWEST: "/prompts/newest",
    RELATED: "/prompts/related",
    FAVORITE: "/promptfavorite",
    FAVORITE_BY_SECTION: "/promptfavorite/list/by-section",
    IMPORT_EXCEL: "/prompts/import-excel",
    EXPORT_EXCEL: "/prompts/export-excel-enhanced",
  },

  // Category endpoints
  CATEGORIES: {
    BASE: "/categories",
    BY_SECTION: "/categories/by-sectionId",
  },

  // Section endpoints
  SECTIONS: {
    BASE: "/sections",
  },

  // Topic endpoints
  TOPICS: {
    BASE: "/topic",
    LIST: "/topic/list",
  },

  // Contact endpoints
  CONTACTS: {
    BASE: "/contact",
    LIST: "/contact/list",
    EXPORT: "/contact/export",
    SURVEY: "/contact/survey",
    SURVEY_TEST: "/contact/survey-test",
  },

  // Subscription endpoints
  SUBSCRIPTIONS: {
    BASE: "/subscriptions",
    LIST: "/subscriptions/list",
    BY_DURATION: "/subscriptions/by-duration",
    BY_DURATION_AND_TYPE: "/subscriptions/by-duration-and-type",
  },

  // Blog endpoints
  BLOGS: {
    BASE: "/blog",
    LIST: "/blog/list",
  },

  // Blog Category endpoints
  BLOG_CATEGORIES: {
    BASE: "/blogcategory",
    LIST: "/blogcategory/list",
  },

  // User endpoints
  USERS: {
    BASE: "/users",
    AUTH_GOOGLE: "/users/auth/google",
    LOGIN: "/users/login",
    LOGIN_VERIFY: "/users/login-verify",
    LOGIN_PASSWORD: "/users/login-password",
    VERIFY_OTP: "/users/verify-otp",
    RESEND_OTP: "/users/resend-otp",
    REGISTER: "/users/register",
    FORGOT_PASSWORD: "/users/forgot-password",
    RESET_PASSWORD: "/users/reset-password",
    COUNT_PROMPT: "/users/count-prompt",
    LIST: "/users/list",
    UPDATE_INFO: "/users/update-info",
    CHANGE_PASSWORD: "/users/change-password",
    SUBSCRIPTIONS: "/users/subscriptions",
    EXPORT_EXCEL: "/users/export-excel",
  },

  // Product endpoints
  PRODUCTS: {
    BASE: "/products",
  },

  // Device Log endpoints
  DEVICE_LOGS: {
    BASE: "/devicelogs",
  },

  // Referral endpoints
  REFERRAL: {
    GET_DISCOUNT: "/referral/get-discount",
  },

  // Payment endpoints
  PAYMENT: {
    INDEX: "/payment",
    CREATE_URL: "/payment/create_payment_url",
    FILTER: "/payment/filter",
    EXPORT: "/payment/export",
  },

  // Chat endpoints
  CHAT: {
    GPT: "/chat/gpt",
  },

  // History endpoints
  HISTORY: {
    USER: "/history/user",
  },

  // Coupon endpoints
  COUPONS: {
    BASE: "/coupons",
    USERS: "/coupons/users",
    VALIDATE: "/coupons/validate",
  },

  // Role endpoints
  ROLES: {
    BASE: "/roles",
    DELETED: "/roles/deleted/list",
    USERS: "/roles/users",
    ASSIGN_MULTIPLE: "/roles/assign-multiple-users",
    REMOVE_USER: "/roles/remove-user",
    USER_STATS: "/stats/users-by-role",
  },

  // Industry endpoints
  INDUSTRIES: {
    BASE: "/industries",
  },

  // Admin endpoints
  ADMIN: {
    INDUSTRIES: "/admin/industries",
    CATEGORIES: "/admin/categories",
    SECTIONS: "/admin/sections",
  },
} as const;

// Query parameter keys
export const QUERY_PARAMS = {
  PAGE: "page",
  PAGE_SIZE: "pageSize",
  SEARCH: "search",
  SEARCH_TEXT: "search_text",
  SEARCH_TXT: "searchTxt",
  CATEGORY_ID: "category_id",
  TOPIC_ID: "topicId",
  INDUSTRY_ID: "industryId",
  SECTION_ID: "section_id",
  USER_ID: "user_id",
  PROMPT_ID: "prompt_id",
  IS_TYPE: "is_type",
  SUB_TYPE: "sub_type",
  TYPE: "type",
  STATUS: "status",
  DURATION: "duration",
  LIST_CATEGORY: "listCategory",
  PASSWORD: "password",
  NEW_PASSWORD: "newPassword",
  CODE: "code",
  TOTAL: "total",
  TOTAL_PRICE: "totalPrice",
} as const;
