"use client";

import {
  PanelLeft,
  ChevronDown,
  ChevronUp,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Menu items enum
export enum ProfileMenuItem {
  ACCOUNT = "account",
  FAVORITES = "favorites",
}

interface ProfileSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  selectedMenuItem: ProfileMenuItem;
  onMenuClick: (key: ProfileMenuItem) => void;
  onLogout: () => void;
}

export const ProfileSidebar = ({
  isCollapsed,
  onToggle,
  selectedMenuItem,
  onMenuClick,
  onLogout,
}: ProfileSidebarProps) => {
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
              Profile
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
          >
            <div className="flex items-center gap-2 p-4 border-gray-200 border-t">
              <button
                onClick={() => onMenuClick(ProfileMenuItem.ACCOUNT)}
                className={cn(
                  "flex flex-1 items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  selectedMenuItem === ProfileMenuItem.ACCOUNT
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                    selectedMenuItem === ProfileMenuItem.ACCOUNT
                      ? "bg-white"
                      : "bg-purple-100"
                  )}
                >
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium text-sm">Tài khoản</span>
              </button>

              <button
                onClick={() => onMenuClick(ProfileMenuItem.FAVORITES)}
                className={cn(
                  "flex flex-1 items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  selectedMenuItem === ProfileMenuItem.FAVORITES
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                    selectedMenuItem === ProfileMenuItem.FAVORITES
                      ? "bg-white"
                      : "bg-gray-100"
                  )}
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </div>
                <span className="font-medium text-sm">Yêu thích</span>
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
              <h1 className="font-bold text-gray-900 text-xl truncate">
                Profile
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
              onClick={() => onMenuClick(ProfileMenuItem.ACCOUNT)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors",
                selectedMenuItem === ProfileMenuItem.ACCOUNT
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              )}
              title={isCollapsed ? "Thông tin tài khoản" : undefined}
            >
              <div
                className={cn(
                  "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                  selectedMenuItem === ProfileMenuItem.ACCOUNT
                    ? "bg-white"
                    : "bg-purple-100"
                )}
              >
                <User
                  className={cn(
                    "w-4 h-4",
                    selectedMenuItem === ProfileMenuItem.ACCOUNT
                      ? "text-purple-600"
                      : "text-purple-600"
                  )}
                />
              </div>
              {!isCollapsed && (
                <span className="font-medium">Thông tin tài khoản</span>
              )}
            </button>

            <button
              onClick={() => onMenuClick(ProfileMenuItem.FAVORITES)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors",
                selectedMenuItem === ProfileMenuItem.FAVORITES
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100"
              )}
              title={isCollapsed ? "Prompt yêu thích" : undefined}
            >
              <div
                className={cn(
                  "flex flex-shrink-0 justify-center items-center rounded-full w-6 h-6",
                  selectedMenuItem === ProfileMenuItem.FAVORITES
                    ? "bg-white"
                    : "bg-gray-100"
                )}
              >
                <Heart
                  className={cn(
                    "w-4 h-4",
                    selectedMenuItem === ProfileMenuItem.FAVORITES
                      ? "text-purple-600"
                      : "text-gray-600"
                  )}
                />
              </div>
              {!isCollapsed && (
                <span className="font-medium">Prompt yêu thích</span>
              )}
            </button>

            {/* Logout Button */}
            <div className="pt-4 border-gray-200 border-t">
              <button
                onClick={onLogout}
                className={cn(
                  "flex items-center gap-3 hover:bg-red-50 p-3 rounded-lg w-full text-red-600 text-left transition-colors",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? "Thoát" : undefined}
              >
                <div className="flex flex-shrink-0 justify-center items-center bg-red-100 rounded-full w-6 h-6">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                {!isCollapsed && <span className="font-medium">Thoát</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
