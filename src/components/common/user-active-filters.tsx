"use client";

import React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type {
  UserActiveFiltersProps,
  UserActiveFilterItem,
} from "@/types/admin";

/**
 * User active filters component
 *
 * @param props - The component props
 * @returns The user active filters JSX
 */
export const UserActiveFilters = ({
  filters,
  onFilterChange,
  onClearAll,
  onPageReset,
}: UserActiveFiltersProps): React.JSX.Element => {
  const activeFilters = getActiveFilters(filters);

  const removeItemFromFilter = (key: keyof typeof filters): void => {
    switch (key) {
      case "searchTerm":
        onFilterChange({ ...filters, searchTerm: "" });
        break;
      case "role":
        onFilterChange({ ...filters, role: "all" });
        break;
      case "status":
        onFilterChange({ ...filters, status: "all" });
        break;
      case "dateRange":
        onFilterChange({
          ...filters,
          dateRange: { from: "", to: "" },
        });
        break;
    }
    onPageReset?.();
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 text-sm">
          Bộ lọc đang áp dụng ({activeFilters.length})
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-gray-500 hover:text-gray-700"
        >
          Xóa tất cả
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map(filter => (
          <UserFilterBadge
            key={filter.key}
            label={`${filter.label}: ${filter.value}`}
            onRemove={() => removeItemFromFilter(filter.key)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * User filter badge component
 *
 * @param props - The component props
 * @returns The user filter badge JSX
 */
const UserFilterBadge = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}): React.JSX.Element => (
  <Badge
    variant="secondary"
    className="flex items-center gap-1 px-2 py-1 text-xs"
  >
    {label}
    <button
      type="button"
      onClick={onRemove}
      className="hover:bg-gray-200 ml-1 p-0.5 rounded-full"
    >
      <X className="w-3 h-3" />
    </button>
  </Badge>
);

/**
 * Get active filters from filter state
 *
 * @param filters - The filter state
 * @returns Array of active filter items
 */
const getActiveFilters = (filters: any): UserActiveFilterItem[] => {
  const activeFilters: UserActiveFilterItem[] = [];

  if (filters.searchTerm) {
    activeFilters.push({
      key: "searchTerm",
      label: "Tìm kiếm",
      value: filters.searchTerm,
    });
  }

  if (filters.role !== "all") {
    const roleLabels: Record<string, string> = {
      admin: "Quản trị viên",
      user: "Người dùng",
      moderator: "Điều hành viên",
    };
    activeFilters.push({
      key: "role",
      label: "Vai trò",
      value: roleLabels[filters.role] || filters.role,
    });
  }

  if (filters.status !== "all") {
    const statusLabels: Record<string, string> = {
      active: "Hoạt động",
      inactive: "Không hoạt động",
      suspended: "Bị đình chỉ",
    };
    activeFilters.push({
      key: "status",
      label: "Trạng thái",
      value: statusLabels[filters.status] || filters.status,
    });
  }

  if (filters.dateRange.from || filters.dateRange.to) {
    const fromDate = filters.dateRange.from
      ? new Date(filters.dateRange.from).toLocaleDateString("vi-VN")
      : "Từ đầu";
    const toDate = filters.dateRange.to
      ? new Date(filters.dateRange.to).toLocaleDateString("vi-VN")
      : "Hiện tại";
    activeFilters.push({
      key: "dateRange",
      label: "Khoảng thời gian",
      value: `${fromDate} - ${toDate}`,
    });
  }

  return activeFilters;
};
