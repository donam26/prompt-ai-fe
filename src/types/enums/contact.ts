/**
 * Contact status enum for processing status
 */
export enum ContactStatus {
  UNREPLIED = 1,
  REPLIED = 2,
}

/**
 * Contact type enum for contact categories
 */
export enum ContactType {
  SUPPORT = 1,
  REGISTRATION = 2,
  OTHER = 3,
}

/**
 * Contact status configuration for UI display
 */
export const CONTACT_STATUS_CONFIG = {
  [ContactStatus.UNREPLIED]: {
    variant: "business" as const,
    label: "Chưa trả lời",
    color: "orange",
  },
  [ContactStatus.REPLIED]: {
    variant: "business" as const,
    label: "Đã trả lời",
    color: "green",
  },
  // Handle null/undefined case
  null: {
    variant: "default" as const,
    label: "Chưa trả lời",
    color: "orange",
  },
  undefined: {
    variant: "default" as const,
    label: "Chưa trả lời",
    color: "orange",
  },
} as const;

/**
 * Contact type configuration for UI display
 */
export const CONTACT_TYPE_CONFIG = {
  [ContactType.SUPPORT]: {
    label: "Hỗ trợ",
    color: "blue",
  },
  [ContactType.REGISTRATION]: {
    label: "Đăng ký",
    color: "purple",
  },
  [ContactType.OTHER]: {
    label: "Khác",
    color: "gray",
  },
  // Handle null/undefined case
  null: {
    label: "Hỗ trợ",
    color: "blue",
  },
  undefined: {
    label: "Hỗ trợ",
    color: "blue",
  },
} as const;

/**
 * Get contact status configuration by status value
 */
export const getContactStatusConfig = (status: number | null | undefined) => {
  return (
    CONTACT_STATUS_CONFIG[status as keyof typeof CONTACT_STATUS_CONFIG] || {
      variant: "business" as const,
      label: "Chưa trả lời",
      color: "orange",
    }
  );
};

/**
 * Get contact type configuration by type value
 */
export const getContactTypeConfig = (type: number | null | undefined) => {
  return (
    CONTACT_TYPE_CONFIG[type as keyof typeof CONTACT_TYPE_CONFIG] || {
      label: "Hỗ trợ",
      color: "blue",
    }
  );
};
