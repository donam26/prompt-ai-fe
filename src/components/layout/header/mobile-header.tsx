"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Menu } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { UserDropdown } from "@/components/user/user-dropdown";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  LAYOUT_NAVIGATION,
  LAYOUT_IMAGES,
  LAYOUT_ROUTES,
  LAYOUT_LABELS,
  LAYOUT_CONFIG,
} from "@/constants/layout";

interface MobileHeaderProps {
  readonly className?: string;
}

export const MobileHeader = ({
  className,
}: MobileHeaderProps): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Prevent hydration mismatch by waiting for client-side hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogout = (): void => {
    logout();
    router.push(LAYOUT_ROUTES.login);
  };

  return (
    <div
      className={cn(
        "md:hidden flex justify-between items-center h-16 min-h-[64px]",
        className
      )}
    >
      {/* Logo */}
      <Link
        href={LAYOUT_ROUTES.home}
        className="flex flex-shrink-0 items-center gap-2 pl-4 text-inherit no-underline"
      >
        <Image
          src={LAYOUT_IMAGES.logo}
          alt={LAYOUT_IMAGES.logoAlt}
          width={LAYOUT_IMAGES.logoWidth}
          height={LAYOUT_IMAGES.logoHeight}
          className="w-auto h-8 sm:h-10"
          style={{ width: "auto", height: "auto" }}
          priority={LAYOUT_CONFIG.logoPriority}
        />
      </Link>

      {/* Mobile Actions */}
      <div className="flex items-center gap-2 pr-4">
        {/* Mobile User Actions */}
        {isHydrated && user && (
          <>
            <Link
              href={LAYOUT_ROUTES.userInfoFavorites}
              className="p-2 text-primary-600 hover:text-red-500 transition-colors duration-200"
              aria-label="Favorites"
            >
              <Heart className="fill-current w-5 h-5" />
            </Link>
            <UserDropdown
              user={{ ...user, id: Number(user.id) }}
              onLogout={handleLogout}
            />
          </>
        )}

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-transparent p-2 text-gray-700 hover:text-primary-600 hover:scale-105 transition-all duration-200"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 hover:rotate-90 transition-transform duration-200" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-white shadow-2xl p-0 border-l-0 w-80 sm:w-96 animate-slide-in-right"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation menu with links to different sections of the
              website
            </SheetDescription>
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center px-6 py-4 border-gray-100 border-b animate-slide-in-top">
                <Image
                  src={LAYOUT_IMAGES.logo}
                  alt={LAYOUT_IMAGES.logoAlt}
                  width={LAYOUT_IMAGES.logoWidth}
                  height={LAYOUT_IMAGES.logoHeight}
                  className="w-auto h-6"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 px-6 py-4 animate-slide-in-left">
                <nav className="space-y-2">
                  {LAYOUT_NAVIGATION.items.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex justify-center items-center opacity-0 px-4 py-2 rounded-lg w-full h-12 font-medium text-base hover:scale-105 transition-all animate-fade-in-up duration-300 transform",
                        pathname === item.href
                          ? "text-[#5700c6] bg-purple-50 shadow-sm"
                          : "text-gray-700 hover:text-[#5700c6] hover:bg-gray-50 hover:shadow-sm"
                      )}
                      style={{
                        animationDelay: `${300 + index * 50}ms`,
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                {isHydrated && !user && (
                  <div className="space-y-3 mt-6 pt-4 border-gray-100 border-t animate-slide-in-bottom">
                    <Link
                      href={LAYOUT_ROUTES.login}
                      className="block hover:bg-purple-50 opacity-0 hover:shadow-sm py-3 border-[#5700c6] border-2 rounded-lg w-full font-medium text-[#5700c6] text-center hover:scale-105 transition-all animate-fade-in-up duration-300 transform"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        animationDelay: "600ms",
                      }}
                    >
                      {LAYOUT_LABELS.auth.login}
                    </Link>
                    <Link
                      href={LAYOUT_ROUTES.register}
                      className="group flex justify-center items-center gap-2 bg-[#5700c6] hover:bg-[#4a00a8] opacity-0 hover:shadow-lg px-6 py-3 rounded-full w-full font-medium text-white text-base hover:scale-105 transition-all animate-fade-in-up duration-300 transform"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        animationDelay: "650ms",
                      }}
                    >
                      {LAYOUT_LABELS.auth.register}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
