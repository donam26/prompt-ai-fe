import type { SectionFilterState } from "@/types/admin/section";

export const SECTIONS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    searchTerm: "",
  } as SectionFilterState,

  // Messages
  MESSAGES: {
    DELETE_SUCCESS: "Section đã được xóa thành công",
    DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa section này không?",
    CREATE_SUCCESS: "Section đã được tạo thành công",
    UPDATE_SUCCESS: "Section đã được cập nhật thành công",
  },

  // Form fields
  FORM: {
    FIELDS: {
      NAME: {
        LABEL: "Tên Section",
        PLACEHOLDER: "Nhập tên section",
      },
      DESCRIPTION: {
        LABEL: "Mô tả",
        PLACEHOLDER: "Nhập mô tả section",
      },
      STATUS: {
        LABEL: "Trạng thái",
        PLACEHOLDER: "Chọn trạng thái",
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
    SECTIONS: "/admin/sections",
    SECTION_CREATE: "/admin/sections/create",
    SECTION_EDIT: (id: string | number) => `/admin/sections/${id}`,
  },

  // Status values
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
  },

  // Status options
  STATUS_OPTIONS: [
    { id: "active", name: "Hoạt động" },
    { id: "inactive", name: "Không hoạt động" },
  ],

  // Table columns
  TABLE_COLUMNS: {
    ID: "id",
    NAME: "name",
    DESCRIPTION: "description",
    STATUS: "status",
    CREATED_AT: "createdAt",
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
    SECTIONS: "/api/admin/sections",
    SECTION_BY_ID: (id: string | number) => `/api/admin/sections/${id}`,
  },
} as const;
