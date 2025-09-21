"use client";

import React from "react";
import { X } from "lucide-react";

import type { FilterBadgeProps } from "@/types/admin";

/**
 * FilterBadge component for displaying individual filter badges
 * Reusable component for showing active filters with remove functionality
 *
 * @param props - The component props
 * @returns The filter badge JSX
 */
export const FilterBadge = ({
  label,
  onRemove,
}: FilterBadgeProps): React.JSX.Element => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary/80 px-2 py-1 border border-gray-200 rounded-full font-medium text-secondary-foreground text-xs transition-colors">
      <span>{label}</span>
      <button
        type="button"
        onClick={handleRemoveClick}
        className="inline-flex justify-center items-center hover:bg-red-100 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 w-3 h-3 hover:text-red-600 transition-colors"
        aria-label="Remove filter"
      >
        <X className="w-2 h-2" />
      </button>
    </div>
  );
};
