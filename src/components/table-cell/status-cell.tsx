"use client";

import { Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatusCellProps {
  isComingSoon?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  className?: string;
}

const STATUS_THEMES = {
  active: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: Globe,
    label: "Hoạt động",
  },
  inactive: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    icon: Lock,
    label: "Không hoạt động",
  },
  comingSoon: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: Lock,
    label: "Coming Soon",
  },
  deleted: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: Lock,
    label: "Đã xóa",
  },
};

export function StatusCell({
  isComingSoon = false,
  isActive = true,
  isDeleted = false,
  className,
}: StatusCellProps) {
  let theme = isActive ? STATUS_THEMES.active : STATUS_THEMES.inactive;

  if (isDeleted) {
    theme = STATUS_THEMES.deleted;
  } else if (isComingSoon) {
    theme = STATUS_THEMES.comingSoon;
  }

  const Icon = theme.icon;

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "inline-flex items-center gap-1.5 shadow-sm hover:shadow-md px-3 py-1.5 rounded-full font-medium text-xs whitespace-nowrap transition-shadow",
          theme.bg,
          theme.text,
          theme.border,
          "border",
          className
        )}
      >
        <Icon className="flex-shrink-0 w-3 h-3" />
        <span className="hidden xs:inline">{theme.label}</span>
        <span className="xs:hidden">
          {isComingSoon ? "Soon" : isDeleted ? "Xóa" : "OK"}
        </span>
      </div>
    </div>
  );
}
