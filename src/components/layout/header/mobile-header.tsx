"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRightIcon, Heart, Menu, X } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { UserDropdown } from "@/components/user/user-dropdown";
import { Button } from "@/components/ui/button";
// Remove Sheet import - we'll use custom mobile menu
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
          src="/icons/logos/logo-final-1.png"
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
        <Button
          variant="ghost"
          className="hover:bg-transparent p-2 text-gray-700 hover:text-primary-600 hover:scale-105 transition-all duration-200"
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6 hover:rotate-90 transition-transform duration-200" />
        </Button>
      </div>

      {/* Custom Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="z-40 fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              animation: "fadeIn 0.2s ease-out",
            }}
          />

          {/* Menu Panel */}
          <div
            className="top-0 right-0 z-50 fixed bg-white shadow-2xl w-80 sm:w-96 mobile-menu-panel"
            style={{
              animation: "slideInFromRight 0.3s ease-out",
            }}
          >
            <div className="flex flex-col bg-white h-full">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center px-6 py-4 border-gray-100 border-b">
                <Image
                  src={LAYOUT_IMAGES.logo}
                  alt={LAYOUT_IMAGES.logoAlt}
                  width={LAYOUT_IMAGES.logoWidth}
                  height={LAYOUT_IMAGES.logoHeight}
                  className="w-auto h-6"
                  style={{ width: "auto", height: "auto" }}
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:bg-gray-100 p-2 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 px-6 py-4 mobile-menu-content">
                <nav className="space-y-2">
                  {LAYOUT_NAVIGATION.items.map(item => {
                    if (item.isExternal) {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-center items-center hover:bg-gray-50 px-4 py-3 rounded-lg w-full font-bold text-gray-700 hover:text-[#5700c6] text-base hover:scale-105 transition-all duration-300 transform"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex justify-center items-center px-4 py-3 rounded-lg w-full font-bold text-base hover:scale-105 transition-all duration-300 transform",
                          pathname === item.href
                            ? "text-[#5700c6] bg-purple-50 shadow-sm"
                            : "text-gray-700 hover:text-[#5700c6] hover:bg-gray-50 hover:shadow-sm"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Auth Buttons */}
                {isHydrated && !user && (
                  <div className="space-y-3 mt-6 pt-4 border-gray-100 border-t">
                    <Link
                      href={LAYOUT_ROUTES.login}
                      className="block hover:bg-purple-50 py-3 border-[#5700c6] border-2 rounded-lg w-full font-bold text-[#5700c6] text-center hover:scale-105 transition-all duration-300 transform"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {LAYOUT_LABELS.auth.login}
                    </Link>
                    <Link
                      href={LAYOUT_ROUTES.login}
                      className="group flex justify-center items-center gap-2 bg-[#5700c6] hover:bg-[#4a00a8] px-6 py-3 rounded-full w-full font-bold text-white text-base hover:scale-105 transition-all duration-300 transform"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {LAYOUT_LABELS.auth.register}
                      <ArrowRightIcon className="w-5 h-5 font-bold transition-transform group-hover:translate-x-1 duration-200" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
