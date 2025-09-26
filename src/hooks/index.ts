// Export all hooks from a single entry point

// Store hooks
export * from "./stores";

// Admin hooks
export * from "./admin";
// Auth hooks
export * from "./auth/useLoginQuery";
export * from "./auth/useResendOTPQuery";
export * from "./auth/useVerifyOTPQuery";
export * from "./auth/useGetMeQuery";

// API hooks
export * from "./api/useApiMutation";

// Admin hooks
export * from "./admin/useCategory";
export * from "./admin/useIndustry";
export * from "./admin/useUser";
export * from "./admin/usePrompt";
export * from "./admin/useBlog";
export * from "./admin/usePayment";
export * from "./useAdminPermissions";

// Other hooks
export * from "./prompts/usePrompts";
