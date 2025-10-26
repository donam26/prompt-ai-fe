"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MainContentProps {
  readonly children: React.ReactNode;
  readonly shouldApplyPadding: boolean;
}

export function MainContent({
  children,
  shouldApplyPadding,
}: MainContentProps): React.JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const contentClasses = cn(
    "flex-1 bg-white dark:bg-gray-800 md:rounded-none rounded-t-2xl overflow-x-hidden",
    {
      "p-2 sm:p-4 md:p-8 lg:p-10 !pt-0": shouldApplyPadding,
    }
  );

  return (
    <main
      className={contentClasses}
      style={{
        marginLeft: isMobile ? "0" : "auto",
      }}
    >
      {children}
    </main>
  );
}
