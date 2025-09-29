/**
 * Base types và interfaces chung cho toàn bộ dự án
 * Tuân thủ convention: PascalCase cho interfaces, camelCase cho properties
 */

// Base entity interface với các field chung
export interface BaseEntity {
  id: any;
  created_at: string;
  updated_at: string;
}

// Base entity với soft delete
export interface BaseEntityWithDelete extends BaseEntity {
  deleted_at?: string;
}

// Base entity cho admin
export interface BaseAdminEntity extends BaseEntity {
  is_active: boolean;
  status?: string;
}

// ID type union
export type EntityId = string | number;

// Timestamp type
export type Timestamp = string;

// Status enums
export type EntityStatus =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "deleted";
export type UserRole = "admin" | "user" | "moderator" | "guest";
export type Theme = "light" | "dark" | "system";
export type Language = "vi" | "en" | "ja" | "ko" | "zh";

// File upload types
export interface FileUpload {
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface ImageUpload extends FileUpload {
  width?: number;
  height?: number;
  alt?: string;
}

// Sort và Filter types
export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterOptions {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "like" | "in" | "nin";
  value: unknown;
}

export interface SearchOptions {
  query: string;
  fields: string[];
  caseSensitive?: boolean;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// Pagination types
export interface PaginationMeta {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  pageIndex: number;
  pageSize: number;
}

// Auth parameters
export interface AuthParams {
  email: string;
  password?: string;
  userIP?: string;
  otp?: string;
  credential?: string;
}

// Filter parameters
export interface FilterParams {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

// Common form props interface
export interface BaseFormProps<T = Record<string, unknown>> {
  formData: T;
  errors: Partial<Record<keyof T, string>>;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

// Common filter props interface
export interface BaseFilterProps<T = Record<string, unknown>> {
  filters: T;
  onFilterChange: (filters: T) => void;
  onClearFilters: () => void;
  onPageReset?: () => void;
  className?: string;
}

// Common column handlers interface
export interface BaseColumnHandlers<T = unknown> {
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}
