"use client";

import { PanelLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  selectedMenuItem: string;
  onMenuClick: (key: string) => void;
  prompt: Prompt;
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
            <h1 className="font-bold text-gray-900 text-xl truncate">
              Prompt AI
            </h1>
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
            style={{
              transform: isCollapsed ? "translateY(-100%)" : "translateY(0)",
              transition: "transform 300ms ease-in-out",
            }}
          >
            <div className="flex items-center gap-2 p-4 border-gray-200 border-t">
              <button
                onClick={() => onMenuClick("my-prompt")}
                className={cn(
                  "flex flex-1 items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  selectedMenuItem === "my-prompt"
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                    selectedMenuItem === "my-prompt"
                      ? "bg-white"
                      : "bg-purple-100"
                  )}
                >
                  <span className="text-purple-600 text-sm">📝</span>
                </div>
                <span className="font-medium text-sm">My Prompt</span>
              </button>

              <button
                onClick={() => onMenuClick("prompt-optimizer")}
                className={cn(
                  "flex flex-1 items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  selectedMenuItem === "prompt-optimizer"
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                    selectedMenuItem === "prompt-optimizer"
                      ? "bg-white"
                      : "bg-gray-100"
                  )}
                >
                  <span className="text-gray-600 text-sm">⚡</span>
                </div>
                <span className="font-medium text-sm">Prompt Optimizer</span>
              </button>
            </div>

            {/* Recent Tasks - Mobile */}
            <div className="p-4 border-gray-200 border-t">
              <h3 className="flex items-center gap-2 mb-3 font-semibold text-gray-900 text-sm">
                <span className="text-gray-600">📋</span>
                Recent Tasks
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg">
                  <div className="bg-purple-600 rounded-full w-2 h-2"></div>
                  <span className="font-medium text-purple-700 text-sm">
                    {prompt.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                  <div className="bg-gray-300 rounded-full w-2 h-2"></div>
                  <span className="text-gray-600 text-sm">
                    Identity sentiment in social
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Vertical on left */}
      <aside
        className={cn(
          "hidden sm:block z-40 sm:z-auto relative bg-white shadow-md border-gray-200 border-r overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16 sm:w-[84px]" : "w-full sm:w-64 md:w-72 lg:w-80",
          "h-full"
        )}
        style={{
          height: "100vh",
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          transition: "all 0.3s ease",
        }}
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
              <h1 className="font-bold text-gray-900 text-xl truncate">
                Prompt AI
              </h1>
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
              onClick={() => onMenuClick("my-prompt")}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors",
                selectedMenuItem === "my-prompt"
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              )}
              title={isCollapsed ? "My Prompt" : undefined}
            >
              <div
                className={cn(
                  "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                  selectedMenuItem === "my-prompt"
                    ? "bg-white"
                    : "bg-purple-100"
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    selectedMenuItem === "my-prompt"
                      ? "text-purple-600"
                      : "text-purple-600"
                  )}
                >
                  📝
                </span>
              </div>
              {!isCollapsed && <span className="font-medium">My Prompt</span>}
            </button>

            <button
              onClick={() => onMenuClick("prompt-optimizer")}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors",
                selectedMenuItem === "prompt-optimizer"
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              )}
              title={isCollapsed ? "Prompt Optimizer" : undefined}
            >
              <div
                className={cn(
                  "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                  selectedMenuItem === "prompt-optimizer"
                    ? "bg-white"
                    : "bg-gray-100"
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    selectedMenuItem === "prompt-optimizer"
                      ? "text-purple-600"
                      : "text-gray-600"
                  )}
                >
                  ⚡
                </span>
              </div>
              {!isCollapsed && (
                <span className="font-medium">Prompt Optimizer</span>
              )}
            </button>
          </div>

          {/* Recent Tasks Section */}
          {!isCollapsed && (
            <div className="p-4 border-gray-200 border-t">
              <h3 className="flex items-center gap-2 mb-3 font-semibold text-gray-900 text-sm">
                <span className="text-gray-600">📋</span>
                Recent Tasks
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg">
                  <div className="bg-purple-600 rounded-full w-2 h-2"></div>
                  <span className="font-medium text-purple-700 text-sm">
                    {prompt.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                  <div className="bg-gray-300 rounded-full w-2 h-2"></div>
                  <span className="text-gray-600 text-sm">
                    Identity sentiment in social
                  </span>
                </div>
                <div className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                  <div className="bg-gray-300 rounded-full w-2 h-2"></div>
                  <span className="text-gray-600 text-sm">
                    Draft product marketing
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
