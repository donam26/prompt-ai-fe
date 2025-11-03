"use client";

import { cn } from "@/lib/utils";

/**
 * Props for the AdminPageLayout component
 */
interface AdminPageLayoutProps {
  readonly title: string;
  readonly description?: string;
  readonly actions?: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly showActionBottom?: boolean;
}

/**
 * Admin page layout component with header and content area
 *
 * @param props - The component props
 * @returns The admin page layout JSX
 */
export function AdminPageLayout({
  title,
  description,
  actions,
  children,
  className,
  showActionBottom = false,
}: AdminPageLayoutProps): React.JSX.Element {
  return (
    <div className={cn("admin-page-layout", className)}>
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="flex justify-between items-center">
          <div className="space-y-1 py-4">
            <h1 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-3xl">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-2">{actions}</div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="admin-page-content">{children}</div>

      {showActionBottom && (
        <div className="admin-page-action-bottom">{actions}</div>
      )}
    </div>
  );
}
