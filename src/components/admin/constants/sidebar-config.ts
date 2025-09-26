import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Tag,
  Building,
  Users,
  CreditCard,
  Settings,
  Mail,
  Gift,
  BarChart3,
  // LogOut,
  // User,
  Shield,
  Package,
  MessageSquare,
  Bell,
  Upload,
  Database,
  // Globe,
  Calendar,
  FileBarChart,
  // ChevronDown,
  // ChevronRight,
} from "lucide-react";
import type { SidebarItemType } from "@/components/admin/types/sidebar";

/**
 * Sidebar navigation configuration with proper grouping
 */
export const sidebarConfig: SidebarItemType[] = [
  // Dashboard
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "dashboard",
  },

  // Content Management
  {
    name: "Quản lý Nội dung",
    href: "/admin/prompts",
    icon: FileText,
    permission: "content",
    children: [
      {
        name: "Quản lý Prompts",
        href: "/admin/prompts",
        icon: FileText,
        permission: "prompts",
      },
      {
        name: "Quản lý Blog",
        href: "/admin/blogs",
        icon: BookOpen,
        permission: "blog",
      },
      {
        name: "Quản lý loại Blog",
        href: "/admin/blogcategory",
        icon: BookOpen,
        permission: "blog_category",
      },
      {
        name: "Quản lý chủ đề",
        href: "/admin/topic",
        icon: Tag,
        permission: "topic",
      },
      {
        name: "Quản lý thể loại",
        href: "/admin/category",
        icon: Tag,
        permission: "category",
      },
      {
        name: "Quản lý Phân loại",
        href: "/admin/sections",
        icon: Tag,
        permission: "section",
      },
    ],
  },

  // User Management
  {
    name: "Quản lý Người dùng",
    href: "/admin/users",
    icon: Users,
    permission: "users",
    children: [
      {
        name: "Quản lý User",
        href: "/admin/user",
        icon: Users,
        permission: "user",
      },
      {
        name: "Quản lý vai trò",
        href: "/admin/role",
        icon: Shield,
        permission: "role",
      },
    ],
  },

  // Business Management
  {
    name: "Quản lý Kinh doanh",
    href: "/admin/business",
    icon: Building,
    permission: "business",
    children: [
      {
        name: "Quản lý ngành nghề",
        href: "/admin/industries",
        icon: Building,
        permission: "industry",
      },
      {
        name: "Quản lý sản phẩm",
        href: "/admin/products",
        icon: Package,
        permission: "product",
      },
      {
        name: "Quản lý gói đăng ký",
        href: "/admin/sub",
        icon: CreditCard,
        permission: "subscription",
      },
      {
        name: "Quản lý Coupon",
        href: "/admin/coupon",
        icon: Gift,
        permission: "coupon",
      },
      {
        name: "Quản lý Thanh toán",
        href: "/admin/payments",
        icon: BarChart3,
        permission: "payment",
      },
    ],
  },

  // Communication
  {
    name: "Giao tiếp",
    href: "/admin/communication",
    icon: MessageSquare,
    permission: "communication",
    children: [
      {
        name: "Support",
        href: "/admin/contact",
        icon: Mail,
        permission: "contact",
      },
      {
        name: "Gửi Mail hàng loạt",
        href: "/admin/send-mail",
        icon: Mail,
        permission: "send_mail",
      },
      {
        name: "Thông báo",
        href: "/admin/notifications",
        icon: Bell,
        permission: "notifications",
        badge: {
          text: "3",
          variant: "destructive",
        },
      },
    ],
  },

  // Tools & Utilities
  {
    name: "Công cụ & Tiện ích",
    href: "/admin/tools",
    icon: Settings,
    permission: "tools",
    children: [
      {
        name: "Quản lý Tool",
        href: "/admin/tool",
        icon: Settings,
        permission: "tool",
      },
      {
        name: "Quản lý Upload",
        href: "/admin/upload-word",
        icon: Upload,
        permission: "upload_word",
      },
      {
        name: "Quản lý Database",
        href: "/admin/database",
        icon: Database,
        permission: "database",
      },
    ],
  },

  // Reports & Analytics
  {
    name: "Báo cáo & Phân tích",
    href: "/admin/analytics",
    icon: FileBarChart,
    permission: "analytics",
    children: [
      {
        name: "Báo cáo Tổng quan",
        href: "/admin/reports/overview",
        icon: BarChart3,
        permission: "reports_overview",
      },
      {
        name: "Báo cáo Người dùng",
        href: "/admin/reports/users",
        icon: Users,
        permission: "reports_users",
      },
      {
        name: "Báo cáo Doanh thu",
        href: "/admin/reports/revenue",
        icon: CreditCard,
        permission: "reports_revenue",
      },
      {
        name: "Báo cáo Hoạt động",
        href: "/admin/reports/activity",
        icon: Calendar,
        permission: "reports_activity",
      },
    ],
  },

  // System Settings
  {
    name: "Cài đặt Hệ thống",
    href: "/admin/settings",
    icon: Settings,
    permission: "settings",
    children: [
      {
        name: "Cài đặt Chung",
        href: "/admin/settings/general",
        icon: Settings,
        permission: "settings_general",
      },
      {
        name: "Cài đặt Email",
        href: "/admin/settings/email",
        icon: Mail,
        permission: "settings_email",
      },
      {
        name: "Cài đặt Thanh toán",
        href: "/admin/settings/payment",
        icon: CreditCard,
        permission: "settings_payment",
      },
      {
        name: "Cài đặt Bảo mật",
        href: "/admin/settings/security",
        icon: Shield,
        permission: "settings_security",
      },
    ],
  },
];

/**
 * Quick actions for admin dashboard
 */
export const quickActions = [
  {
    name: "Thêm Prompt mới",
    href: "/admin/prompt/create",
    icon: FileText,
    permission: "prompt_create",
  },
  {
    name: "Thêm Blog mới",
    href: "/admin/blog/create",
    icon: BookOpen,
    permission: "blog_create",
  },
  {
    name: "Quản lý User",
    href: "/admin/user",
    icon: Users,
    permission: "user_manage",
  },
  {
    name: "Xem Báo cáo",
    href: "/admin/reports",
    icon: BarChart3,
    permission: "reports_view",
  },
];
