// Export all hooks from a single entry point

// Store hooks
export * from "./stores";

// Auth hooks
export * from "./auth/useLoginQuery";
export * from "./auth/useResendOTPQuery";
export * from "./auth/useVerifyOTPQuery";
export * from "./auth/useGetMeQuery";
export * from "./auth/useCookieBasedAuthGuard";
export * from "./auth/useStorageSync";

// API hooks
export * from "./api/useApiMutation";

// Admin hooks
export * from "./admin/useAdminCategories";
export * from "./useAdminPermissions";

// Other hooks
export * from "./prompts/usePrompts";
