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
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div className="space-y-1 py-4 flex-1 min-w-0">
            <h1 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl break-words">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg break-words">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center justify-end sm:justify-start gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="admin-page-content">{children}</div>

      {showActionBottom && actions && (
        <div className="admin-page-action-bottom sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-10 shadow-sm">
          <div className="flex items-center justify-end gap-2">{actions}</div>
        </div>
      )}
    </div>
  );
}
