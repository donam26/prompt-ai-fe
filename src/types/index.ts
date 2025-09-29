/**
 * Main types export file - centralized exports
 * Tuân thủ convention: export từ các module riêng biệt
 */

// Base types
export * from "./base";

// API types
export * from "./api/common";

// Entity types
export * from "./entities/user";
export * from "./entities/prompt";
export * from "./entities/blog";
export * from "./entities/payment";
export * from "./entities/contact";
export * from "./entities/gpt";

// Admin types
export * from "./admin/dashboard";

// Notification types
export * from "./notification";

// Legacy exports (để backward compatibility) - có thể xóa sau khi update hết imports
export * from "./entities/user";

export * from "./entities/prompt";

export * from "./entities/blog";

export * from "./entities/payment";

export * from "./entities/contact";

export * from "./entities/gpt";

export * from "./admin";
