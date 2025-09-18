"use client";

/**
 * Props for the SidebarChildrenContainer component
 */
interface SidebarChildrenContainerProps {
  readonly children: React.ReactNode;
}

/**
 * Container for sidebar children items with proper indentation
 *
 * @param props - The component props
 * @returns The sidebar children container JSX
 */
export function SidebarChildrenContainer({
  children,
}: SidebarChildrenContainerProps): React.JSX.Element {
  return <div className="space-y-1 mt-1 ml-6">{children}</div>;
}
