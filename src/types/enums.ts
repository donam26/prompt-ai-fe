/**
 * Global enums and constants
 */

// Blog status enum
export enum BlogStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

// Blog status labels
export const BLOG_STATUS_LABELS = {
  [BlogStatus.DRAFT]: "Bản nháp",
  [BlogStatus.PUBLISHED]: "Đã xuất bản",
} as const;

// User role enum
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

// User role labels
export const USER_ROLE_LABELS = {
  [UserRole.ADMIN]: "Quản trị viên",
  [UserRole.USER]: "Người dùng",
  [UserRole.MODERATOR]: "Điều hành viên",
} as const;

// User status enum
export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

// User status labels
export const USER_STATUS_LABELS = {
  [UserStatus.ACTIVE]: "Hoạt động",
  [UserStatus.INACTIVE]: "Không hoạt động",
  [UserStatus.SUSPENDED]: "Bị đình chỉ",
} as const;

// Payment status enum
export enum PaymentStatus {
  COMPLETED = "completed",
  PENDING = "pending",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

// Payment status labels
export const PAYMENT_STATUS_LABELS = {
  [PaymentStatus.COMPLETED]: "Hoàn thành",
  [PaymentStatus.PENDING]: "Đang xử lý",
  [PaymentStatus.FAILED]: "Thất bại",
  [PaymentStatus.CANCELLED]: "Đã hủy",
} as const;

// Section status enum
export enum SectionStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// Section status labels
export const SECTION_STATUS_LABELS = {
  [SectionStatus.ACTIVE]: "Hoạt động",
  [SectionStatus.INACTIVE]: "Không hoạt động",
} as const;

// Category status enum
export enum CategoryStatus {
  ACTIVE = "active",
  COMING_SOON = "comingSoon",
}

// Category status labels
export const CATEGORY_STATUS_LABELS = {
  [CategoryStatus.ACTIVE]: "Hoạt động",
  [CategoryStatus.COMING_SOON]: "Sắp ra mắt",
} as const;

// Prompt type enum
export enum PromptType {
  FREE = 1,
  PREMIUM = 2,
}

// Prompt type labels
export const PROMPT_TYPE_LABELS = {
  [PromptType.FREE]: "Miễn phí",
  [PromptType.PREMIUM]: "Premium",
} as const;

// Industry status enum
export enum IndustryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// Industry status labels
export const INDUSTRY_STATUS_LABELS = {
  [IndustryStatus.ACTIVE]: "Hoạt động",
  [IndustryStatus.INACTIVE]: "Không hoạt động",
} as const;

// Re-export category type enum
export {
  CategoryType,
  CATEGORY_TYPE_LABELS,
  CATEGORY_TYPE_OPTIONS,
  isCategoryType,
  getCategoryTypeLabel,
} from "./enums/category-type";
