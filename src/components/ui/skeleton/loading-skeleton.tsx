"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LoadingSkeletonProps {
  readonly className?: string;
  readonly variant?: "text" | "rectangular" | "circular" | "rounded";
  readonly width?: string | number;
  readonly height?: string | number;
  readonly lines?: number;
  readonly animation?: "pulse" | "wave";
}

export const LoadingSkeleton = ({
  className,
  variant = "rectangular",
  width,
  height,
  lines = 1,
  animation = "pulse",
}: LoadingSkeletonProps): React.JSX.Element => {
  const baseClasses = "bg-gray-200";
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-pulse",
  };

  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded",
    circular: "rounded-full",
    rounded: "rounded-md",
  };

  const style = {
    width: width || "100%",
    height: height || "1rem",
  };

  if (lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              animationClasses[animation],
              variantClasses[variant]
            )}
            style={{
              ...style,
              width: index === lines - 1 ? "75%" : "100%", // Last line shorter
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        animationClasses[animation],
        variantClasses[variant],
        className
      )}
      style={style}
    />
  );
};
