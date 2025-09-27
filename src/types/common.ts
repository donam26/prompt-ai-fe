export interface ResponseWrapper<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Pagination metadata
export interface PaginationMeta {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Paginated response
export interface PaginatedResponse<T = unknown> extends ResponseWrapper<T[]> {
  pagination: PaginationMeta;
}

export interface ApiResponse<T = unknown> extends ResponseWrapper<T> {
  pagination: PaginationMeta;
}

// Sort options
export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

// Filter options
export interface FilterOptions {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "like" | "in" | "nin";
  value: unknown;
}

// Search options
export interface SearchOptions {
  query: string;
  fields: string[];
  caseSensitive?: boolean;
}

// Date range
export interface DateRange {
  startDate: string;
  endDate: string;
}

// Status types
export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "deleted";

// Role types
export type UserRole = "admin" | "user" | "moderator" | "guest";

// Permission types
export type Permission =
  | "read"
  | "write"
  | "delete"
  | "admin"
  | "user:all"
  | "role:all"
  | "stats:all";

// Theme types
export type Theme = "light" | "dark" | "system";

// Language types
export type Language = "vi" | "en" | "ja" | "ko" | "zh";

// File upload types
export interface FileUpload {
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
}

// Image upload types
export interface ImageUpload extends FileUpload {
  width?: number;
  height?: number;
  alt?: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  expiresAt?: string;
}

// Toast notification types
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

// API endpoint configuration
export interface ApiEndpoint {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  timeout?: number;
}

// Generic service response
export interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IPagination {
  pageIndex: number;
  pageSize: number;
}
