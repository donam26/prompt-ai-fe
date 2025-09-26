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
