// Admin dashboard constants and data

import {
  Users,
  FileText,
  Tag,
  BookOpen,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity,
  // Removed unused imports
} from "lucide-react";

export interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  changeType: "positive" | "negative";
  description: string;
}

export interface QuickAction {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface ActivityItem {
  id: string;
  type: "user" | "prompt" | "payment" | "blog";
  message: string;
  time: string;
  color: string;
}

export const ADMIN_LABELS = {
  DASHBOARD: {
    TITLE: "Dashboard",
    SUBTITLE: "Tổng quan về hệ thống và hoạt động",
    QUICK_ACTIONS_TITLE: "Thao tác nhanh",
    QUICK_ACTIONS_DESCRIPTION: "Các thao tác thường dùng trong quản trị",
    ACTIVITY_TITLE: "Thống kê hoạt động",
    ACTIVITY_DESCRIPTION: "Các chỉ số quan trọng trong 30 ngày qua",
    RECENT_ACTIVITY_TITLE: "Hoạt động gần đây",
    RECENT_ACTIVITY_DESCRIPTION: "Các hoạt động mới nhất trong hệ thống",
  },
  STATS: {
    TOTAL_USERS: "Tổng số người dùng",
    TOTAL_PROMPTS: "Tổng số prompts",
    CATEGORIES: "Danh mục",
    BLOG_POSTS: "Bài viết blog",
    TRANSACTIONS: "Giao dịch",
    MONTHLY_REVENUE: "Doanh thu tháng",
    COMPARED_TO_LAST_MONTH: "So với tháng trước",
    NEW_CATEGORIES: "Danh mục mới",
    NEW_POSTS: "Bài viết mới",
    NEW_TRANSACTIONS: "Giao dịch mới",
  },
  QUICK_ACTIONS: {
    ADD_PROMPT: "Thêm Prompt",
    ADD_BLOG: "Thêm Blog",
    MANAGE_CATEGORIES: "Quản lý Danh mục",
    MANAGE_USERS: "Quản lý User",
  },
  ACTIVITY: {
    PAGE_VIEWS: "Lượt truy cập",
    PROMPTS_USED: "Prompt được sử dụng",
    NEW_TRANSACTIONS: "Giao dịch mới",
  },
  RECENT_ACTIVITY: {
    NEW_USER_REGISTERED: "Người dùng mới đăng ký",
    NEW_PROMPT_ADDED: "Prompt mới được thêm",
    PAYMENT_SUCCESS: "Giao dịch thanh toán thành công",
    MINUTES_AGO: "phút trước",
    HOURS_AGO: "giờ trước",
  },
} as const;

export const QUICK_ACTIONS: QuickAction[] = [
  {
    title: ADMIN_LABELS.QUICK_ACTIONS.ADD_PROMPT,
    icon: FileText,
  },
  {
    title: ADMIN_LABELS.QUICK_ACTIONS.ADD_BLOG,
    icon: BookOpen,
  },
  {
    title: ADMIN_LABELS.QUICK_ACTIONS.MANAGE_CATEGORIES,
    icon: Tag,
  },
  {
    title: ADMIN_LABELS.QUICK_ACTIONS.MANAGE_USERS,
    icon: Users,
  },
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    type: "user",
    message: ADMIN_LABELS.RECENT_ACTIVITY.NEW_USER_REGISTERED,
    time: "2 phút trước",
    color: "bg-green-500",
  },
  {
    id: "2",
    type: "prompt",
    message: ADMIN_LABELS.RECENT_ACTIVITY.NEW_PROMPT_ADDED,
    time: "15 phút trước",
    color: "bg-blue-500",
  },
  {
    id: "3",
    type: "payment",
    message: ADMIN_LABELS.RECENT_ACTIVITY.PAYMENT_SUCCESS,
    time: "1 giờ trước",
    color: "bg-purple-500",
  },
];

export const createStatCards = (stats: Record<string, unknown>): StatCard[] => [
  {
    title: ADMIN_LABELS.STATS.TOTAL_USERS,
    value: stats?.totalUsers || 0,
    icon: Users,
    change: "+12%",
    changeType: "positive",
    description: ADMIN_LABELS.STATS.COMPARED_TO_LAST_MONTH,
  },
  {
    title: ADMIN_LABELS.STATS.TOTAL_PROMPTS,
    value: stats?.totalPrompts || 0,
    icon: FileText,
    change: "+8%",
    changeType: "positive",
    description: ADMIN_LABELS.STATS.COMPARED_TO_LAST_MONTH,
  },
  {
    title: ADMIN_LABELS.STATS.CATEGORIES,
    value: stats?.totalCategories || 0,
    icon: Tag,
    change: "+2",
    changeType: "positive",
    description: ADMIN_LABELS.STATS.NEW_CATEGORIES,
  },
  {
    title: ADMIN_LABELS.STATS.BLOG_POSTS,
    value: stats?.totalBlogs || 0,
    icon: BookOpen,
    change: "+5",
    changeType: "positive",
    description: ADMIN_LABELS.STATS.NEW_POSTS,
  },
  {
    title: ADMIN_LABELS.STATS.TRANSACTIONS,
    value: stats?.totalPayments || 0,
    icon: CreditCard,
    change: "+15%",
    changeType: "positive",
    description: ADMIN_LABELS.STATS.COMPARED_TO_LAST_MONTH,
  },
  {
    title: ADMIN_LABELS.STATS.MONTHLY_REVENUE,
    value: `$${stats?.monthlyRevenue || 0}`,
    icon: DollarSign,
    change: "+23%",
    changeType: "positive",
    description: ADMIN_LABELS.STATS.COMPARED_TO_LAST_MONTH,
  },
];

export const ACTIVITY_STATS = [
  {
    icon: Activity,
    label: ADMIN_LABELS.ACTIVITY.PAGE_VIEWS,
    value: "+12%",
    color: "text-green-500",
  },
  {
    icon: TrendingUp,
    label: ADMIN_LABELS.ACTIVITY.PROMPTS_USED,
    value: "+8%",
    color: "text-blue-500",
  },
  {
    icon: CreditCard,
    label: ADMIN_LABELS.ACTIVITY.NEW_TRANSACTIONS,
    value: "+15%",
    color: "text-purple-500",
  },
];
