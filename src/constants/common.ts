/**
 * Common constants used across the application
 */

// Default pagination values
export const DEFAULT_TOTAL = 0;
export const DEFAULT_TOTAL_PAGES = 1;

// Default page sizes
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_INDEX = 0;

// Default pagination object
export const DEFAULT_PAGINATION = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
};

// Common error messages
export const DEFAULT_ERROR_MESSAGE = "An error occurred";
export const NETWORK_ERROR_MESSAGE = "Network error occurred";
export const UNAUTHORIZED_MESSAGE = "Unauthorized access";

// Form modes enum
export enum FormMode {
  CREATE = "create",
  EDIT = "edit",
}

// Common button texts
export const BUTTON_TEXT = {
  CREATE: "Create",
  EDIT: "Save",
  CREATING: "Creating...",
  SAVING: "Saving...",
  CANCEL: "Cancel",
  DELETE: "Delete",
  DELETING: "Deleting...",
  SUBMIT: "Submit",
  SUBMITTING: "Submitting...",
  RESET: "Reset",
  BACK: "Back",
  NEXT: "Next",
  PREVIOUS: "Previous",
  CONFIRM: "Confirm",
  CONFIRMING: "Confirming...",
} as const;
