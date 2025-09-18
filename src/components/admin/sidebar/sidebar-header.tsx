"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
// Removed unused import

/**
 * Props for the SidebarHeader component
 */
interface SidebarHeaderProps {
  readonly collapsed: boolean;
  readonly onToggle: () => void;
}

/**
 * Sidebar header component with logo and toggle button
 *
 * @param props - The component props
 * @returns The sidebar header JSX
 */
export function SidebarHeader({
  collapsed,
  onToggle,
}: SidebarHeaderProps): React.JSX.Element {
  return (
    <div className="flex justify-between items-center p-4 border-gray-200 border-b">
      {!collapsed && (
        <div className="flex items-center space-x-2">
          <div className="flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg w-8 h-8">
            <span className="font-bold text-white text-sm">P</span>
          </div>
          <span className="font-semibold text-gray-900 text-lg">
            Admin Panel
          </span>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="hover:bg-gray-100 p-2 rounded-md"
      >
        {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </Button>
    </div>
  );
}
