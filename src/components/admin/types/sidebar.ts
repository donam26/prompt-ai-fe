import type { ComponentType } from "react";

/**
 * Sidebar badge configuration
 */
export interface SidebarBadge {
  readonly text: string;
  readonly variant: "default" | "secondary" | "destructive" | "outline";
}

/**
 * Sidebar item type definition
 */
export interface SidebarItemType {
  readonly name: string;
  readonly href?: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly permission: string;
  readonly children?: SidebarItemType[];
  readonly badge?: SidebarBadge;
  readonly isGroup?: boolean;
  readonly isExpanded?: boolean;
}

/**
 * Sidebar group configuration
 */
export interface SidebarGroup {
  readonly title?: string;
  readonly items: SidebarItemType[];
}

/**
 * Sidebar navigation props
 */
export interface SidebarNavigationProps {
  readonly collapsed: boolean;
  readonly onItemClick?: (item: SidebarItemType) => void;
}

/**
 * Sidebar item props
 */
export interface SidebarItemProps {
  readonly item: SidebarItemType;
  readonly collapsed: boolean;
  readonly isActive: boolean;
  readonly isExpanded: boolean;
  readonly onToggle: () => void;
  readonly onClick: () => void;
}

/**
 * Sidebar header props
 */
export interface SidebarHeaderProps {
  readonly collapsed: boolean;
  readonly onToggle: () => void;
}

/**
 * Sidebar children container props
 */
export interface SidebarChildrenContainerProps {
  readonly children: SidebarItemType[];
  readonly collapsed: boolean;
  readonly parentPath: string;
}
