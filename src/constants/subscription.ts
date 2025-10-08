/**
 * Subscription Types Constants
 * Centralized constants for subscription types used across the application
 */

import type { User } from "@/types";

export const ESubscriptionType = {
  FREE: 1,
  PREMIUM: 2,
  TOKEN_PRO: 3,
  LEGACY: 4,
  PRO: 5,
  BUSINESS: 11, // Gói Doanh Nghiệp
} as const;

export const SUBSCRIPTION_NAMES = {
  [ESubscriptionType.FREE]: "Free",
  [ESubscriptionType.PREMIUM]: "PREMIUM",
  [ESubscriptionType.TOKEN_PRO]: "Token Pro",
  [ESubscriptionType.LEGACY]: "LEGACY",
  [ESubscriptionType.PRO]: "PRO",
  [ESubscriptionType.BUSINESS]: "Doanh Nghiệp",
} as const;

export const SUBSCRIPTION_BILLING_CYCLES = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
  LIFETIME: "lifetime",
} as const;

export const SUBSCRIPTION_FEATURES = {
  PREMIUM_PROMPTS: "Truy cập Premium prompts",
  AI_DOCUMENTS: "Truy cập tài liệu AI không giới hạn, cập nhật hàng tuần",
  CUSTOM_PROMPTS: "Prompt tùy chỉnh cá nhân hóa không giới hạn",
  PROMPT_UPGRADE: "Sử dụng trình nâng cấp và cá nhân hoá prompt",
  REMOVE_ADS: "Loại bỏ quảng cáo",
  MASTER_PROMPTER:
    "Sử dụng Prom's Master Prompter để tạo system prompt cho cá nhân và doanh nghiệp",
  AI_MARKETING_MODULE: "1 Module áp dụng AI vào Marketing từ Hiếu AI",
  AI_CONSULTATION: "1 giờ tư vấn từ Hiếu AI ( trị giá 4 triệu )",
  BUSINESS_PROMPTS: "200 prompts cá nhân hóa theo yêu cầu doanh nghiệp",
} as const;

export const CONTACT_TYPES = {
  GENERAL: 1,
  ENTERPRISE: 2,
} as const;

export const BUTTON_TEXTS = {
  DEFAULT: "Mặc định",
  CURRENT: "Hiện tại",
  UPGRADE: "Nâng cấp",
  REGISTER: "Đăng ký",
  CONTACT: "Liên hệ",
  CONTACT_CONSULTATION: "Liên hệ tư vấn",
} as const;

// Premium subscription types (for backward compatibility)
export const PREMIUM_SUBSCRIPTION_TYPES = [
  ESubscriptionType.PREMIUM,
  ESubscriptionType.PRO,
  ESubscriptionType.BUSINESS,
  ESubscriptionType.LEGACY,
];

// Free subscription types (for backward compatibility)
export const FREE_SUBSCRIPTION_TYPES = [ESubscriptionType.FREE];

// Utility functions
export const getSubscriptionName = (subscriptionType: number) => {
  return (
    SUBSCRIPTION_NAMES[subscriptionType as keyof typeof SUBSCRIPTION_NAMES] ||
    "Unknown"
  );
};

export const getSubscriptionColor = (subscriptionType: number) => {
  const colors = {
    [ESubscriptionType.FREE]: "#6B7280", // gray
    [ESubscriptionType.PREMIUM]: "#8B5CF6", // purple
    [ESubscriptionType.PRO]: "#10B981", // emerald
    [ESubscriptionType.BUSINESS]: "#F59E0B", // amber
    [ESubscriptionType.LEGACY]: "#EF4444", // red
    [ESubscriptionType.TOKEN_PRO]: "#3B82F6", // blue
  };
  return colors[subscriptionType as keyof typeof colors] || "#6B7280";
};

/**
 * Admin Screen Permissions Enum
 * Defines all available admin screens
 */
export const ADMIN_SCREENS = {
  // Dashboard & Analytics
  DASHBOARD: "dashboard",

  // Content Management
  PROMPT: "prompt",
  BLOG: "blog",
  BLOG_CATEGORY: "blogCategory",
  TOPIC: "topic",
  CATEGORY: "category",
  INDUSTRY: "industry",
  PRODUCT: "product",

  // User Management
  USER: "user",
  ROLE: "role",

  // Business Management
  SUBSCRIPTION: "subscription",
  COUPON: "coupon",
  PAYMENT: "payment",

  // Communication
  CONTACT: "contact",
  SEND_MAIL: "sendMail",

  // Tools & Utilities
  TOOL: "tool",
  UPLOAD_WORD: "uploadWord",
} as const;

/**
 * Screen display names for UI
 */
export const SCREEN_DISPLAY_NAMES = {
  [ADMIN_SCREENS.DASHBOARD]: "Dashboard",
  [ADMIN_SCREENS.PROMPT]: "Quản lý Prompts",
  [ADMIN_SCREENS.BLOG]: "Quản lý Blog",
  [ADMIN_SCREENS.BLOG_CATEGORY]: "Quản lý loại Blog",
  [ADMIN_SCREENS.TOPIC]: "Quản lý chủ đề",
  [ADMIN_SCREENS.CATEGORY]: "Quản lý thể loại",
  [ADMIN_SCREENS.INDUSTRY]: "Quản lý ngành nghề",
  [ADMIN_SCREENS.PRODUCT]: "Quản lý sản phẩm",
  [ADMIN_SCREENS.USER]: "Quản lý User",
  [ADMIN_SCREENS.ROLE]: "Quản lý vai trò",
  [ADMIN_SCREENS.SUBSCRIPTION]: "Quản lý gói đăng ký",
  [ADMIN_SCREENS.COUPON]: "Quản lý Coupon",
  [ADMIN_SCREENS.PAYMENT]: "Quản lý Thanh toán",
  [ADMIN_SCREENS.CONTACT]: "Support",
  [ADMIN_SCREENS.SEND_MAIL]: "Gửi Mail hàng loạt",
  [ADMIN_SCREENS.TOOL]: "Quản lý Tool",
  [ADMIN_SCREENS.UPLOAD_WORD]: "Quản lý Upload",
} as const;

/**
 * Default permissions for role = 3 (limited admin)
 * Simple array of screen names that role = 3 can access
 */
export const DEFAULT_ROLE_3_PERMISSIONS = [
  ADMIN_SCREENS.PROMPT,
  ADMIN_SCREENS.BLOG,
  ADMIN_SCREENS.BLOG_CATEGORY,
  ADMIN_SCREENS.TOPIC,
  ADMIN_SCREENS.CATEGORY,
  ADMIN_SCREENS.INDUSTRY,
  ADMIN_SCREENS.CONTACT,
];

/**
 * Check if user has permission to access a specific screen
 * @param user - User object with role and permissions
 * @param screen - Screen to check access for
 * @returns Whether user has permission
 */
export const hasPermission = (user: User | null, screen: string) => {
  if (!user) return false;

  // Super admin (role = 2) has access to everything
  if (user.role === 2) return true;

  // Tất cả role > 1 có permissions - check permissions
  if (user.role > 1) {
    let userPermissions = user.permissions || [];

    // Handle case where permissions might be a string
    if (typeof userPermissions === "string") {
      try {
        // Try to parse as JSON first
        userPermissions = JSON.parse(userPermissions);
      } catch {
        // If not JSON, try to split by comma
        userPermissions = (userPermissions as string)
          .split(",")
          .map((p: string) => p.trim())
          .filter((p: string) => p);
      }
    }

    // Ensure it's an array
    if (!Array.isArray(userPermissions)) {
      userPermissions = [];
    }

    return userPermissions.includes(screen);
  }

  // Other roles have no admin access
  return false;
};

/**
 * Get all screens that user has access to
 * @param user - User object
 * @returns Array of screen keys user can access
 */
export const getAccessibleScreens = (user: User | null) => {
  if (!user) return [];

  // Super admin has access to all screens
  if (user.role === 2) {
    return Object.values(ADMIN_SCREENS);
  }

  // Tất cả role > 1 có permissions - check permissions
  if (user.role > 1) {
    let userPermissions = user.permissions || [];

    // Handle case where permissions might be a string
    if (typeof userPermissions === "string") {
      try {
        // Try to parse as JSON first
        userPermissions = JSON.parse(userPermissions);
      } catch {
        // If not JSON, try to split by comma
        userPermissions = (userPermissions as string)
          .split(",")
          .map((p: string) => p.trim())
          .filter((p: string) => p);
      }
    }

    // Ensure it's an array
    if (!Array.isArray(userPermissions)) {
      userPermissions = [];
    }

    return userPermissions;
  }

  return [];
};

/**
 * Get permission options for role management
 * @returns Array of permission options for select boxes
 */
export const getPermissionOptions = () => {
  const options: Array<{ label: string; value: string }> = [];

  Object.entries(SCREEN_DISPLAY_NAMES).forEach(([screenKey, displayName]) => {
    options.push({
      label: displayName,
      value: screenKey,
    });
  });

  return options;
};

/**
 * Convert permissions array to array format for select boxes
 * @param permissions - Permissions array
 * @returns Array of permission strings
 */
export const permissionsToArray = (permissions: unknown) => {
  if (!permissions) return [];
  return Array.isArray(permissions) ? permissions : [];
};

/**
 * Convert array format back to permissions array
 * @param permissionArray - Array of permission strings
 * @returns Permissions array
 */
export const arrayToPermissions = (permissionArray: unknown) => {
  if (!permissionArray) return [];
  return Array.isArray(permissionArray) ? permissionArray : [];
};

/**
 * Get default permissions for role = 3
 * @returns Default permissions array
 */
export const getDefaultRole3Permissions = () => {
  return DEFAULT_ROLE_3_PERMISSIONS;
};
