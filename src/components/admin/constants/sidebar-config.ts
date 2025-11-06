import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Tag,
  Building,
  Users,
  CreditCard,
  Mail,
  Gift,
  BarChart3,
  // LogOut,
  // User,
  Shield,
  Package,
  MessageSquare,
  AlertTriangle,
  // Globe,
  // ChevronDown,
  // ChevronRight,
} from "lucide-react";
import type { SidebarItemType } from "@/components/admin/types/sidebar";

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
        href: "/admin/blog-category",
        icon: BookOpen,
        permission: "blog_category",
        isDisabled: true,
      },
      {
        name: "Quản lý chủ đề",
        href: "/admin/topics",
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
    icon: Users,
    permission: "users",
    children: [
      {
        name: "Quản lý User",
        href: "/admin/users",
        icon: Users,
        permission: "users",
      },
      {
        name: "Quản lý vai trò",
        href: "/admin/roles",
        icon: Shield,
        permission: "roles",
      },
    ],
  },

  // Subscription Management
  {
    name: "Quản lý Gói đăng ký",
    icon: CreditCard,
    permission: "subscription",
    children: [
      {
        name: "Danh sách gói đăng ký",
        href: "/admin/subscriptions",
        icon: CreditCard,
        permission: "subscription",
      },
      {
        name: "Danh sách user sắp hết hạn gói",
        href: "/admin/expiring-subscriptions",
        icon: AlertTriangle,
        permission: "subscription",
      },
    ],
  },

  // Business Management
  {
    name: "Quản lý Kinh doanh",
    icon: Building,
    permission: "industry",
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
        name: "Quản lý Coupon",
        href: "/admin/coupons",
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
    icon: MessageSquare,
    permission: "communication",
    children: [
      {
        name: "Support",
        href: "/admin/contacts",
        icon: Mail,
        permission: "contact",
      },
      {
        name: "Quản lý Feedback",
        href: "/admin/feedbacks",
        icon: MessageSquare,
        permission: "feedback",
      },
      {
        name: "Gửi Mail hàng loạt",
        href: "/admin/send-mail",
        icon: Mail,
        permission: "send_mail",
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
    name: "Tạo gói đăng ký",
    href: "/admin/subscriptions/new",
    icon: CreditCard,
    permission: "subscription_create",
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
