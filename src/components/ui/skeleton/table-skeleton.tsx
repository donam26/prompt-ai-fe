"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TableSkeletonProps {
  readonly className?: string;
  readonly rows?: number;
  readonly columns?: number;
  readonly showHeader?: boolean;
}

export const TableSkeleton = ({
  className,
  rows = 5,
  columns = 4,
  showHeader = true,
}: TableSkeletonProps): React.JSX.Element => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Table Header */}
      {showHeader && (
        <div
          className="gap-4 grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded w-20 h-4 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Table Rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="gap-4 grid"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="bg-gray-200 rounded h-4 animate-pulse"
                style={{
                  width: `${Math.random() * 40 + 60}%`, // Random width between 60-100%
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
