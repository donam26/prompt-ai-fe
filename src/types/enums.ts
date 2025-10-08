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
  USER = 1,
  ADMIN = 2,
  MARKETER = 3,
  NV_A_HIEU = 4,
  ANGELS = 5,
}

// User role labels
export const USER_ROLE_LABELS = {
  [UserRole.USER]: "User",
  [UserRole.ADMIN]: "Admin",
  [UserRole.MARKETER]: "Marketer",
  [UserRole.NV_A_HIEU]: "NV A Hiếu",
  [UserRole.ANGELS]: "Angels",
} as const;

// User role options
export const USER_ROLE_OPTIONS = [
  {
    value: UserRole.USER,
    label: USER_ROLE_LABELS[UserRole.USER],
  },
  {
    value: UserRole.ADMIN,
    label: USER_ROLE_LABELS[UserRole.ADMIN],
  },
  {
    value: UserRole.MARKETER,
    label: USER_ROLE_LABELS[UserRole.MARKETER],
  },
  {
    value: UserRole.NV_A_HIEU,
    label: USER_ROLE_LABELS[UserRole.NV_A_HIEU],
  },
  {
    value: UserRole.ANGELS,
    label: USER_ROLE_LABELS[UserRole.ANGELS],
  },
] as const;

// User role utility functions
export const getUserRoleLabel = (role: number): string => {
  return USER_ROLE_LABELS[role as UserRole] || "Unknown";
};

export const isAdminRole = (role: number): boolean => {
  return role === UserRole.ADMIN;
};

export const isMarketerRole = (role: number): boolean => {
  return role === UserRole.MARKETER;
};

export const isNVAHieuRole = (role: number): boolean => {
  return role === UserRole.NV_A_HIEU;
};

export const isAngelsRole = (role: number): boolean => {
  return role === UserRole.ANGELS;
};

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

// Billing cycle enum
export enum BillingCycle {
  YEARLY = "yearly",
  MONTHLY = "monthly",
  LIFETIME = "lifetime",
}

// Billing cycle labels
export const BILLING_CYCLE_LABELS = {
  [BillingCycle.YEARLY]: "Năm",
  [BillingCycle.MONTHLY]: "Tháng",
  [BillingCycle.LIFETIME]: "Trọn đời",
} as const;

// Billing cycle options
export const BILLING_CYCLE_OPTIONS = [
  {
    value: BillingCycle.YEARLY,
    label: BILLING_CYCLE_LABELS[BillingCycle.YEARLY],
  },
  {
    value: BillingCycle.MONTHLY,
    label: BILLING_CYCLE_LABELS[BillingCycle.MONTHLY],
  },
  {
    value: BillingCycle.LIFETIME,
    label: BILLING_CYCLE_LABELS[BillingCycle.LIFETIME],
  },
] as const;

// Billing cycle formatter
export const formatBillingCycle = (billingCycle: string): string => {
  return BILLING_CYCLE_LABELS[billingCycle as BillingCycle] || "Không xác định";
};

// Re-export category type enum
export {
  CategoryType,
  CATEGORY_TYPE_LABELS,
  CATEGORY_TYPE_OPTIONS,
  isCategoryType,
  getCategoryTypeLabel,
} from "./enums/category-type";
