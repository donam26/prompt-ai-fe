"use client";

import {
  Award,
  Building2,
  Users,
  User,
  Shield,
  Star,
  Zap,
  Heart,
  Sparkles,
} from "lucide-react";
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
    | "business"
    | "administrator"
    | "organization"
    | "teacher"
    | "student"
    | "creative"
    | "marketing"
    | "education"
    | "healthcare"
    | "finance"
    | "entertainment"
    | "sports"
    | "travel"
    | "food"
    | "fashion"
    | "gaming"
    | "default";
  icon?: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

const BADGE_VARIANTS = {
  section: {
    bg: "bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-300 shadow-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20 dark:border-indigo-600/50 dark:shadow-indigo-900/20",
    text: "text-indigo-800 dark:text-indigo-200",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    icon: <Award className="w-3.5 h-3.5" />,
  },
  premium: {
    bg: "bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-amber-300 shadow-amber-100 dark:from-yellow-900/30 dark:via-amber-800/20 dark:to-orange-800/20 dark:border-amber-600/50 dark:shadow-amber-900/20",
    text: "text-amber-800 dark:text-amber-200",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: <Star className="w-3.5 h-3.5" />,
  },
  industry: {
    bg: "bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-purple-200 shadow-purple-100 dark:from-purple-900/40 dark:via-pink-900/30 dark:to-blue-900/40 dark:border-purple-500/50 dark:shadow-purple-900/30",
    text: "text-purple-800 dark:text-purple-100",
    iconColor: "text-purple-600 dark:text-purple-300",
    icon: <Building2 className="w-3.5 h-3.5" />,
  },
  custom: {
    bg: "",
    text: "",
    iconColor: "",
    icon: null,
  },
  secondary: {
    bg: "bg-gradient-to-r from-teal-50 to-emerald-100 border-teal-300 shadow-teal-100 dark:from-teal-900/30 dark:to-emerald-800/20 dark:border-teal-600/50 dark:shadow-teal-900/20",
    text: "text-teal-800 dark:text-teal-200",
    iconColor: "text-teal-600 dark:text-teal-400",
    icon: <span className="text-xs">📝</span>,
  },
  ai: {
    bg: "bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 border-purple-300 shadow-purple-100 dark:from-violet-900/30 dark:via-purple-800/20 dark:to-fuchsia-800/20 dark:border-purple-600/50 dark:shadow-purple-900/20",
    text: "text-purple-800 dark:text-purple-200",
    iconColor: "text-purple-600 dark:text-purple-400",
    icon: <span className="text-xs">🤖</span>,
  },
  tech: {
    bg: "bg-gradient-to-r from-sky-50 to-cyan-100 border-sky-300 shadow-sky-100 dark:from-sky-900/30 dark:to-cyan-800/20 dark:border-sky-600/50 dark:shadow-sky-900/20",
    text: "text-sky-800 dark:text-sky-200",
    iconColor: "text-sky-600 dark:text-sky-400",
    icon: <span className="text-xs">💻</span>,
  },
  business: {
    bg: "bg-gradient-to-r from-lime-50 to-green-100 border-lime-300 shadow-lime-100 dark:from-lime-900/30 dark:to-green-800/20 dark:border-lime-600/50 dark:shadow-lime-900/20",
    text: "text-lime-800 dark:text-lime-200",
    iconColor: "text-lime-600 dark:text-lime-400",
    icon: <span className="text-xs">💼</span>,
  },
  administrator: {
    bg: "bg-gradient-to-r from-rose-50 to-red-100 border-rose-300 shadow-rose-100 dark:from-rose-900/30 dark:to-red-800/20 dark:border-rose-600/50 dark:shadow-rose-900/20",
    text: "text-rose-800 dark:text-rose-200",
    iconColor: "text-rose-600 dark:text-rose-400",
    icon: <Shield className="w-3.5 h-3.5" />,
  },
  organization: {
    bg: "bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-300 shadow-blue-100 dark:from-blue-900/30 dark:to-indigo-800/20 dark:border-blue-600/50 dark:shadow-blue-900/20",
    text: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: <Building2 className="w-3.5 h-3.5" />,
  },
  teacher: {
    bg: "bg-gradient-to-r from-orange-50 to-amber-100 border-orange-300 shadow-orange-100 dark:from-orange-900/30 dark:to-amber-800/20 dark:border-orange-600/50 dark:shadow-orange-900/20",
    text: "text-orange-800 dark:text-orange-200",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: <Users className="w-3.5 h-3.5" />,
  },
  student: {
    bg: "bg-gradient-to-r from-emerald-50 to-teal-100 border-emerald-300 shadow-emerald-100 dark:from-emerald-900/30 dark:to-teal-800/20 dark:border-emerald-600/50 dark:shadow-emerald-900/20",
    text: "text-emerald-800 dark:text-emerald-200",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: <User className="w-3.5 h-3.5" />,
  },
  creative: {
    bg: "bg-gradient-to-r from-pink-50 via-rose-50 to-fuchsia-50 border-pink-300 shadow-pink-100 dark:from-pink-900/30 dark:via-rose-800/20 dark:to-fuchsia-800/20 dark:border-pink-600/50 dark:shadow-pink-900/20",
    text: "text-pink-800 dark:text-pink-200",
    iconColor: "text-pink-600 dark:text-pink-400",
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  marketing: {
    bg: "bg-gradient-to-r from-violet-50 to-purple-100 border-violet-300 shadow-violet-100 dark:from-violet-900/30 dark:to-purple-800/20 dark:border-violet-600/50 dark:shadow-violet-900/20",
    text: "text-violet-800 dark:text-violet-200",
    iconColor: "text-violet-600 dark:text-violet-400",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  education: {
    bg: "bg-gradient-to-r from-blue-50 to-sky-100 border-blue-300 shadow-blue-100 dark:from-blue-900/30 dark:to-sky-800/20 dark:border-blue-600/50 dark:shadow-blue-900/20",
    text: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: <Users className="w-3.5 h-3.5" />,
  },
  healthcare: {
    bg: "bg-gradient-to-r from-green-50 to-emerald-100 border-green-300 shadow-green-100 dark:from-green-900/30 dark:to-emerald-800/20 dark:border-green-600/50 dark:shadow-green-900/20",
    text: "text-green-800 dark:text-green-200",
    iconColor: "text-green-600 dark:text-green-400",
    icon: <Heart className="w-3.5 h-3.5" />,
  },
  finance: {
    bg: "bg-gradient-to-r from-slate-50 to-gray-100 border-slate-300 shadow-slate-100 dark:from-slate-800/50 dark:to-gray-700/30 dark:border-slate-600 dark:shadow-slate-900/20",
    text: "text-slate-800 dark:text-slate-200",
    iconColor: "text-slate-600 dark:text-slate-400",
    icon: <span className="text-xs">💰</span>,
  },
  entertainment: {
    bg: "bg-gradient-to-r from-yellow-50 to-orange-100 border-yellow-300 shadow-yellow-100 dark:from-yellow-900/30 dark:to-orange-800/20 dark:border-yellow-600/50 dark:shadow-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-200",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    icon: <span className="text-xs">🎬</span>,
  },
  sports: {
    bg: "bg-gradient-to-r from-red-50 to-orange-100 border-red-300 shadow-red-100 dark:from-red-900/30 dark:to-orange-800/20 dark:border-red-600/50 dark:shadow-red-900/20",
    text: "text-red-800 dark:text-red-200",
    iconColor: "text-red-600 dark:text-red-400",
    icon: <span className="text-xs">⚽</span>,
  },
  travel: {
    bg: "bg-gradient-to-r from-cyan-50 to-blue-100 border-cyan-300 shadow-cyan-100 dark:from-cyan-900/30 dark:to-blue-800/20 dark:border-cyan-600/50 dark:shadow-cyan-900/20",
    text: "text-cyan-800 dark:text-cyan-200",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    icon: <span className="text-xs">✈️</span>,
  },
  food: {
    bg: "bg-gradient-to-r from-orange-50 to-red-100 border-orange-300 shadow-orange-100 dark:from-orange-900/30 dark:to-red-800/20 dark:border-orange-600/50 dark:shadow-orange-900/20",
    text: "text-orange-800 dark:text-orange-200",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: <span className="text-xs">🍕</span>,
  },
  fashion: {
    bg: "bg-gradient-to-r from-purple-50 to-pink-100 border-purple-300 shadow-purple-100 dark:from-purple-900/30 dark:to-pink-800/20 dark:border-purple-600/50 dark:shadow-purple-900/20",
    text: "text-purple-800 dark:text-purple-200",
    iconColor: "text-purple-600 dark:text-purple-400",
    icon: <span className="text-xs">👗</span>,
  },
  gaming: {
    bg: "bg-gradient-to-r from-indigo-50 to-purple-100 border-indigo-300 shadow-indigo-100 dark:from-indigo-900/30 dark:to-purple-800/20 dark:border-indigo-600/50 dark:shadow-indigo-900/20",
    text: "text-indigo-800 dark:text-indigo-200",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    icon: <span className="text-xs">🎮</span>,
  },
  default: {
    bg: "bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 border-cyan-200 shadow-cyan-100 dark:from-cyan-900/40 dark:via-blue-900/40 dark:to-purple-900/40 dark:border-cyan-400/50 dark:shadow-cyan-900/30",
    text: "text-cyan-800 dark:text-cyan-100",
    iconColor: "text-cyan-600 dark:text-cyan-300",
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
};

export function BadgeCell({
  label,
  value,
  variant = "custom",
  icon,
  className,
  maxWidth = "max-w-[200px]",
}: BadgeCellProps) {
  const badgeVariant = BADGE_VARIANTS[variant] || BADGE_VARIANTS.custom;
  const displayIcon = icon || badgeVariant?.icon;
  const displayLabel = label || value || "";

  return (
    <div className="flex justify-start items-center">
      <div
        className={cn(
          "inline-flex items-center gap-1.5 shadow-sm hover:shadow-lg px-2.5 py-1.5 border rounded-full w-fit max-w-full font-bold text-xs hover:scale-105 transition-all hover:-translate-y-0.5 duration-300",
          badgeVariant.bg,
          badgeVariant.text,
          variant === "industry" &&
            "ring-1 ring-purple-200/50 dark:ring-purple-400/30 hover:ring-purple-300/70 dark:hover:ring-purple-300/50",
          variant === "default" &&
            "ring-2 ring-cyan-200/60 dark:ring-cyan-400/40 hover:ring-cyan-300/80 dark:hover:ring-cyan-300/60 shadow-lg hover:shadow-xl",
          className
        )}
      >
        {displayIcon && (
          <span
            className={cn(
              "flex-shrink-0 w-3.5 h-3.5 transition-all duration-300",
              badgeVariant.iconColor,
              variant === "industry" && "hover:scale-110 hover:rotate-3",
              variant === "default" &&
                "hover:scale-125 hover:rotate-12 animate-pulse"
            )}
          >
            {displayIcon}
          </span>
        )}
        <span
          className={cn("truncate tracking-wide", maxWidth)}
          title={displayLabel}
        >
          {displayLabel}
        </span>
      </div>
    </div>
  );
}
