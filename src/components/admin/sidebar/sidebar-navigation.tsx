"use client";

import { usePathname } from "next/navigation";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { SidebarItem } from "@/components/admin/sidebar/sidebar-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarConfig } from "@/components/admin/constants/sidebar-config";

/**
 * Props for the SidebarNavigation component
 */
interface SidebarNavigationProps {
  readonly collapsed: boolean;
}

/**
 * Sidebar navigation component
 *
 * @param props - The component props
 * @returns The sidebar navigation JSX
 */
export function SidebarNavigation({
  collapsed,
}: SidebarNavigationProps): React.JSX.Element {
  const pathname = usePathname();
  const { canAccess, isSuperAdmin } = useAdminPermissions();

  const filteredNavigation = sidebarConfig.filter(
    item => isSuperAdmin || canAccess(item.permission)
  );

  return (
    <ScrollArea className="flex-1 px-2 py-4">
      <nav className="space-y-1">
        {filteredNavigation.map(item => (
          <SidebarItem
            key={item.name}
            item={item}
            collapsed={collapsed}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </ScrollArea>
  );
}
