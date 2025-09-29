"use client";

import { BadgeCell, BadgeCellProps } from "./badge-cell";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BADGE_CONSTANTS } from "@/constants/badges";

export interface BadgeListItem {
  id: string | number;
  label: string;
  variant?: BadgeCellProps["variant"];
  icon?: React.ReactNode;
}

interface BadgeListProps {
  items: BadgeListItem[];
  maxVisible?: number;
  className?: string;
  emptyMessage?: string;
  emptyClassName?: string;
  badgeClassName?: string;
  renderOverflowBadge?: (overflowCount: number) => React.ReactNode;
  renderOverflowTooltip?: (overflowItems: BadgeListItem[]) => React.ReactNode;
}

export function BadgeList({
  items,
  maxVisible = BADGE_CONSTANTS.LIST_CONFIG.DEFAULT_MAX_VISIBLE,
  className,
  emptyMessage = BADGE_CONSTANTS.LIST_CONFIG.EMPTY_MESSAGE,
  emptyClassName,
  badgeClassName,
  renderOverflowBadge,
  renderOverflowTooltip,
}: BadgeListProps) {
  if (!items?.length) {
    return (
      <div
        className={cn(
          "text-gray-400 dark:text-gray-500 text-sm",
          emptyClassName
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  if (items.length === 1) {
    const single = items[0]!;
    return (
      <div className={className}>
        <BadgeCell
          label={single.label}
          variant={single.variant}
          icon={single.icon}
          className={badgeClassName}
        />
      </div>
    );
  }

  const visibleItems = items.slice(0, maxVisible);
  const overflowItems = items.slice(maxVisible);
  const hasOverflow = overflowItems.length > 0;

  return (
    <div className={cn("flex flex-wrap gap-1.5 w-full", className)}>
      {visibleItems.map(item => (
        <BadgeCell
          key={item.id}
          label={item.label}
          variant={item.variant}
          icon={item.icon}
          className={badgeClassName}
        />
      ))}

      {hasOverflow && (
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            {renderOverflowBadge ? (
              renderOverflowBadge(overflowItems.length)
            ) : (
              <Badge
                variant="outline"
                className="hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 text-xs cursor-help"
              >
                +{overflowItems.length}
              </Badge>
            )}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {renderOverflowTooltip ? (
              renderOverflowTooltip(overflowItems)
            ) : (
              <div className="space-y-1">
                {overflowItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 text-sm"
                  >
                    {item.icon && (
                      <span className="flex-shrink-0 w-3 h-3">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
