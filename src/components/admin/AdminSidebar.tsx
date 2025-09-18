"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "dashboard",
  },
  {
    name: "Quản lý Prompts",
    href: "/admin/prompt",
    icon: FileText,
    permission: "prompt",
  },
  {
    name: "Quản lý Blog",
    href: "/admin/blog",
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
    name: "Quản lý ngành nghề",
    href: "/admin/industry",
    icon: Building,
    permission: "industry",
  },
  {
    name: "Quản lý sản phẩm",
    href: "/admin/products",
    icon: FileText,
    permission: "product",
  },
  {
    name: "Quản lý User",
    href: "/admin/user",
    icon: Users,
    permission: "user",
  },
  {
    name: "Quản lý vai trò",
    href: "/admin/role",
    icon: Settings,
    permission: "role",
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
    href: "/admin/payment",
    icon: BarChart3,
    permission: "payment",
  },
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
    name: "Quản lý Tool",
    href: "/admin/tool",
    icon: Settings,
    permission: "tool",
  },
  {
    name: "Quản lý Upload",
    href: "/admin/upload-word",
    icon: FileText,
    permission: "upload_word",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { canAccess, isSuperAdmin } = useAdminPermissions();

  const filteredNavigation = navigation.filter(
    item => isSuperAdmin || canAccess(item.permission)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-4 border-b h-16">
        <div className="flex items-center">
          <div className="flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg w-8 h-8">
            <span className="font-bold text-white text-sm">P</span>
          </div>
          <span className="ml-2 font-semibold text-gray-900 text-lg">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-1">
          {filteredNavigation.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md font-medium text-sm transition-colors",
                  isActive
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="mr-3 w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="justify-start w-full text-gray-600 hover:text-gray-900"
          onClick={() => {
            // Handle logout
            window.location.href = "/";
          }}
        >
          <LogOut className="mr-3 w-5 h-5" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
