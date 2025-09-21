"use client";

import { useLayoutEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarHeader } from "@/components/admin/sidebar/sidebar-header";
import { SidebarNavigation } from "@/components/admin/sidebar/sidebar-navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
  readonly collapsed: boolean;
  readonly onToggle: () => void;
  readonly className?: string;
}

export function AdminSidebar({
  collapsed,
  onToggle,
  className = "",
}: AdminSidebarProps): React.JSX.Element {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = (): void => {
    logout();
    router.push("/");
  };

  const onItemClick = (itemId: string, hasChildren: boolean) => {
    // Collapse sidebar when clicking on certain items (only on desktop)
    if (itemId === "dashboard" && !isMobile && hasChildren) {
      // Optional: Add logic to collapse on specific items
    }
  };

  if (isMobile) {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-white border-gray-200 border-b rounded-2xl w-full">
          <SidebarHeader
            isCollapsed={false}
            onToggleCollapseAction={onToggle}
            isMobile
            isMobileExpanded={false}
          />
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "bg-white shadow-md border-gray-200 border-r overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out",
        collapsed ? "w-16 sm:w-[84px]" : "w-full sm:w-64 md:w-72 lg:w-80",
        "sm:rounded-none rounded-2xl",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <SidebarHeader
          isCollapsed={collapsed}
          onToggleCollapseAction={onToggle}
        />

        {/* Navigation */}
        <SidebarNavigation collapsed={collapsed} onItemClick={onItemClick} />

        {/* Footer with Logout */}
        <div className="bg-gray-50 mt-auto p-4 border-gray-200 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={cn(
              "justify-start hover:bg-red-50 w-full text-gray-600 hover:text-red-600",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className={cn("w-4 h-4", collapsed ? "mx-auto" : "mr-2")} />
            {!collapsed && "Đăng xuất"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
