"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterItem {
  key: string;
  label: string;
  value: string;
}

interface ExpiringSubscriptionsActiveFiltersProps {
  filters: FilterItem[];
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export const ExpiringSubscriptionsActiveFilters = ({
  filters,
  onRemoveFilter,
  onClearAll,
}: ExpiringSubscriptionsActiveFiltersProps): React.JSX.Element => {
  if (filters.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <span className="font-medium text-gray-700 text-sm">
        Bộ lọc đang áp dụng:
      </span>
      {filters.map(filter => (
        <div
          key={filter.key}
          className="flex items-center gap-1 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 border border-primary-200 dark:border-primary-700 rounded-md"
        >
          <span className="text-primary-700 dark:text-primary-300 text-sm">
            <span className="font-medium">{filter.label}:</span> {filter.value}
          </span>
          <button
            type="button"
            onClick={() => onRemoveFilter(filter.key)}
            className="ml-1 text-primary-600 hover:text-primary-800 dark:hover:text-primary-200 dark:text-primary-400"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-7 text-xs"
      >
        Xóa tất cả
      </Button>
    </div>
  );
};
