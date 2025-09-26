"use client";

import React from "react";
import { BaseFieldSkeleton } from "./base-field-skeleton";

export interface FormSkeletonProps {
  readonly className?: string;
  readonly fields?: number;
  readonly showActions?: boolean;
}

export const FormSkeleton = ({
  className,
  fields = 6,
  showActions = true,
}: FormSkeletonProps): React.JSX.Element => {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      {/* Title field */}
      <BaseFieldSkeleton variant="input" height="md" />

      {/* Excerpt field */}
      <BaseFieldSkeleton variant="textarea" height="lg" />

      {/* Status and Category row */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <BaseFieldSkeleton variant="select" height="md" />
        <BaseFieldSkeleton variant="select" height="md" />
      </div>

      {/* Featured Image field */}
      <BaseFieldSkeleton variant="image" height="lg" />

      {/* Tags field */}
      <BaseFieldSkeleton variant="tags" height="md" />

      {/* Content field */}
      <BaseFieldSkeleton variant="textarea" height="lg" />

      {/* Additional fields if specified */}
      {fields > 6 &&
        Array.from({ length: fields - 6 }).map((_, index) => (
          <BaseFieldSkeleton key={index} variant="input" height="md" />
        ))}

      {/* Actions skeleton */}
      {showActions && (
        <div className="flex justify-end items-center gap-6 pt-6 border-t">
          <div className="bg-gray-200 rounded w-20 h-10 animate-pulse" />
          <div className="bg-gray-200 rounded w-24 h-10 animate-pulse" />
        </div>
      )}
    </div>
  );
};
