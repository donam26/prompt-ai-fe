"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { SidebarItem } from "@/components/admin/sidebar/sidebar-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarConfig } from "@/components/admin/constants/sidebar-config";

interface SidebarNavigationProps {
  readonly collapsed: boolean;
  readonly onItemClick?: (itemId: string, hasChildren: boolean) => void;
}

/**
 * Admin sidebar navigation component - Berklee style
 *
 * @param props - The component props
 * @returns The sidebar navigation JSX
 */
export function SidebarNavigation({
  collapsed,
  onItemClick,
}: SidebarNavigationProps): React.JSX.Element {
  const pathname = usePathname();
  const { canAccess, isSuperAdmin } = useAdminPermissions();

  const [expandedItemId, setExpandedItemId] = useState<string | null>(() => {
    // Find the initially expanded item based on active path
    for (const item of sidebarConfig) {
      if (
        item.children &&
        item.children.some(child => pathname === child.href)
      ) {
        return item.name;
      }
    }
    return null;
  });

  // Filter navigation items based on permissions
  const filteredNavigation = sidebarConfig.filter(
    item => isSuperAdmin || canAccess(item.permission)
  );

  const handleItemToggle = (itemId: string, hasChildren: boolean) => {
    if (hasChildren) {
      // If clicking the same item, toggle it. If clicking a different item, expand the new one
      setExpandedItemId(expandedItemId === itemId ? null : itemId);
    }
    onItemClick?.(itemId, hasChildren);
  };

  return (
    <ScrollArea className="flex-1">
      <nav
        className={`space-y-1.5 ${collapsed ? "px-2" : "px-6"} pb-6`}
        role="navigation"
      >
        {filteredNavigation.map(item => {
          // Check if current path matches this item or any of its children
          const isActive =
            pathname === item.href ||
            (item.children &&
              item.children.some(child => pathname === child.href));

          return (
            <SidebarItem
              key={item.name}
              item={item}
              isActive={isActive || false}
              isCollapsed={collapsed}
              onItemClick={handleItemToggle}
              isExpanded={Boolean(expandedItemId === item.name)}
            />
          );
        })}
      </nav>
    </ScrollArea>
  );
}
