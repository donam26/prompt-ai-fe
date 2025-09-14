"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminStats } from "@/lib/types";
import {
  Users,
  FileText,
  Tag,
  BookOpen,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

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
          api.getUserPage(1, 1),
          api.getPrompts(""),
          api.getCategories(),
          api.getBlogPage(1, 1),
          api.getListPayment({ page: 1, pageSize: 1 }),
        ]);

      setStats({
        totalUsers: usersRes.data.total || 0,
        totalPrompts: promptsRes.data.total || 0,
        totalCategories: categoriesRes.data.length || 0,
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
        <div className="border-purple-600 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Tổng số người dùng",
      value: stats?.totalUsers || 0,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      description: "So với tháng trước",
    },
    {
      title: "Tổng số prompts",
      value: stats?.totalPrompts || 0,
      icon: FileText,
      change: "+8%",
      changeType: "positive" as const,
      description: "So với tháng trước",
    },
    {
      title: "Danh mục",
      value: stats?.totalCategories || 0,
      icon: Tag,
      change: "+2",
      changeType: "positive" as const,
      description: "Danh mục mới",
    },
    {
      title: "Bài viết blog",
      value: stats?.totalBlogs || 0,
      icon: BookOpen,
      change: "+5",
      changeType: "positive" as const,
      description: "Bài viết mới",
    },
    {
      title: "Giao dịch",
      value: stats?.totalPayments || 0,
      icon: CreditCard,
      change: "+15%",
      changeType: "positive" as const,
      description: "So với tháng trước",
    },
    {
      title: "Doanh thu tháng",
      value: `$${stats?.monthlyRevenue || 0}`,
      icon: DollarSign,
      change: "+23%",
      changeType: "positive" as const,
      description: "So với tháng trước",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-gray-900 text-3xl">Dashboard</h1>
        <p className="mt-1 text-gray-600">Tổng quan về hệ thống và hoạt động</p>
      </div>

      {/* Stats Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-gray-600 text-sm">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-gray-900 text-2xl">
                {stat.value}
              </div>
              <div className="flex items-center mt-1 text-gray-500 text-xs">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="mr-1 w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 w-3 h-3 text-red-500" />
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
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
            <CardDescription>
              Các thao tác thường dùng trong quản trị
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="gap-4 grid grid-cols-2">
              <Button
                variant="outline"
                className="flex flex-col justify-center items-center h-20"
              >
                <FileText className="mb-2 w-6 h-6" />
                <span className="text-sm">Thêm Prompt</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col justify-center items-center h-20"
              >
                <BookOpen className="mb-2 w-6 h-6" />
                <span className="text-sm">Thêm Blog</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col justify-center items-center h-20"
              >
                <Tag className="mb-2 w-6 h-6" />
                <span className="text-sm">Quản lý Danh mục</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col justify-center items-center h-20"
              >
                <Users className="mb-2 w-6 h-6" />
                <span className="text-sm">Quản lý User</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê hoạt động</CardTitle>
            <CardDescription>
              Các chỉ số quan trọng trong 30 ngày qua
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Activity className="mr-2 w-4 h-4 text-green-500" />
                  <span className="text-gray-600 text-sm">Lượt truy cập</span>
                </div>
                <Badge variant="secondary">+12%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 text-sm">
                    Prompt được sử dụng
                  </span>
                </div>
                <Badge variant="secondary">+8%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="mr-2 w-4 h-4 text-purple-500" />
                  <span className="text-gray-600 text-sm">Giao dịch mới</span>
                </div>
                <Badge variant="secondary">+15%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
          <CardDescription>
            Các hoạt động mới nhất trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 rounded-full w-2 h-2"></div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Người dùng mới đăng ký</p>
                <p className="text-gray-500 text-xs">2 phút trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 rounded-full w-2 h-2"></div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Prompt mới được thêm</p>
                <p className="text-gray-500 text-xs">15 phút trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500 rounded-full w-2 h-2"></div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">
                  Giao dịch thanh toán thành công
                </p>
                <p className="text-gray-500 text-xs">1 giờ trước</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
