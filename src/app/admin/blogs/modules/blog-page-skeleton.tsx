"use client";

import React from "react";
// import { CardSkeleton } from "@/components/ui/skeleton";

export interface BlogPageSkeletonProps {
  readonly className?: string;
}

export const BlogPageSkeleton = ({
  className,
}: BlogPageSkeletonProps): React.JSX.Element => {
  return (
    <div className={className}>
      {/* Page Header Skeleton */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="bg-gray-200 rounded w-48 h-8 animate-pulse" />
            <div className="bg-gray-200 rounded w-64 h-4 animate-pulse" />
          </div>
          <div className="bg-gray-200 rounded w-32 h-10 animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-4">
          <div className="bg-gray-200 rounded w-48 h-10 animate-pulse" />
          <div className="bg-gray-200 rounded w-32 h-10 animate-pulse" />
          <div className="bg-gray-200 rounded w-24 h-10 animate-pulse" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white p-6 border rounded-lg">
        <div className="space-y-4">
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
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="gap-4 grid grid-cols-12 p-4 border-b">
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

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center mt-6">
        <div className="bg-gray-200 rounded w-32 h-4 animate-pulse" />
        <div className="flex gap-2">
          <div className="bg-gray-200 rounded w-8 h-8 animate-pulse" />
          <div className="bg-gray-200 rounded w-8 h-8 animate-pulse" />
          <div className="bg-gray-200 rounded w-8 h-8 animate-pulse" />
          <div className="bg-gray-200 rounded w-8 h-8 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
