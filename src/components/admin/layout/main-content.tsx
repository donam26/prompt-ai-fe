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
    const checkScreenSize = (): void => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();

    let ticking = false;
    const handleResize = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScreenSize();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentClasses = cn(
    "flex-1 bg-white dark:bg-gray-800 md:rounded-none rounded-t-2xl min-h-0 overflow-x-hidden overflow-y-auto",
    {
      "": shouldApplyPadding,
    }
  );

  return (
    <main
      className={contentClasses}
      style={{
        marginLeft: isMobile ? "0" : "auto",
        height: "100%",
        maxHeight: "100%",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="mb-10 pb-6 sm:pb-8 w-full min-w-0">{children}</div>
    </main>
  );
}
