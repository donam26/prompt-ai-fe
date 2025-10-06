"use client";

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

  return (
    <main
      className={cn(
        "flex flex-col flex-1 bg-white pt-0",
        !isHomePage ? "mt-[96px]" : "",
        className
      )}
    >
      {children}
    </main>
  );
};
