"use client";

import { useState, useEffect } from "react";
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
 * Main header component for the application with improved responsive design
 *
 * @param props - The component props
 * @returns The header JSX
 */
export function Header({ className }: HeaderProps): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const isHomePage = pathname === LAYOUT_ROUTES.home;

  // Prevent hydration mismatch by waiting for client-side hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogout = (): void => {
    logout();
    router.push(LAYOUT_ROUTES.login);
  };

  return (
    <header
      className={cn(
        "top-0 z-50 sticky w-full font-medium transition-colors duration-200",
        isHomePage
          ? "bg-gradient-to-r from-[#E1F6FF] to-[#e6b8ff]"
          : "bg-white shadow-sm",
        className
      )}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 container">
        {/* Mobile Layout (xs to md) */}
        <div className="lg:hidden flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href={LAYOUT_ROUTES.home}
            className="flex flex-shrink-0 items-center gap-2 text-inherit no-underline"
          >
            <Image
              src={LAYOUT_IMAGES.logo}
              alt={LAYOUT_IMAGES.logoAlt}
              width={LAYOUT_IMAGES.logoWidth}
              height={LAYOUT_IMAGES.logoHeight}
              className="w-auto h-8 sm:h-10"
              priority={LAYOUT_CONFIG.logoPriority}
            />
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2">
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
                  size="sm"
                  className="hover:bg-transparent p-2 text-gray-700 hover:text-primary-600"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-80 sm:w-96">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex justify-between items-center p-6 border-b">
                    <Image
                      src={LAYOUT_IMAGES.logo}
                      alt={LAYOUT_IMAGES.logoAlt}
                      width={80}
                      height={26}
                      className="w-auto h-6"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2"
                    >
                      ×
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-2">
                      {LAYOUT_NAVIGATION.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex justify-center items-center px-4 py-3 rounded-lg w-full h-10 font-medium text-base transition-colors duration-200",
                            pathname === item.href
                              ? "text-primary-600 bg-primary-50"
                              : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Auth Buttons */}
                    {isHydrated && !user && (
                      <div className="space-y-3 mt-8 pt-6 border-t">
                        <Link
                          href={LAYOUT_ROUTES.login}
                          className="block rounded-lg btn-primary-outline w-full font-medium text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {LAYOUT_LABELS.auth.login}
                        </Link>
                        <Link
                          href={LAYOUT_ROUTES.register}
                          className="block rounded-lg w-full font-medium text-center btn-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {LAYOUT_LABELS.auth.register}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop/Tablet Layout (lg and up) */}
        <div className="hidden lg:flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={LAYOUT_ROUTES.home}
              className="flex items-center gap-3 text-inherit no-underline"
            >
              <Image
                src={LAYOUT_IMAGES.logo}
                alt={LAYOUT_IMAGES.logoAlt}
                width={LAYOUT_IMAGES.logoWidth}
                height={LAYOUT_IMAGES.logoHeight}
                className="w-auto h-10 xl:h-12"
                priority={LAYOUT_CONFIG.logoPriority}
              />
            </Link>
          </div>

          {/* Center Navigation */}
          <nav className="flex items-center gap-2 space-x-1 xl:space-x-2">
            {LAYOUT_NAVIGATION.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex justify-center items-center px-3 xl:px-4 py-2 xl:py-2 rounded-lg h-10 font-medium text-sm xl:text-base whitespace-nowrap transition-all duration-200",
                  pathname === item.href
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 xl:gap-4">
            {isHydrated && user ? (
              <>
                <Link
                  href={LAYOUT_ROUTES.userInfoFavorites}
                  className="group flex justify-center items-center hover:bg-gray-100 rounded-lg w-10 xl:w-11 h-10 xl:h-11 text-primary-600 hover:text-red-500 transition-all duration-200"
                  aria-label="Favorites"
                >
                  <Heart className="fill-current w-5 xl:w-6 h-5 xl:h-6 group-hover:scale-110 transition-transform duration-200" />
                </Link>
                <UserDropdown
                  user={{ ...user, id: Number(user.id) }}
                  onLogout={handleLogout}
                />
              </>
            ) : isHydrated ? (
              <>
                <Link
                  href={LAYOUT_ROUTES.login}
                  className="px-5 xl:px-6 rounded-lg font-medium text-sm xl:text-base btn-primary"
                >
                  {LAYOUT_LABELS.auth.login}
                </Link>
              </>
            ) : (
              // Loading skeleton for hydration
              <div className="bg-gray-200 rounded-lg w-20 h-10 animate-pulse" />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
