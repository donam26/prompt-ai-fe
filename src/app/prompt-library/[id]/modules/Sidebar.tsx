"use client";

import React from "react";
import { PanelLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Prompt } from "@/types";
import { cn } from "@/lib/utils";

// Helper component for truncated title with tooltip
const TruncatedTitle = ({
  title,
  fallback,
  className = "",
  as: Component = "span",
}: {
  title?: string;
  fallback: string;
  className?: string;
  as?: React.ElementType;
}) => {
  const displayTitle = title || fallback;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Component className={cn("truncate cursor-help", className)}>
          {displayTitle}
        </Component>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        <p className="max-w-xs break-words">{displayTitle}</p>
      </TooltipContent>
    </Tooltip>
  );
};

// Menu items enum
export enum MenuItem {
  MY_PROMPT = "my-prompt",
  PROMPT_OPTIMIZER = "prompt-optimizer",
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  selectedMenuItem: MenuItem;
  onMenuClick: (key: MenuItem) => void;
  prompt: Prompt | null;
}

export const Sidebar = ({
  isCollapsed,
  onToggle,
  selectedMenuItem,
  onMenuClick,
  prompt,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile Sidebar - Horizontal at top */}
      <div className="sm:hidden w-full">
        <div
          className={cn(
            "bg-white shadow-md border-gray-200 border-b w-full transition-all duration-300 ease-in-out",
            isCollapsed ? "rounded-2xl" : "rounded-t-2xl"
          )}
        >
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-4">
            <TruncatedTitle
              title={prompt?.title}
              fallback="Prompt AI"
              className="font-bold text-gray-900 text-xl"
              as="h1"
            />
            <Button
              variant="outline"
              onClick={onToggle}
              className="hover:bg-gray-100 p-2 border-gray-300 rounded-md text-gray-900 transition-colors cursor-pointer"
              aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
            >
              {isCollapsed ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronUp size={20} />
              )}
            </Button>
          </div>

          {/* Mobile Menu Items - Horizontal */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isCollapsed ? "max-h-0 opacity-0" : "max-h-[200px] opacity-100"
            )}
          >
            <div className="flex items-center gap-2 p-4 border-gray-200 border-t">
              <button
                onClick={() => onMenuClick(MenuItem.MY_PROMPT)}
                className={cn(
                  "flex flex-1 items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  selectedMenuItem === MenuItem.MY_PROMPT
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                    selectedMenuItem === MenuItem.MY_PROMPT
                      ? "bg-white"
                      : "bg-purple-100"
                  )}
                >
                  <span className="text-purple-600 text-sm">📝</span>
                </div>
                <span className="font-medium text-sm">My Prompt</span>
              </button>

              <button
                onClick={() => onMenuClick(MenuItem.PROMPT_OPTIMIZER)}
                className={cn(
                  "flex flex-1 items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  selectedMenuItem === MenuItem.PROMPT_OPTIMIZER
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                    selectedMenuItem === MenuItem.PROMPT_OPTIMIZER
                      ? "bg-white"
                      : "bg-gray-100"
                  )}
                >
                  <span className="text-gray-600 text-sm">⚡</span>
                </div>
                <span className="font-medium text-sm">Nâng Cấp Prompt</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Vertical on left */}
      <aside
        className={cn(
          "hidden sm:block z-40 sm:z-auto relative bg-white shadow-md border-gray-200 border-r overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16 sm:w-[84px]" : "w-full sm:w-64 md:w-72 lg:w-80",
          "h-screen min-h-screen"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div
            className={cn(
              "flex items-center p-6 border-gray-200 border-b transition-all duration-200",
              isCollapsed ? "justify-center" : "justify-between"
            )}
          >
            {!isCollapsed && (
              <TruncatedTitle
                title={prompt?.title}
                fallback="Prompt AI"
                className="font-bold text-gray-900 text-xl"
                as="h1"
              />
            )}

            <Button
              variant="outline"
              onClick={onToggle}
              className="hover:bg-gray-100 p-2 border-gray-300 rounded-md text-gray-900 transition-colors cursor-pointer"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelLeft size={20} />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 space-y-2 p-4">
            <button
              onClick={() => onMenuClick(MenuItem.MY_PROMPT)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors",
                selectedMenuItem === MenuItem.MY_PROMPT
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              )}
              title={isCollapsed ? "My Prompt" : undefined}
            >
              <div
                className={cn(
                  "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                  selectedMenuItem === MenuItem.MY_PROMPT
                    ? "bg-white"
                    : "bg-purple-100"
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    selectedMenuItem === MenuItem.MY_PROMPT
                      ? "text-purple-600"
                      : "text-purple-600"
                  )}
                >
                  📝
                </span>
              </div>
              {!isCollapsed && (
                <TruncatedTitle
                  title={prompt?.title}
                  fallback="My Prompt"
                  className="font-medium"
                />
              )}
            </button>

            <button
              onClick={() => onMenuClick(MenuItem.PROMPT_OPTIMIZER)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors",
                selectedMenuItem === MenuItem.PROMPT_OPTIMIZER
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              )}
              title={isCollapsed ? "Prompt Optimizer" : undefined}
            >
              <div
                className={cn(
                  "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                  selectedMenuItem === MenuItem.PROMPT_OPTIMIZER
                    ? "bg-white"
                    : "bg-gray-100"
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    selectedMenuItem === MenuItem.PROMPT_OPTIMIZER
                      ? "text-purple-600"
                      : "text-gray-600"
                  )}
                >
                  ⚡
                </span>
              </div>
              {!isCollapsed && (
                <span className="font-medium">Nâng Cấp Prompt</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
