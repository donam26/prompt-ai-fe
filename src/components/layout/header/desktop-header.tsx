"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { UserDropdown } from "@/components/user/user-dropdown";
import { cn } from "@/lib/utils";
import {
  LAYOUT_NAVIGATION,
  LAYOUT_IMAGES,
  LAYOUT_ROUTES,
  LAYOUT_LABELS,
  LAYOUT_CONFIG,
} from "@/constants/layout";
import { trackInstallExtension } from "@/lib/ga";

interface DesktopHeaderProps {
  readonly className?: string;
}

export const DesktopHeader = ({
  className,
}: DesktopHeaderProps): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
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
        "hidden md:flex justify-between items-center h-16",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link
          href={LAYOUT_ROUTES.home}
          className="flex items-center gap-3 text-inherit no-underline"
        >
          <div className="p-2 rounded-full">
            <Image
              src={LAYOUT_IMAGES.logo}
              alt={LAYOUT_IMAGES.logoAlt}
              width={LAYOUT_IMAGES.logoWidth}
              height={LAYOUT_IMAGES.logoHeight}
              className="w-auto h-8 xl:h-10"
              priority={LAYOUT_CONFIG.logoPriority}
            />
          </div>
        </Link>
      </div>

      {/* Center Navigation */}
      <nav className="flex items-center gap-4 lg:gap-8">
        {LAYOUT_NAVIGATION.items.map(item => {
          if (item.isExternal) {
            const handleExternalClick = () => {
              // Track extension install if it's a Chrome extension link
              if (item.href.includes("chromewebstore")) {
                const browser = navigator.userAgent.includes("Chrome")
                  ? "chrome"
                  : "other";
                trackInstallExtension({
                  who: user?.email || "guest",
                  browser,
                });
              }
            };

            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleExternalClick}
                className="flex items-center gap-1 font-bold text-gray-700 hover:text-[#5700c6] text-base transition-all duration-200"
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
                "flex items-center gap-1 font-bold text-base transition-all duration-200",
                pathname === item.href
                  ? "text-[#5700c6]"
                  : "text-gray-700 hover:text-[#5700c6]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {isHydrated && user ? (
          <>
            <Link
              href={LAYOUT_ROUTES.userInfoFavorites}
              className="group flex justify-center items-center hover:bg-gray-100 rounded-lg w-10 h-10 text-primary-600 hover:text-red-500 transition-all duration-200"
              aria-label="Favorites"
            >
              <Heart className="fill-current w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
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
              className="font-bold text-[#5700c6] hover:text-[#4a00a8] text-base transition-colors duration-200"
            >
              {LAYOUT_LABELS.auth.login}
            </Link>
            <Link
              href={LAYOUT_ROUTES.login}
              className="flex items-center gap-2 bg-[#5700c6] hover:bg-[#4a00a8] px-6 py-3 rounded-full font-bold text-white text-base transition-all duration-200"
            >
              {LAYOUT_LABELS.auth.register}
              <svg
                className="w-4 h-4"
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
          </>
        ) : (
          // Loading skeleton for hydration
          <div className="bg-gray-200 rounded-lg w-20 h-10 animate-pulse" />
        )}
      </div>
    </div>
  );
};
