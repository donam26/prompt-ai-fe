"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Settings, LogOut } from "lucide-react";

export function AdminHeader() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex justify-between items-center px-2 sm:px-4 lg:px-6 xl:px-8 h-14 sm:h-16">
        <div className="flex flex-1 items-center min-w-0">
          <h1 className="font-semibold text-gray-900 text-lg sm:text-xl truncate">
            Quản trị hệ thống
          </h1>
        </div>

        <div className="flex flex-shrink-0 items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
            <Badge
              variant="destructive"
              className="-top-1 -right-1 absolute flex justify-center items-center p-0 w-4 sm:w-5 h-4 sm:h-5 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative rounded-full w-7 sm:w-8 h-7 sm:h-8"
              >
                <Avatar className="w-7 sm:w-8 h-7 sm:h-8">
                  <AvatarImage src={user?.avatar} alt={user?.full_name} />
                  <AvatarFallback className="text-xs sm:text-sm">
                    {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm leading-none">
                    {user?.full_name}
                  </p>
                  <p className="text-muted-foreground text-xs leading-none">
                    {user?.email}
                  </p>
                  <Badge variant="secondary" className="mt-1 w-fit">
                    {user?.role_id === 2 ? "Super Admin" : "Admin"}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 w-4 h-4" />
                <span>Thông tin cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 w-4 h-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 w-4 h-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
