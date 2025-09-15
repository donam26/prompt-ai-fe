// Error type for API responses
export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Query keys for consistent caching
export const queryKeys = {
  prompts: ["prompts"] as const,
  promptsByCategory: (categoryId: number) =>
    ["prompts", "category", categoryId] as const,
  promptsBySearch: (searchTerm: string) =>
    ["prompts", "search", searchTerm] as const,
  categories: ["categories"] as const,
  user: ["user"] as const,
  favorites: ["favorites"] as const,
  admin: {
    prompts: ["admin", "prompts"] as const,
    categories: ["admin", "categories"] as const,
    users: ["admin", "users"] as const,
  },
} as const;
