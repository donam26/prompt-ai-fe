import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
        const errorObj = error as { response?: { status?: number } };
        if (
          errorObj?.response?.status &&
          errorObj.response.status >= 400 &&
          errorObj.response.status < 500
        ) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
        const errorObj = error as { response?: { status?: number } };
        if (
          errorObj?.response?.status &&
          errorObj.response.status >= 400 &&
          errorObj.response.status < 500
        ) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
    },
  },
});

// Query keys for consistent cache management
export const queryKeys = {
  // User queries
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string | number) =>
      [...queryKeys.users.details(), id] as const,
  },

  // Auth queries
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },

  // Prompt queries
  prompts: {
    all: ["prompts"] as const,
    lists: () => [...queryKeys.prompts.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.prompts.lists(), { filters }] as const,
    details: () => [...queryKeys.prompts.all, "detail"] as const,
    detail: (id: string | number) =>
      [...queryKeys.prompts.details(), id] as const,
  },
} as const;
