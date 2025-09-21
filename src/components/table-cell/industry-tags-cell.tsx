"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Industry } from "@/lib/types";

export interface IndustryTagsCellProps {
  industries?: Industry[];
  maxVisible?: number;
  className?: string;
}

const INDUSTRY_COLORS = [
  {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: "🏢",
  },
  {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: "🎓",
  },
  {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    icon: "💼",
  },
  {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    icon: "🍽️",
  },
  {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
    icon: "💻",
  },
  {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    icon: "🏦",
  },
];

const IndustryTag = ({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) => {
  const colorScheme = INDUSTRY_COLORS[index % INDUSTRY_COLORS.length];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 shadow-sm hover:shadow-md px-3 py-1.5 border rounded-full font-medium text-xs transition-shadow",
        colorScheme.bg,
        colorScheme.text,
        colorScheme.border
      )}
    >
      <span className="text-xs">{colorScheme.icon}</span>
      <span className="max-w-[80px] truncate" title={industry.name}>
        {industry.name}
      </span>
    </span>
  );
};

export function IndustryTagsCell({
  industries = [],
  maxVisible = 3,
  className,
}: IndustryTagsCellProps) {
  if (!industries || industries.length === 0) {
    return null;
  }

  const visibleIndustries = industries.slice(0, maxVisible);
  const remainingIndustries = industries.slice(maxVisible);

  return (
    <TooltipProvider>
      <div className={cn("flex flex-wrap gap-1.5 mt-1", className)}>
        {visibleIndustries.map((industry: Industry, index: number) => (
          <IndustryTag key={industry.id} industry={industry} index={index} />
        ))}
        {remainingIndustries.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center bg-gray-100 shadow-sm hover:shadow-md px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-600 text-xs transition-shadow cursor-help">
                +{remainingIndustries.length}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium text-sm">Các ngành khác:</p>
                <div className="flex flex-wrap gap-1">
                  {remainingIndustries.map((industry: Industry) => (
                    <span
                      key={industry.id}
                      className="inline-flex items-center bg-gray-100 px-2 py-1 border border-gray-200 rounded text-gray-600 text-xs"
                    >
                      {industry.name}
                    </span>
                  ))}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
