"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItemType } from "@/components/admin/types/sidebar";
import { SidebarChildrenContainer } from "@/components/admin/sidebar/sidebar-children-container";

/**
 * Props for the SidebarItem component
 */
interface SidebarItemProps {
  readonly item: SidebarItemType;
  readonly collapsed: boolean;
  readonly isActive: boolean;
}

/**
 * Individual sidebar menu item component
 *
 * @param props - The component props
 * @returns The sidebar item JSX
 */
export function SidebarItem({
  item,
  collapsed,
  isActive,
}: SidebarItemProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = (): void => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const itemContent = (
    <div
      className={cn(
        "flex items-center px-3 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer",
        isActive
          ? "bg-purple-100 text-purple-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
      onClick={handleToggle}
    >
      <item.icon
        className={cn(
          "flex-shrink-0",
          collapsed ? "w-5 h-5 mx-auto" : "w-5 h-5 mr-3"
        )}
      />

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.name}</span>
          {hasChildren && (
            <div className="flex-shrink-0 ml-2">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  if (hasChildren) {
    return (
      <div>
        {item.href ? (
          <Link href={item.href} className="block">
            {itemContent}
          </Link>
        ) : (
          itemContent
        )}

        {!collapsed && isExpanded && (
          <SidebarChildrenContainer>
            {item.children?.map(child => (
              <SidebarItem
                key={child.name}
                item={child}
                collapsed={collapsed}
                isActive={false} // Child items don't have active state in this example
              />
            ))}
          </SidebarChildrenContainer>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href || "#"} className="block">
      {itemContent}
    </Link>
  );
}
