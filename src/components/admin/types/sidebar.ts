import type { ComponentType } from "react";

/**
 * Sidebar item type definition
 */
export interface SidebarItemType {
  readonly name: string;
  readonly href?: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly permission: string;
  readonly children?: SidebarItemType[];
  readonly badge?: {
    readonly text: string;
    readonly variant: "default" | "secondary" | "destructive" | "outline";
  };
}
