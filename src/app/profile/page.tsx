"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { User, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import AccountInfo from "./modules/AccountInfo";
import FavoritePrompts from "@/app/profile/modules/FavoritePrompts";

type TabType = "account" | "favorites";

function ProfileContent() {
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("account");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["account", "favorites"].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

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
          <Button onClick={() => (window.location.href = "/login")}>
            Đăng nhập
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="space-y-2">
                <Button
                  variant={activeTab === "account" ? "default" : "ghost"}
                  className="justify-start w-full"
                  onClick={() => handleTabChange("account")}
                >
                  <User className="mr-2 w-4 h-4" />
                  Thông tin tài khoản
                </Button>
                {/* Temporarily hidden - Change Password tab */}
                {/* <Button
                  variant={activeTab === "password" ? "default" : "ghost"}
                  className="justify-start w-full"
                  onClick={() => handleTabChange("password")}
                >
                  <Lock className="mr-2 w-4 h-4" />
                  Đổi mật khẩu
                </Button> */}
                <Button
                  variant={activeTab === "favorites" ? "default" : "ghost"}
                  className="justify-start w-full"
                  onClick={() => handleTabChange("favorites")}
                >
                  <Heart className="mr-2 w-4 h-4" />
                  Prompt yêu thích
                </Button>
                <div className="pt-4 border-t">
                  <Button
                    variant="destructive"
                    className="justify-start w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 w-4 h-4" />
                    Thoát
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">{renderContent()}</Card>
          </div>
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
