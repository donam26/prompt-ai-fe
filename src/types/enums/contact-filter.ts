/**
 * Contact filter status enum for frontend values
 */
export enum ContactFilterStatus {
  ALL = "all",
  UNREPLIED = "1",
  REPLIED = "2",
}

/**
 * Contact filter type enum for frontend values
 */
export enum ContactFilterType {
  ALL = "all",
  SUPPORT = "1",
  REGISTRATION = "2",
  OTHER = "3",
}

/**
 * Contact filter status display names
 */
export const CONTACT_FILTER_STATUS_LABELS = {
  [ContactFilterStatus.ALL]: "Tất cả trạng thái",
  [ContactFilterStatus.UNREPLIED]: "Chưa trả lời",
  [ContactFilterStatus.REPLIED]: "Đã trả lời",
} as const;

/**
 * Contact filter type display names
 */
export const CONTACT_FILTER_TYPE_LABELS = {
  [ContactFilterType.ALL]: "Tất cả loại",
  [ContactFilterType.SUPPORT]: "Hỗ trợ",
  [ContactFilterType.REGISTRATION]: "Đăng ký",
  [ContactFilterType.OTHER]: "Khác",
} as const;

/**
 * Map frontend status values to database values
 */
export const mapStatusToDbValue = (status: string): number | undefined => {
  if (status === ContactFilterStatus.ALL) return undefined;
  if (status === ContactFilterStatus.UNREPLIED) return 1;
  if (status === ContactFilterStatus.REPLIED) return 2;
  return undefined;
};

/**
 * Map frontend type values to database values
 */
export const mapTypeToDbValue = (type: string): number | undefined => {
  if (type === ContactFilterType.ALL) return undefined;
  return parseInt(type) || undefined;
};

/**
 * Get status display name
 */
export const getStatusDisplayName = (status: string): string => {
  return CONTACT_FILTER_STATUS_LABELS[status as ContactFilterStatus] || status;
};

/**
 * Get type display name
 */
export const getTypeDisplayName = (type: string): string => {
  return CONTACT_FILTER_TYPE_LABELS[type as ContactFilterType] || type;
};
