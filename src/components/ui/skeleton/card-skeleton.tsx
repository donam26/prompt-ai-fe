"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardSkeletonProps {
  readonly className?: string;
  readonly showHeader?: boolean;
  readonly showContent?: boolean;
  readonly showActions?: boolean;
  readonly contentLines?: number;
}

export const CardSkeleton = ({
  className,
  showHeader = true,
  showContent = true,
  showActions = true,
  contentLines = 3,
}: CardSkeletonProps): React.JSX.Element => {
  return (
    <div className={cn("bg-white p-6 border rounded-lg", className)}>
      {/* Card Header */}
      {showHeader && (
        <div className="space-y-2 mb-4">
          <div className="bg-gray-200 rounded w-3/4 h-6 animate-pulse" />
          <div className="bg-gray-200 rounded w-1/2 h-4 animate-pulse" />
        </div>
      )}

      {/* Card Content */}
      {showContent && (
        <div className="space-y-3 mb-6">
          {Array.from({ length: contentLines }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded h-4 animate-pulse"
              style={{
                width: `${Math.random() * 40 + 60}%`, // Random width between 60-100%
              }}
            />
          ))}
        </div>
      )}

      {/* Card Actions */}
      {showActions && (
        <div className="flex justify-end gap-3">
          <div className="bg-gray-200 rounded w-20 h-10 animate-pulse" />
          <div className="bg-gray-200 rounded w-24 h-10 animate-pulse" />
        </div>
      )}
    </div>
  );
};
