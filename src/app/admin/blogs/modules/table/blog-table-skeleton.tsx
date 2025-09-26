"use client";

import React from "react";
// import { TableSkeleton } from "@/components/ui/skeleton";

export interface BlogTableSkeletonProps {
  readonly className?: string;
  readonly rows?: number;
}

export const BlogTableSkeleton = ({
  className,
  rows = 5,
}: BlogTableSkeletonProps): React.JSX.Element => {
  return (
    <div className={className}>
      {/* Table Header */}
      <div className="gap-4 grid grid-cols-12 bg-gray-50 p-4 border-b">
        <div className="col-span-1 bg-gray-200 rounded w-8 h-4 animate-pulse" />
        <div className="col-span-3 bg-gray-200 rounded w-24 h-4 animate-pulse" />
        <div className="col-span-2 bg-gray-200 rounded w-16 h-4 animate-pulse" />
        <div className="col-span-2 bg-gray-200 rounded w-20 h-4 animate-pulse" />
        <div className="col-span-2 bg-gray-200 rounded w-16 h-4 animate-pulse" />
        <div className="col-span-1 bg-gray-200 rounded w-12 h-4 animate-pulse" />
        <div className="col-span-1 bg-gray-200 rounded w-16 h-4 animate-pulse" />
      </div>

      {/* Table Rows */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="gap-4 grid grid-cols-12 p-4">
            <div className="col-span-1 bg-gray-200 rounded w-8 h-4 animate-pulse" />
            <div className="space-y-2 col-span-3">
              <div className="bg-gray-200 rounded w-3/4 h-4 animate-pulse" />
              <div className="bg-gray-200 rounded w-1/2 h-3 animate-pulse" />
            </div>
            <div className="col-span-2 bg-gray-200 rounded w-16 h-8 animate-pulse" />
            <div className="col-span-2 bg-gray-200 rounded w-20 h-8 animate-pulse" />
            <div className="col-span-2 bg-gray-200 rounded w-16 h-4 animate-pulse" />
            <div className="col-span-1 bg-gray-200 rounded w-12 h-4 animate-pulse" />
            <div className="col-span-1 bg-gray-200 rounded w-16 h-8 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
