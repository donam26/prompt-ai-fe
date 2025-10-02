"use client";

import { useLayoutEffect, useState } from "react";
import { SidebarHeader } from "@/components/admin/sidebar/sidebar-header";
import { SidebarNavigation } from "@/components/admin/sidebar/sidebar-navigation";
import { cn } from "@/lib/utils";

interface Props {
  readonly className?: string;
}

export function AdminSidebar({ className = "" }: Props): React.JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const onToggleCollapseAction = () => {
    if (isMobile) {
      setIsMobileExpanded(!isMobileExpanded);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const onItemClick = (itemId: string, hasChildren: boolean) => {
    // Collapse sidebar when clicking on certain items (only on desktop)
    if (itemId === "dashboard" && !isMobile && hasChildren) {
      setIsCollapsed(true);
    }
  };

  if (isMobile) {
    return (
      <div className={`w-full ${className}`}>
        <div
          className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full ${
            isMobileExpanded ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
          <SidebarHeader
            isCollapsed={false}
            onToggleCollapseAction={onToggleCollapseAction}
            isMobile
            isMobileExpanded={isMobileExpanded}
          />
        </div>

        <div
          className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out overflow-hidden rounded-b-2xl ${
            isMobileExpanded ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            transform: isMobileExpanded ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 300ms ease-in-out",
          }}
        >
          <div className="max-h-[80vh] overflow-y-auto">
            <SidebarNavigation collapsed={false} onItemClick={onItemClick} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "bg-white dark:bg-gray-800 shadow-md border-gray-200 dark:border-gray-700 border-r overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16 sm:w-[84px]" : "w-full sm:w-64 md:w-72 lg:w-80",
        "sm:rounded-none rounded-2xl",
        className
      )}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        onToggleCollapseAction={onToggleCollapseAction}
      />
      <SidebarNavigation collapsed={isCollapsed} onItemClick={onItemClick} />
    </aside>
  );
}
