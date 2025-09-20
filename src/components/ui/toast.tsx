"use client";

import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { TOAST_CONFIG, TOAST_DURATION, TOAST_ICONS } from "@/constants/toast";
import type { ToastType, ShowToastOptions } from "@/constants/toast-types";

// Helper functions
const getToastBackgroundColor = (type: ToastType): string => {
  return TOAST_CONFIG.colors[type];
};

const createToastContainerStyle = (type: ToastType): React.CSSProperties => ({
  ...TOAST_CONFIG.styles.container,
  background: getToastBackgroundColor(type),
});

const createToastTitleStyle = (): React.CSSProperties =>
  TOAST_CONFIG.styles.title;

const createToastMessageStyle = (
  hasDescription: boolean
): React.CSSProperties => ({
  ...TOAST_CONFIG.styles.message,
  marginBottom: hasDescription ? "4px" : "0",
});

const createToastDescriptionStyle = (): React.CSSProperties =>
  TOAST_CONFIG.styles.description;

function showToast(message: string, options?: ShowToastOptions) {
  const {
    type = "info",
    title,
    description,
    duration = TOAST_DURATION.DEFAULT,
    ...rest
  } = options || {};

  // Create toast content using helper functions
  const createToastContent = () => {
    const IconComponent = TOAST_ICONS[type];

    return (
      <div style={createToastContainerStyle(type)}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          {/* Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2px",
              flexShrink: 0,
            }}
          >
            <IconComponent
              size={20}
              style={{
                color: "white",
                animation:
                  type === "loading" ? "spin 1s linear infinite" : "none",
              }}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && <div style={createToastTitleStyle()}>{title}</div>}
            <div style={createToastMessageStyle(!!description)}>{message}</div>
            {description && (
              <div style={createToastDescriptionStyle()}>{description}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Use toast.custom with clean helper functions
  return toast.custom(() => createToastContent(), {
    duration: type === "loading" ? TOAST_DURATION.LOADING : duration,
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
      boxShadow: "none",
    },
    className: "!z-[99999]",
    ...rest,
  });
}

// Convenience functions
showToast.success = (
  message: string,
  options?: Omit<ShowToastOptions, "type">
) => showToast(message, { ...options, type: "success" });

showToast.error = (message: string, options?: Omit<ShowToastOptions, "type">) =>
  showToast(message, { ...options, type: "error" });

showToast.warning = (
  message: string,
  options?: Omit<ShowToastOptions, "type">
) => showToast(message, { ...options, type: "warning" });

showToast.info = (message: string, options?: Omit<ShowToastOptions, "type">) =>
  showToast(message, { ...options, type: "info" });

showToast.loading = (
  message: string,
  options?: Omit<ShowToastOptions, "type">
) => showToast(message, { ...options, type: "loading" });

// Toast component for rendering
export const Toast = () => (
  <Toaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerStyle={{
      zIndex: 99999,
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
    }}
    toastOptions={{
      style: {
        background: "transparent",
        border: "none",
        padding: 0,
        boxShadow: "none",
      },
      className: "!z-[99999]",
    }}
  />
);

// Re-export types for backward compatibility
export type { ToastType, ShowToastOptions } from "@/constants/toast-types";

export { showToast };
export default Toast;
