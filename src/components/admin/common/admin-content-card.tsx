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
  readonly className?: string;
}

export function AdminContentCard({
  children,
  title,
  description,
  className,
}: AdminContentCardProps): React.JSX.Element {
  return (
    <Card
      className={cn(
        "flex flex-col bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl w-full min-w-0 min-h-0",
        className
      )}
    >
      {(title || description) && (
        <CardHeader className="flex-shrink-0 pb-8">
          {title && (
            <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          )}
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className="flex-1 w-full min-w-0 min-h-0 overflow-visible">
        {children}
      </CardContent>
    </Card>
  );
}
