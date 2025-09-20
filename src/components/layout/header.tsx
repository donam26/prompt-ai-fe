"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Menu } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { UserDropdown } from "@/components/user/user-dropdown";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  LAYOUT_NAVIGATION,
  LAYOUT_IMAGES,
  LAYOUT_CLASSES,
  LAYOUT_ROUTES,
  LAYOUT_LABELS,
  LAYOUT_CONFIG,
} from "@/constants/layout";

/**
 * Props for the Header component
 */
interface HeaderProps {
  readonly className?: string;
}

/**
 * Main header component for the application
 *
 * @param props - The component props
 * @returns The header JSX
 */
export function Header({ className }: HeaderProps): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Removed unused state variables
  const isHomePage = pathname === LAYOUT_ROUTES.home;

  const handleLogout = (): void => {
    logout();
    router.push(LAYOUT_ROUTES.login);
  };

  return (
    <nav
      className={cn(
        "z-50 relative items-center gap-4 grid grid-cols-12 p-4 sm:px-6 xl:px-12 w-full font-medium",
        isHomePage
          ? "bg-gradient-to-r from-[#E1F6FF] to-[#e6b8ff]"
          : "bg-white",
        className
      )}
    >
      {/* Left Side - Logo (3 columns) */}
      <div className="flex items-center col-span-3">
        <Link
          href={LAYOUT_ROUTES.home}
          className="flex items-center gap-2.5 text-inherit no-underline"
        >
          <Image
            src={LAYOUT_IMAGES.logo}
            alt={LAYOUT_IMAGES.logoAlt}
            width={LAYOUT_IMAGES.logoWidth}
            height={LAYOUT_IMAGES.logoHeight}
            className="w-auto h-12"
            priority={LAYOUT_CONFIG.logoPriority}
          />
        </Link>
      </div>

      {/* Center - Navigation Menu (6 columns) */}
      <div className="hidden lg:flex justify-center items-center gap-4 lg:gap-8 col-span-6 text-base lg:text-xl">
        {LAYOUT_NAVIGATION.items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "font-medium hover:font-bold text-gray-800 hover:text-purple-600 text-base no-underline transition-colors duration-200",
              pathname === item.href ? "font-bold text-purple-600" : ""
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Menu */}
      <div className="lg:hidden flex justify-end col-span-3">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="z-50 bg-none p-2 border-none text-black hover:text-purple-600 text-2xl cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className={LAYOUT_CLASSES.header.mobileSheet}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                {LAYOUT_NAVIGATION.items.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      LAYOUT_CLASSES.header.mobileNavItem,
                      pathname === item.href
                        ? LAYOUT_CLASSES.header.mobileNavItemActive
                        : LAYOUT_CLASSES.header.mobileNavItemInactive
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className={LAYOUT_CLASSES.header.mobileAuthButtons}>
                  <Link
                    href={LAYOUT_ROUTES.login}
                    className={LAYOUT_CLASSES.header.mobileLoginBtn}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {LAYOUT_LABELS.auth.login}
                  </Link>
                  <Link
                    href={LAYOUT_ROUTES.register}
                    className={LAYOUT_CLASSES.header.mobileSignupBtn}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {LAYOUT_LABELS.auth.register}
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Right Side Actions (3 columns) - Hidden on mobile */}
      <div className="hidden lg:flex justify-end items-center gap-5 col-span-3">
        {user ? (
          <>
            <Link
              href={LAYOUT_ROUTES.userInfoFavorites}
              className="group flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded transition-all duration-200 cursor-pointer"
            >
              <Heart className="fill-current text-purple-600 group-hover:text-red-500 text-xl transition duration-200" />
            </Link>

            <UserDropdown
              user={{ ...user, id: Number(user.id) }}
              onLogout={handleLogout}
            />
          </>
        ) : (
          <>
            <Link
              href={LAYOUT_ROUTES.login}
              className="font-medium hover:font-bold text-purple-600 text-lg no-underline transition-colors duration-200"
            >
              {LAYOUT_LABELS.auth.login}
            </Link>
            <Link
              href={LAYOUT_ROUTES.register}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium text-white text-lg no-underline transition-colors duration-200 cursor-pointer"
            >
              {LAYOUT_LABELS.auth.register}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
