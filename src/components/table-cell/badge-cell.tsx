"use client";

import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BadgeCellProps {
  label?: string;
  value?: string;
  variant?:
    | "section"
    | "premium"
    | "industry"
    | "custom"
    | "secondary"
    | "ai"
    | "tech"
    | "business";
  icon?: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

const BADGE_VARIANTS = {
  section: {
    bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: <Award className="w-3 h-3" />,
  },
  premium: {
    bg: "bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: <span className="text-sm">⭐</span>,
  },
  industry: {
    bg: "bg-gradient-to-r from-gray-50 to-slate-50",
    text: "text-gray-700",
    border: "border-gray-200",
    icon: null,
  },
  custom: {
    bg: "",
    text: "",
    border: "",
    icon: null,
  },
  secondary: {
    bg: "bg-gradient-to-r from-emerald-50 to-teal-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: <span className="text-xs">📝</span>,
  },
  ai: {
    bg: "bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50",
    text: "text-purple-700",
    border: "border-purple-200",
    icon: <span className="text-xs">🤖</span>,
  },
  tech: {
    bg: "bg-gradient-to-r from-cyan-50 to-blue-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    icon: <span className="text-xs">💻</span>,
  },
  business: {
    bg: "bg-gradient-to-r from-green-50 to-emerald-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: <span className="text-xs">💼</span>,
  },
};

export function BadgeCell({
  label,
  value,
  variant = "custom",
  icon,
  className,
  maxWidth = "max-w-[100px]",
}: BadgeCellProps) {
  const badgeVariant = BADGE_VARIANTS[variant] || BADGE_VARIANTS.custom;
  const displayIcon = icon || badgeVariant?.icon;
  const displayLabel = label || value || "";

  return (
    <div className="flex justify-start items-center">
      <div
        className={cn(
          "inline-flex items-center gap-1.5 shadow-sm hover:shadow-lg px-3 py-1.5 border rounded-full font-medium text-xs hover:scale-105 transition-all hover:-translate-y-0.5 duration-200 cursor-default",
          badgeVariant.bg,
          badgeVariant.text,
          badgeVariant.border,
          className
        )}
      >
        {displayIcon && (
          <span className="flex-shrink-0 hover:scale-110 transition-transform duration-200">
            {displayIcon}
          </span>
        )}
        <span
          className={cn("font-semibold truncate", maxWidth)}
          title={displayLabel}
        >
          {displayLabel}
        </span>
      </div>
    </div>
  );
}
