"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CouponFilterState } from "@/types/admin/coupon";
import { COUPON_CONSTANTS } from "@/constants/coupon";

interface CouponActiveFiltersProps {
  filters: CouponFilterState;
  onRemoveFilter: (key: keyof CouponFilterState) => void;
  onClearAll: () => void;
}

export const CouponActiveFilters = ({
  filters,
  onRemoveFilter,
  onClearAll,
}: CouponActiveFiltersProps) => {
  const activeFilters = [
    {
      key: "searchTerm" as const,
      label: "Tìm kiếm",
      value: filters.searchTerm,
      displayValue: filters.searchTerm,
    },
    {
      key: "type" as const,
      label: "Loại",
      value: filters.type,
      displayValue: filters.type
        ? COUPON_CONSTANTS.TYPE_LABELS[
            filters.type as keyof typeof COUPON_CONSTANTS.TYPE_LABELS
          ]
        : undefined,
    },
    {
      key: "status" as const,
      label: "Trạng thái",
      value: filters.status,
      displayValue: filters.status
        ? COUPON_CONSTANTS.STATUS_LABELS[
            filters.status as keyof typeof COUPON_CONSTANTS.STATUS_LABELS
          ]
        : undefined,
    },
    {
      key: "dateFrom" as const,
      label: "Từ ngày",
      value: filters.dateFrom,
      displayValue: filters.dateFrom
        ? new Date(filters.dateFrom).toLocaleDateString("vi-VN")
        : undefined,
    },
    {
      key: "dateTo" as const,
      label: "Đến ngày",
      value: filters.dateTo,
      displayValue: filters.dateTo
        ? new Date(filters.dateTo).toLocaleDateString("vi-VN")
        : undefined,
    },
  ].filter(filter => filter.value);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-gray-600 text-sm">Bộ lọc đang áp dụng:</span>

      {activeFilters.map(filter => (
        <Badge
          key={filter.key}
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          <span className="text-xs">
            {filter.label}: {filter.displayValue}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveFilter(filter.key)}
            className="hover:bg-transparent ml-1 p-0 h-auto"
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="py-1 h-auto text-gray-500 hover:text-gray-700 text-xs"
      >
        Xóa tất cả
      </Button>
    </div>
  );
};
