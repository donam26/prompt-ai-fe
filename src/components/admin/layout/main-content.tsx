"use client";

import { cn } from "@/lib/utils";

/**
 * Props for the MainContent component
 */
interface MainContentProps {
  readonly children: React.ReactNode;
  readonly collapsed: boolean;
}

/**
 * Main content area component
 *
 * @param props - The component props
 * @returns The main content JSX
 */
export function MainContent({
  children,
  collapsed,
}: MainContentProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out admin-main-content"
      )}
    >
      <div className="admin-content-wrapper">{children}</div>
    </div>
  );
}
