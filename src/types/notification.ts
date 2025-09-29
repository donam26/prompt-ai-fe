/**
 * Notification related types
 */

// Notification entity
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  expiresAt?: string;
}

// Toast notification
export interface ToastNotification {
  id: string;
  title?: string;
  message: string;
  type: "success" | "error" | "warning" | "info" | "loading";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
