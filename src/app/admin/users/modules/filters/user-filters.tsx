"use client";

import React from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseSelect } from "@/components/ui/base-select";
import { UserActiveFilters } from "@/components/common";
import type {
  UserFilterProps,
  UserFilterState,
  UserActiveFilterItem,
} from "@/types/admin";

/**
 * User filter component with search, role, status, and date range filters
 *
 * @param props - The component props
 * @returns The user filter JSX
 */
export const UserFilter = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: UserFilterProps): React.JSX.Element => {
  const handleSearchChange = (value: string): void => {
    onFilterChange({
      ...filters,
      searchTerm: value,
    });
    onPageReset?.();
  };

  const handleRoleChange = (value: string): void => {
    onFilterChange({
      ...filters,
      role: value,
    });
    onPageReset?.();
  };

  const handleStatusChange = (value: string): void => {
    onFilterChange({
      ...filters,
      status: value,
    });
    onPageReset?.();
  };

  const handleDateRangeChange = (range: { from: string; to: string }): void => {
    onFilterChange({
      ...filters,
      dateRange: range,
    });
    onPageReset?.();
  };

  const getActiveFilters = (): UserActiveFilterItem[] => {
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

  const removeItemFromFilter = (key: keyof UserFilterState): void => {
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

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <UserFilterCard
        filters={filters}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {hasActiveFilters && (
        <UserActiveFilters
          filters={filters}
          onFilterChange={onFilterChange}
          onClearAll={onClearFilters}
          onPageReset={onPageReset}
        />
      )}
    </div>
  );
};

/**
 * User filter card component
 *
 * @param props - The component props
 * @returns The user filter card JSX
 */
const UserFilterCard = ({
  filters,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onDateRangeChange,
  onClearFilters,
  hasActiveFilters,
}: {
  filters: UserFilterState;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateRangeChange: (range: { from: string; to: string }) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}): React.JSX.Element => (
  <div className="space-y-4 bg-white p-4 border border-gray-200 rounded-lg">
    <div className="flex justify-between items-center">
      <h3 className="font-medium text-gray-900 text-lg">Bộ lọc</h3>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="mr-1 w-4 h-4" />
          Xóa tất cả
        </Button>
      )}
    </div>

    <div className="space-y-4">
      {/* Search Input */}
      <div className="space-y-2">
        <Label className="font-medium text-sm">Tìm kiếm</Label>
        <div className="relative">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên, email..."
            value={filters.searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Role and Status Filters */}
      <div className="gap-4 grid xl:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Vai trò</Label>
          <RoleFilter value={filters.role} onChange={onRoleChange} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Trạng thái</Label>
          <StatusFilter value={filters.status} onChange={onStatusChange} />
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-2">
        <Label className="font-medium text-sm">Khoảng thời gian</Label>
        <DateRangeFilter
          value={filters.dateRange}
          onChange={onDateRangeChange}
        />
      </div>
    </div>
  </div>
);

/**
 * Role filter component
 *
 * @param props - The component props
 * @returns The role filter JSX
 */
const RoleFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const roleOptions = [
    { value: "all", label: "Tất cả vai trò" },
    { value: "admin", label: "Quản trị viên" },
    { value: "user", label: "Người dùng" },
    { value: "moderator", label: "Điều hành viên" },
  ];

  return (
    <BaseSelect
      items={roleOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn vai trò..."
      className="w-full"
    />
  );
};

/**
 * Status filter component
 *
 * @param props - The component props
 * @returns The status filter JSX
 */
const StatusFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Không hoạt động" },
    { value: "suspended", label: "Bị đình chỉ" },
  ];

  return (
    <BaseSelect
      items={statusOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn trạng thái..."
      className="w-full"
    />
  );
};

/**
 * Date range filter component
 *
 * @param props - The component props
 * @returns The date range filter JSX
 */
const DateRangeFilter = ({
  value,
  onChange,
}: {
  value: { from: string; to: string };
  onChange: (range: { from: string; to: string }) => void;
}): React.JSX.Element => (
  <div className="gap-2 grid grid-cols-2">
    <div>
      <Input
        type="date"
        value={value.from}
        onChange={e => onChange({ ...value, from: e.target.value })}
        placeholder="Từ ngày"
        className="w-full"
      />
    </div>
    <div>
      <Input
        type="date"
        value={value.to}
        onChange={e => onChange({ ...value, to: e.target.value })}
        placeholder="Đến ngày"
        className="w-full"
      />
    </div>
  </div>
);
