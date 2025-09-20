// Common utility types for reuse across the application

// Generic response wrapper
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

// Cache configuration
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  key: string;
  tags?: string[];
}

// Event types
export interface BaseEvent {
  type: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

export interface UserEvent extends BaseEvent {
  type: "login" | "logout" | "register" | "update_profile" | "change_password";
  data?: Record<string, unknown>;
}

export interface SystemEvent extends BaseEvent {
  type: "error" | "warning" | "info" | "debug";
  level: "low" | "medium" | "high" | "critical";
  message: string;
  stack?: string;
}

// Configuration types
export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  auth: {
    tokenExpiry: number;
    refreshTokenExpiry: number;
    sessionTimeout: number;
  };
  ui: {
    theme: Theme;
    language: Language;
    animations: boolean;
  };
  features: {
    notifications: boolean;
    analytics: boolean;
    darkMode: boolean;
  };
}

// Generic entity with ID
export interface Entity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
}

// Generic entity with soft delete
export interface SoftDeleteEntity extends Entity {
  deletedAt?: string;
  isDeleted: boolean;
}

// Generic entity with status
export interface StatusEntity extends Entity {
  status: Status;
}

// Generic entity with timestamps and status
export interface FullEntity extends SoftDeleteEntity, StatusEntity {}

// Generic CRUD operations
export interface CrudOperations<T extends Entity> {
  create: (data: Omit<T, "id" | "createdAt" | "updatedAt">) => Promise<T>;
  read: (id: T["id"]) => Promise<T | null>;
  update: (
    id: T["id"],
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ) => Promise<T>;
  delete: (id: T["id"]) => Promise<boolean>;
  list: (filters?: Record<string, unknown>) => Promise<T[]>;
}

// Generic service response
export interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic hook return type
export interface HookResult<T = unknown> {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Generic mutation result
export interface MutationResult<T = unknown> {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  mutate: (variables: unknown) => void;
  reset: () => void;
}
