"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Props for the AdminContentCard component
 */
interface AdminContentCardProps {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly description?: string;
  readonly padding?: "none" | "sm" | "md" | "lg";
  readonly className?: string;
}

/**
 * Admin content card component for wrapping content sections
 *
 * @param props - The component props
 * @returns The admin content card JSX
 */
export function AdminContentCard({
  children,
  title,
  description,
  padding = "none",
  className,
}: AdminContentCardProps): React.JSX.Element {
  const paddingClasses = {
    none: "",
    sm: "p-2 sm:p-4",
    md: "p-3 sm:p-4 md:p-6",
    lg: "p-4 sm:p-6 md:p-8",
  };

  return (
    <Card
      className={cn(
        "bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden",
        className
      )}
    >
      {(title || description) && (
        <CardHeader className="pb-4">
          {title && (
            <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          )}
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className={cn(paddingClasses[padding])}>
        {children}
      </CardContent>
    </Card>
  );
}
