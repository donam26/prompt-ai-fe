"use client";

// Removed unused imports
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// Removed unused import
import { LAYOUT_ROUTES, LAYOUT_LABELS, LAYOUT_PAGE } from "@/constants/layout";

/**
 * Props for the UserDropdown component
 */
interface UserDropdownProps {
  readonly user: {
    readonly id: number;
    readonly fullName?: string;
    readonly email?: string;
    readonly roleId?: number;
    readonly avatar?: string;
  };
  readonly onLogout: () => void;
}

/**
 * User dropdown menu component
 *
 * @param props - The component props
 * @returns The user dropdown JSX
 */
export function UserDropdown({
  user,
  onLogout,
}: UserDropdownProps): React.JSX.Element {
  const router = useRouter();

  const handleProfileClick = (): void => {
    router.push(LAYOUT_ROUTES.userInfo);
  };

  const handleSettingsClick = (): void => {
    router.push(LAYOUT_ROUTES.settings);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={LAYOUT_PAGE.header.avatar}>
          <Avatar>
            <AvatarImage
              src={user?.avatar || "/images/avatars/default_avatar.png"}
              alt={user?.fullName || "User"}
            />
            <AvatarFallback className="text-xs sm:text-sm">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">
              {user?.fullName || "User"}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email || "user@example.com"}
            </p>
            {user?.roleId === 2 && (
              <Badge variant="secondary" className="mt-1 w-fit">
                Admin
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick}>
          <User className="mr-2 w-4 h-4" />
          <span>{LAYOUT_LABELS.user.profile}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className="mr-2 w-4 h-4" />
          <span>{LAYOUT_LABELS.user.favorites}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick}>
          <Settings className="mr-2 w-4 h-4" />
          <span>{LAYOUT_LABELS.user.settings}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 w-4 h-4" />
          <span>{LAYOUT_LABELS.auth.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
