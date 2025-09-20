"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  userService,
  promptService,
  categoryService,
  blogService,
  paymentService,
} from "@/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ADMIN_LABELS,
  QUICK_ACTIONS,
  RECENT_ACTIVITIES,
  ACTIVITY_STATS,
  createStatCards,
} from "@/constants";
import { AdminPageLayout, AdminContentCard } from "@/components/admin";
import type {
  PaginatedResponse,
  DashboardStats,
  StatsGridProps,
} from "@/types/admin";

/**
 * Admin statistics card data structure
 */
interface AdminStatCard {
  readonly title: string;
  readonly value: string | number;
  readonly change?: string;
  readonly changeType?: "positive" | "negative" | "neutral";
  readonly icon?: React.ComponentType<{ className?: string }>;
}

export default function AdminDashboard(): React.JSX.Element {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Loads dashboard statistics from various services
   */
  const loadStats = useCallback(async (): Promise<void> => {
    try {
      const [usersRes, promptsRes, categoriesRes, blogsRes, paymentsRes] =
        await Promise.all([
          userService.getUserPage({ page: 1, pageSize: 1 }),
          promptService.getPrompts(""),
          categoryService.getCategories(),
          blogService.getBlogPage({ page: 1, pageSize: 1 }),
          paymentService.getListPayment({ page: 1, pageSize: 1 }),
        ]);

      const newStats: DashboardStats = {
        totalUsers:
          (usersRes.data as PaginatedResponse<unknown>).data.total || 0,
        totalPrompts:
          (promptsRes.data as PaginatedResponse<unknown>).data.total || 0,
        totalCategories: calculateCategoriesCount(categoriesRes.data),
        totalBlogs:
          (blogsRes.data as PaginatedResponse<unknown>).data.total || 0,
        totalPayments:
          (paymentsRes.data as PaginatedResponse<unknown>).data.total || 0,
        monthlyRevenue: 0, // TODO: Calculate from payments
        activeSubscriptions: 0, // TODO: Calculate from subscriptions
      };

      setStats(newStats);
    } catch {
      // Error handling - could be logged to monitoring service
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  /**
   * Calculates the count of categories from API response
   *
   * @param data - The categories data from API
   * @returns The count of categories
   */
  const calculateCategoriesCount = (data: unknown): number => {
    if (Array.isArray(data)) {
      return data.length;
    }

    if (data && typeof data === "object" && "data" in data) {
      const nestedData = (data as { data: unknown }).data;
      return Array.isArray(nestedData) ? nestedData.length : 0;
    }

    return 0;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = createStatCards((stats || {}) as Record<string, unknown>);

  return (
    <AdminPageLayout
      title={ADMIN_LABELS.DASHBOARD.TITLE}
      description={ADMIN_LABELS.DASHBOARD.SUBTITLE}
    >
      <div className="space-y-6">
        <StatsGrid statCards={statCards} />
        <QuickActionsAndActivity />
        <RecentActivity />
      </div>
    </AdminPageLayout>
  );
}

/**
 * Statistics grid component that displays key metrics
 *
 * @param props - The component props
 * @returns The stats grid JSX
 */
const StatsGrid = ({ statCards }: StatsGridProps): React.JSX.Element => (
  <AdminContentCard padding="none">
    <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {statCards.map((stat: AdminStatCard, index: number) => (
        <Card key={index} className="w-full">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-gray-600 text-xs sm:text-sm">
              {stat.title}
            </CardTitle>
            {stat.icon && (
              <div className="flex-shrink-0 w-4 h-4 text-gray-400">
                <stat.icon className="w-4 h-4" />
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            <div className="font-bold text-gray-900 text-xl sm:text-2xl">
              {stat.value}
            </div>
            <div className="flex items-center mt-1 text-gray-500 text-xs">
              {stat.changeType === "positive" ? (
                <ArrowUpRight className="flex-shrink-0 mr-1 w-3 h-3 text-green-500" />
              ) : (
                <ArrowDownRight className="flex-shrink-0 mr-1 w-3 h-3 text-red-500" />
              )}
              <span
                className={
                  stat.changeType === "positive"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </AdminContentCard>
);

/**
 * Quick actions and activity cards component
 *
 * @returns The quick actions and activity JSX
 */
const QuickActionsAndActivity = (): React.JSX.Element => (
  <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
    <QuickActionsCard />
    <ActivityCard />
  </div>
);

/**
 * Quick actions card component
 *
 * @returns The quick actions card JSX
 */
const QuickActionsCard = (): React.JSX.Element => (
  <AdminContentCard
    title={ADMIN_LABELS.DASHBOARD.QUICK_ACTIONS_TITLE}
    description={ADMIN_LABELS.DASHBOARD.QUICK_ACTIONS_DESCRIPTION}
  >
    <div className="space-y-4">
      <div className="gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2">
        {QUICK_ACTIONS.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex flex-col justify-center items-center p-2 h-16 sm:h-20"
          >
            {action.icon && (
              <div className="mb-1 sm:mb-2 w-5 sm:w-6 h-5 sm:h-6">
                <action.icon className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
            )}
            <span className="text-xs sm:text-sm text-center leading-tight">
              {action.title}
            </span>
          </Button>
        ))}
      </div>
    </div>
  </AdminContentCard>
);

/**
 * Activity card component
 *
 * @returns The activity card JSX
 */
const ActivityCard = (): React.JSX.Element => (
  <AdminContentCard
    title={ADMIN_LABELS.DASHBOARD.ACTIVITY_TITLE}
    description={ADMIN_LABELS.DASHBOARD.ACTIVITY_DESCRIPTION}
  >
    <div className="space-y-3 sm:space-y-4">
      {ACTIVITY_STATS.map((stat, index) => (
        <div key={index} className="flex justify-between items-center">
          <div className="flex flex-1 items-center min-w-0">
            <stat.icon className={`mr-2 w-4 h-4 flex-shrink-0 ${stat.color}`} />
            <span className="text-gray-600 text-xs sm:text-sm truncate">
              {stat.label}
            </span>
          </div>
          <Badge variant="secondary" className="flex-shrink-0 ml-2">
            {stat.value}
          </Badge>
        </div>
      ))}
    </div>
  </AdminContentCard>
);

/**
 * Recent activity card component
 *
 * @returns The recent activity card JSX
 */
const RecentActivity = (): React.JSX.Element => (
  <AdminContentCard
    title={ADMIN_LABELS.DASHBOARD.RECENT_ACTIVITY_TITLE}
    description={ADMIN_LABELS.DASHBOARD.RECENT_ACTIVITY_DESCRIPTION}
  >
    <div className="space-y-3 sm:space-y-4">
      {RECENT_ACTIVITIES.map(activity => (
        <div
          key={activity.id}
          className="flex items-center space-x-3 sm:space-x-4"
        >
          <div
            className={`${activity.color} rounded-full w-2 h-2 flex-shrink-0`}
          ></div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 text-sm sm:text-base truncate">
              {activity.message}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </AdminContentCard>
);
