/**
 * Contact status enum for consistent status values across the application
 */
export enum ContactStatus {
  NEW = "new",
  READ = "read",
  REPLIED = "replied",
  CLOSED = "closed",
}

/**
 * Contact status configuration for UI display
 */
export const CONTACT_STATUS_CONFIG = {
  [ContactStatus.NEW]: {
    variant: "business" as const,
    label: "Mới",
    color: "blue",
  },
  [ContactStatus.READ]: {
    variant: "secondary" as const,
    label: "Đã đọc",
    color: "gray",
  },
  [ContactStatus.REPLIED]: {
    variant: "default" as const,
    label: "Đã phản hồi",
    color: "green",
  },
  [ContactStatus.CLOSED]: {
    variant: "sports" as const,
    label: "Đã đóng",
    color: "red",
  },
} as const;

/**
 * Contact status labels for Vietnamese display
 */
export const CONTACT_STATUS_LABELS = {
  [ContactStatus.NEW]: "Mới",
  [ContactStatus.READ]: "Đã đọc",
  [ContactStatus.REPLIED]: "Đã phản hồi",
  [ContactStatus.CLOSED]: "Đã đóng",
} as const;

/**
 * Get contact status configuration by status value
 */
export const getContactStatusConfig = (status: string) => {
  return (
    CONTACT_STATUS_CONFIG[status as ContactStatus] || {
      variant: "secondary" as const,
      label: status,
      color: "gray",
    }
  );
};
