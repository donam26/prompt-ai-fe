"use client";

import { SidebarHeader } from "@/components/admin/sidebar/sidebar-header";
import { SidebarNavigation } from "@/components/admin/sidebar/sidebar-navigation";
import { cn } from "@/lib/utils";

/**
 * Props for the AdminSidebar component
 */
interface AdminSidebarProps {
  readonly collapsed: boolean;
  readonly onToggle: () => void;
}

/**
 * Main admin sidebar component with collapsible functionality
 *
 * @param props - The component props
 * @returns The admin sidebar JSX
 */
export function AdminSidebar({
  collapsed,
  onToggle,
}: AdminSidebarProps): React.JSX.Element {
  return (
    <aside
      className={cn(
        "top-0 left-0 z-50 fixed bg-white shadow-lg h-screen overflow-hidden transition-all duration-300 ease-in-out admin-sidebar",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
        <SidebarNavigation collapsed={collapsed} />
      </div>
    </aside>
  );
}
