"use client";

import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BadgeCellProps {
  label: string;
  variant?: "section" | "premium" | "industry" | "custom";
  icon?: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

const BADGE_VARIANTS = {
  section: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: <Award className="w-3 h-3" />,
  },
  premium: {
    bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: <span className="text-sm">⭐</span>,
  },
  industry: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
    icon: null,
  },
  custom: {
    bg: "",
    text: "",
    border: "",
    icon: null,
  },
};

export function BadgeCell({
  label,
  variant = "custom",
  icon,
  className,
  maxWidth = "max-w-[100px]",
}: BadgeCellProps) {
  const badgeVariant = BADGE_VARIANTS[variant];
  const displayIcon = icon || badgeVariant.icon;

  return (
    <div className="flex justify-start items-center">
      <div
        className={cn(
          "inline-flex items-center gap-1.5 shadow-sm hover:shadow-md px-3 py-1.5 border rounded-full font-medium text-xs transition-shadow",
          badgeVariant.bg,
          badgeVariant.text,
          badgeVariant.border,
          className
        )}
      >
        {displayIcon && <span className="flex-shrink-0">{displayIcon}</span>}
        <span className={cn("truncate", maxWidth)} title={label}>
          {label}
        </span>
      </div>
    </div>
  );
}
