"use client";

import { cn } from "@/lib/utils";

interface MainContentProps {
  readonly children: React.ReactNode;
  readonly shouldApplyPadding: boolean;
}

export function MainContent({
  children,
  shouldApplyPadding,
}: MainContentProps): React.JSX.Element {
  const contentClasses = cn(
    "flex-1 bg-white dark:bg-gray-800 md:rounded-none rounded-t-2xl overflow-x-hidden",
    {
      "p-2 sm:p-4 md:p-8 lg:p-10": shouldApplyPadding,
    }
  );

  return <main className={contentClasses}>{children}</main>;
}
