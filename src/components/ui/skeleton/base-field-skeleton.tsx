"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BaseFieldSkeletonProps {
  readonly className?: string;
  readonly showLabel?: boolean;
  readonly height?: "sm" | "md" | "lg";
  readonly variant?: "input" | "textarea" | "select" | "image" | "tags";
}

export const BaseFieldSkeleton = ({
  className,
  showLabel = true,
  height = "md",
  variant = "input",
}: BaseFieldSkeletonProps): React.JSX.Element => {
  const heightClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  const variantClasses = {
    input: "rounded-md",
    textarea: "rounded-md",
    select: "rounded-md",
    image: "rounded-md",
    tags: "rounded-md",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="bg-gray-200 rounded w-24 h-4 animate-pulse" />
      )}
      <div
        className={cn(
          "bg-gray-200 animate-pulse",
          heightClasses[height],
          variantClasses[variant],
          variant === "textarea" && "h-20",
          variant === "image" && "h-32"
        )}
      />
    </div>
  );
};
