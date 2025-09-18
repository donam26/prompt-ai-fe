/**
 * Admin dashboard types
 *
 * Type definitions for admin dashboard components and functionality.
 */

/**
 * API response structure for paginated data
 */
export interface PaginatedResponse<T> {
  readonly data: {
    readonly total: number;
    readonly data: T[];
  };
}

/**
 * API response structure for simple data
 */
export interface SimpleResponse<T> {
  readonly data: T;
}

/**
 * Dashboard statistics data structure
 */
export interface DashboardStats {
  readonly totalUsers: number;
  readonly totalPrompts: number;
  readonly totalCategories: number;
  readonly totalBlogs: number;
  readonly totalPayments: number;
  readonly monthlyRevenue: number;
  readonly activeSubscriptions: number;
}

/**
 * Props for the StatsGrid component
 */
export interface StatsGridProps {
  readonly statCards: ReturnType<typeof import("@/constants").createStatCards>;
}
