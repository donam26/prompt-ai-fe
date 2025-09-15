"use client";

import { useEffect, useState } from "react";
import {
  userService,
  promptService,
  categoryService,
  blogService,
  paymentService,
} from "@/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AdminStats } from "@/lib/types";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  ADMIN_LABELS,
  QUICK_ACTIONS,
  RECENT_ACTIVITIES,
  ACTIVITY_STATS,
  createStatCards,
} from "@/constants";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load basic stats
      const [usersRes, promptsRes, categoriesRes, blogsRes, paymentsRes] =
        await Promise.all([
          userService.getUserPage({ page: 1, pageSize: 1 }),
          promptService.getPrompts(""),
          categoryService.getCategories(),
          blogService.getBlogPage({ page: 1, pageSize: 1 }),
          paymentService.getListPayment({ page: 1, pageSize: 1 }),
        ]);

      setStats({
        totalUsers: usersRes.data.total || 0,
        totalPrompts: promptsRes.data.total || 0,
        totalCategories: Array.isArray(categoriesRes.data.data)
          ? categoriesRes.data.data.length
          : Array.isArray(categoriesRes.data)
            ? categoriesRes.data.length
            : 0,
        totalBlogs: blogsRes.data.total || 0,
        totalPayments: paymentsRes.data.total || 0,
        monthlyRevenue: 0, // Calculate from payments
        activeSubscriptions: 0, // Calculate from subscriptions
      });
    } catch (error) {
      // Error loading stats
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = createStatCards(stats);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="px-4 sm:px-0">
        <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
          {ADMIN_LABELS.DASHBOARD.TITLE}
        </h1>
        <p className="mt-1 text-gray-600 text-sm sm:text-base">
          {ADMIN_LABELS.DASHBOARD.SUBTITLE}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-gray-600 text-xs sm:text-sm">
                {stat.title}
              </CardTitle>
              <stat.icon className="flex-shrink-0 w-4 h-4 text-gray-400" />
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
                <span className="ml-1 truncate">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              {ADMIN_LABELS.DASHBOARD.QUICK_ACTIONS_TITLE}
            </CardTitle>
            <CardDescription className="text-sm">
              {ADMIN_LABELS.DASHBOARD.QUICK_ACTIONS_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2">
              {QUICK_ACTIONS.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex flex-col justify-center items-center p-2 h-16 sm:h-20"
                >
                  <action.icon className="mb-1 sm:mb-2 w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="text-xs sm:text-sm text-center leading-tight">
                    {action.title}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              {ADMIN_LABELS.DASHBOARD.ACTIVITY_TITLE}
            </CardTitle>
            <CardDescription className="text-sm">
              {ADMIN_LABELS.DASHBOARD.ACTIVITY_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {ACTIVITY_STATS.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex flex-1 items-center min-w-0">
                    <stat.icon
                      className={`mr-2 w-4 h-4 flex-shrink-0 ${stat.color}`}
                    />
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
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            {ADMIN_LABELS.DASHBOARD.RECENT_ACTIVITY_TITLE}
          </CardTitle>
          <CardDescription className="text-sm">
            {ADMIN_LABELS.DASHBOARD.RECENT_ACTIVITY_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
