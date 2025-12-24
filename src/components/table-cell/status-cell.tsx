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
    label: "Sắp ra mắt",
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
  isActive = false,
  isDeleted = false,
  className,
}: StatusCellProps) {
  // Priority: deleted > comingSoon > active > inactive
  let theme: (typeof STATUS_THEMES)[keyof typeof STATUS_THEMES];

  if (isDeleted === true) {
    theme = STATUS_THEMES.deleted;
  } else if (isComingSoon === true) {
    theme = STATUS_THEMES.comingSoon;
  } else if (isActive === true) {
    theme = STATUS_THEMES.active;
  } else {
    // Default: active (for categories, false/undefined means active/available)
    theme = STATUS_THEMES.active;
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
        <span className="text-xs">{theme.label}</span>
      </div>
    </div>
  );
}
