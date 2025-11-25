"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AccountInfo from "./modules/AccountInfo";
import FavoritePrompts from "@/app/profile/modules/FavoritePrompts";
import { ProfileSidebar, ProfileMenuItem } from "./modules/ProfileSidebar";

type TabType = "account" | "favorites";

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("account");
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Start collapsed on mobile, expanded on desktop
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;
    }
    return false;
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["account", "favorites"].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [searchParams]);

  // Set initial collapsed state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      // Only auto-collapse on mobile if sidebar is currently open
      // This prevents forcing collapse if user has manually opened it
      if (isMobile && !isCollapsed) {
        setIsCollapsed(true);
      } else if (!isMobile && isCollapsed) {
        // Auto-expand on desktop
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  const handleLogout = useCallback(() => {
    logout();
    window.location.href = "/login";
  }, [logout]);

  const handleMenuClick = useCallback(
    (key: ProfileMenuItem) => {
      // Update URL with tab parameter
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("tab", key);
      router.replace(currentUrl.pathname + currentUrl.search, {
        scroll: false,
      });

      // Close sidebar on mobile after selection
      if (window.innerWidth < 640) {
        setIsCollapsed(true);
      }
    },
    [router]
  );

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <AccountInfo
            user={user}
            onSwitchToPassword={() => {
              // Password tab is temporarily hidden
              console.warn("Change password feature is temporarily disabled");
            }}
          />
        );
      // case "password":
      //   return <ChangePassword user={user} />;
      case "favorites":
        return <FavoritePrompts user={user} />;
      default:
        return (
          <AccountInfo
            user={user}
            onSwitchToPassword={() => {
              // Password tab is temporarily hidden
              console.warn("Change password feature is temporarily disabled");
            }}
          />
        );
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl">Vui lòng đăng nhập</h1>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white transition-colors"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col gap-0 md:gap-0 bg-gray-50 md:bg-white min-w-0 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <ProfileSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        selectedMenuItem={activeTab as ProfileMenuItem}
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 w-full min-w-0 overflow-x-hidden">
        <div className="bg-white shadow-sm md:shadow-none p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl w-full min-w-0 min-h-[calc(100vh-8rem)] md:min-h-[600px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-2xl">Đang tải...</h1>
          </div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
