"use client";

import { ChevronDown, ChevronUp, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  readonly isCollapsed: boolean;
  readonly onToggleCollapseAction: () => void;
  readonly isMobile?: boolean;
  readonly isMobileExpanded?: boolean;
}

export function SidebarHeader({
  isCollapsed,
  onToggleCollapseAction,
  isMobile,
  isMobileExpanded,
}: SidebarHeaderProps): React.JSX.Element {
  const displayName = "Prompt AI";

  if (isMobile) {
    return (
      <div className="flex justify-between items-center p-4">
        <h1 className="font-bold text-gray-900 dark:text-white md:text-xl truncate">
          {displayName}
        </h1>

        <Button
          variant="outline"
          onClick={onToggleCollapseAction}
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white transition-colors cursor-pointer"
          aria-label={isMobileExpanded ? "Close menu" : "Open menu"}
        >
          {isMobileExpanded ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`p-6 flex items-center ${isCollapsed ? "justify-center" : "justify-between"} transition-all duration-200`}
    >
      {!isCollapsed && (
        <h1 className="font-bold text-gray-900 text-2xl truncate">
          {displayName}
        </h1>
      )}

      <Button
        variant="outline"
        onClick={onToggleCollapseAction}
        className="hover:bg-gray-100 p-2 border-gray-300 rounded-md text-gray-900 transition-colors cursor-pointer"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <PanelLeft size={20} />
      </Button>
    </div>
  );
}
