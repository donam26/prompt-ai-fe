import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";

// Toast configuration constants
export const TOAST_CONFIG = {
  colors: {
    success: "#16a34a",
    error: "#dc2626",
    warning: "#f59e0b",
    info: "#2563eb",
    loading: "#6b7280",
  },
  styles: {
    container: {
      color: "white",
      padding: "12px 16px",
      borderRadius: "8px",
      minWidth: "220px",
      maxWidth: "400px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      zIndex: 99999,
      position: "relative" as const,
      fontSize: "14px",
      lineHeight: "1.5",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "white",
      display: "block" as const,
    },
    message: {
      color: "white",
      marginBottom: "4px",
      display: "block" as const,
    },
    description: {
      fontSize: "12px",
      opacity: 0.75,
      color: "white",
      display: "block" as const,
    },
  },
} as const;

// Toast icon mapping
export const TOAST_ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
} as const;

// Toast duration constants
export const TOAST_DURATION = {
  DEFAULT: 4000,
  LOADING: Infinity,
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;

// Toast position constants
export const TOAST_POSITION = {
  TOP_CENTER: "top-center",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
} as const;

// Toast z-index constants
export const TOAST_Z_INDEX = {
  CONTAINER: 99999,
  TOAST: 99999,
} as const;
