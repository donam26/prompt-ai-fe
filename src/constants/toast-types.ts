export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface ShowToastOptions {
  type?: ToastType;
  title?: string;
  description?: string;
  duration?: number;
}
