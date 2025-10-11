"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LAYOUT_ROUTES } from "@/constants/layout";
import { MobileHeader } from "./header/mobile-header";
import { DesktopHeader } from "./header/desktop-header";

interface HeaderProps {
  readonly className?: string;
}

export function Header({ className }: HeaderProps): React.JSX.Element {
  const pathname = usePathname();
  const isHomePage =
    pathname === LAYOUT_ROUTES.home || pathname === LAYOUT_ROUTES.homeAlt;

  return (
    <header
      className={cn(
        "top-0 z-50 absolute w-full font-medium transition-colors duration-200",
        isHomePage ? "bg-transparent" : "",
        className
      )}
    >
      <div className="mx-0 sm:mx-auto max-w-[1084px] sm:max-w-[1084px]">
        {/* Main Navigation Container */}
        <nav className="items-center bg-white mobile-header-shadow sm:shadow-lg backdrop-blur-sm m-0 sm:m-4 px-0 sm:px-6 rounded-none sm:rounded-full h-16">
          <MobileHeader />
          <DesktopHeader />
        </nav>
      </div>
    </header>
  );
}
