"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { SidebarItemType } from "@/components/admin/types/sidebar";

/**
 * Props for the SidebarItem component
 */
interface SidebarItemProps {
  readonly item: SidebarItemType;
  readonly isActive: boolean;
  readonly level?: number;
  readonly isCollapsed: boolean;
  readonly onItemClick?: (itemId: string, hasChildren: boolean) => void;
  readonly isExpanded?: boolean;
}

/**
 * Individual sidebar menu item component with collapsible functionality
 *
 * @param props - The component props
 * @returns The sidebar item JSX
 */
export function SidebarItem({
  item,
  isActive,
  level = 0,
  isCollapsed,
  onItemClick,
  isExpanded = false,
}: SidebarItemProps): React.JSX.Element {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = (): void => {
    if (hasChildren) {
      onItemClick?.(item.name, hasChildren);
    }
  };

  const itemContent = (
    <div
      className={cn(
        "group flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer",
        isActive
          ? "bg-primary-100 text-primary-700 shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        isCollapsed && "justify-center px-2"
      )}
      onClick={handleToggle}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex-shrink-0 w-5 h-5",
          isActive
            ? "text-primary-600"
            : "text-gray-500 group-hover:text-gray-700",
          isCollapsed && "mx-auto"
        )}
      >
        <item.icon className="w-5 h-5" />
      </div>

      {!isCollapsed && (
        <>
          {/* Label */}
          <span className="flex-1 ml-3 truncate">{item.name}</span>

          {/* Badge */}
          {item.badge && (
            <Badge variant={item.badge.variant} className="ml-2 text-xs">
              {item.badge.text}
            </Badge>
          )}

          {/* Expand/Collapse Icon */}
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

  // Handle items with children
  if (hasChildren) {
    return (
      <div className="space-y-1">
        {item.href ? (
          <Link href={item.href} className="block">
            {itemContent}
          </Link>
        ) : (
          itemContent
        )}

        {/* Children Items */}
        {!isCollapsed && isExpanded && (
          <div className="space-y-1 ml-4">
            {item.children?.map(child => {
              const isChildActive = pathname === child.href;
              return (
                <Link
                  key={child.name}
                  href={child.href || "#"}
                  className={cn(
                    "group flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200",
                    isChildActive
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  )}
                >
                  <div
                    className={cn(
                      "flex-shrink-0 mr-3 w-4 h-4",
                      isChildActive
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    )}
                  >
                    <child.icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1 truncate">{child.name}</span>
                  {child.badge && (
                    <Badge
                      variant={child.badge.variant}
                      className="ml-auto text-xs"
                    >
                      {child.badge.text}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Handle simple items without children
  return (
    <Link href={item.href || "#"} className="block">
      {itemContent}
    </Link>
  );
}
