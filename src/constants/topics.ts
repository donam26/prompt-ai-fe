/**
 * Topic management constants
 */

// Initial filter state for topics
export const TOPICS_CONSTANTS = {
  INITIAL_FILTERS: {
    searchTerm: "",
    dateFrom: "",
    dateTo: "",
  },
  ROUTES: {
    TOPIC_CREATE: "/admin/topics/create",
    TOPIC_EDIT: (id: string) => `/admin/topics/${id}`,
    TOPIC_LIST: "/admin/topics",
  },
  FORM: {
    FIELDS: {
      NAME: {
        LABEL: "Tên topic",
        PLACEHOLDER: "Nhập tên topic",
        REQUIRED: true,
      },
    },
    SPACING: "space-y-6",
    ACTIONS_SPACING: "space-y-3",
  },
  DIALOG_CONSTANTS: {
    CONTENT_CLASS: "shadow-lg border border-gray-200 sm:max-w-[500px]",
    TITLE_CLASS: "font-semibold text-gray-900 text-xl",
    HEADER_CLASS: "pb-4",
  },
  TABLE: {
    COLUMNS: {
      NAME: "Tên topic",
      CREATED_AT: "Ngày tạo",
      UPDATED_AT: "Cập nhật",
      ACTIONS: "Thao tác",
    },
  },
  MESSAGES: {
    CREATE_SUCCESS: "Tạo topic thành công",
    UPDATE_SUCCESS: "Cập nhật topic thành công",
    DELETE_SUCCESS: "Xóa topic thành công",
    DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa topic này?",
    DELETE_ERROR: "Có lỗi xảy ra khi xóa topic",
    LOAD_ERROR: "Có lỗi xảy ra khi tải danh sách topics",
  },
  VALIDATION: {
    NAME_REQUIRED: "Tên topic không được để trống",
    NAME_MIN_LENGTH: "Tên topic phải có ít nhất 2 ký tự",
    NAME_MAX_LENGTH: "Tên topic không được vượt quá 100 ký tự",
  },
} as const;

// Topic form default values
export const TOPIC_FORM_DEFAULTS = {
  name: "",
} as const;
