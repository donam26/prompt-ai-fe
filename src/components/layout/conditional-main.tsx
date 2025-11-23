"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ConditionalMainProps {
  children: React.ReactNode;
  className?: string;
}

export const ConditionalMain = ({
  children,
  className,
}: ConditionalMainProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <main
      className={cn(
        "flex flex-col flex-1 bg-white pt-0",
        !isHomePage ? "md:mt-[96px] mt-[54px]" : "",
        className
      )}
    >
      {children}
    </main>
  );
};
