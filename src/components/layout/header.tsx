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
  const isHomePage = pathname === LAYOUT_ROUTES.home;

  return (
    <header
      className={cn(
        "top-0 z-50 absolute w-full font-medium transition-colors duration-200",
        isHomePage
          ? "bg-transparent py-0 sm:py-4"
          : "bg-white shadow-sm py-0 sm:py-4",
        className
      )}
    >
      <div className="mx-0 sm:mx-auto max-w-[1084px] sm:max-w-[1084px]">
        {/* Main Navigation Container */}
        <nav className="items-center bg-white/95 mobile-header-shadow sm:shadow-lg backdrop-blur-sm mx-0 sm:mx-6 lg:mx-8 xl:mx-12 px-0 sm:px-6 rounded-full h-16">
          <MobileHeader />
          <DesktopHeader />
        </nav>
      </div>
    </header>
  );
}
