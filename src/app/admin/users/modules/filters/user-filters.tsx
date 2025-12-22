"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import DatePicker from "react-multi-date-picker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseSelect } from "@/components/ui/base-select";
import { UserActiveFilters } from "./user-active-filters";
import { debounce } from "@/lib/utils";
import type { UserFilterProps, UserFilterState } from "@/types/admin/user";

export const UserFilter = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: UserFilterProps): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState(filters.searchTerm || "");

  const updateSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useLayoutEffect(() => {
    updateSearchValue(filters.searchTerm || "");
  }, [filters.searchTerm, updateSearchValue]);

  // Use useRef to persist debounced function across renders
  const debouncedSearchHandlerRef = useRef(
    debounce((value: string) => {
      onFilterChange({
        ...filters,
        searchTerm: value,
      });
      onPageReset?.();
    }, 300)
  );

  // Update the debounced function when filters, onFilterChange, or onPageReset change
  useLayoutEffect(() => {
    debouncedSearchHandlerRef.current = debounce((value: string) => {
      onFilterChange({
        ...filters,
        searchTerm: value,
      });
      onPageReset?.();
    }, 300);
  }, [filters, onFilterChange, onPageReset]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearchHandlerRef.current(value);
    },
    []
  );

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

  const handleDateFromChange = (dateFrom: string): void => {
    onFilterChange({
      ...filters,
      dateFrom,
    });
    onPageReset?.();
  };

  const handleDateToChange = (dateTo: string): void => {
    onFilterChange({
      ...filters,
      dateTo,
    });
    onPageReset?.();
  };

  const getActiveFilters = () => {
    const activeFilters = [];

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

    if (filters.dateFrom || filters.dateTo) {
      const fromDate = filters.dateFrom
        ? new Date(filters.dateFrom).toLocaleDateString("vi-VN")
        : "Từ đầu";
      const toDate = filters.dateTo
        ? new Date(filters.dateTo).toLocaleDateString("vi-VN")
        : "Hiện tại";
      activeFilters.push({
        key: "dateRange",
        label: "Khoảng thời gian",
        value: `${fromDate} - ${toDate}`,
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <UserFilterCard
        filters={filters}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
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

const UserFilterCard = ({
  filters,
  searchValue,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
  hasActiveFilters,
}: {
  filters: UserFilterState;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateFromChange: (dateFrom: string) => void;
  onDateToChange: (dateTo: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}): React.JSX.Element => (
  <div className="space-y-4 bg-white p-4 border border-gray-200 rounded-lg w-full min-w-0">
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

    <div className="space-y-4 w-full min-w-0">
      {/* Search Input */}
      <div className="space-y-2">
        <Label className="font-medium text-sm">Tìm kiếm</Label>
        <div className="relative">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên, email..."
            value={searchValue}
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
      <div className="space-y-2 w-full min-w-0">
        <Label className="font-medium text-sm">Khoảng thời gian</Label>
        <DateRangeFilter
          dateFrom={filters.dateFrom}
          dateTo={filters.dateTo}
          onDateFromChange={onDateFromChange}
          onDateToChange={onDateToChange}
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
    { id: "all", name: "Tất cả vai trò" },
    { id: "admin", name: "Quản trị viên" },
    { id: "user", name: "Người dùng" },
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
    { id: "all", name: "Tất cả trạng thái" },
    { id: "active", name: "Hoạt động" },
    { id: "inactive", name: "Không hoạt động" },
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
  dateFrom = "",
  dateTo = "",
  onDateFromChange = () => {},
  onDateToChange = () => {},
}: {
  dateFrom?: string;
  dateTo?: string;
  onDateFromChange?: (value: string) => void;
  onDateToChange?: (value: string) => void;
}): React.JSX.Element => {
  const fromPickerRef = React.useRef<any>(null);
  const toPickerRef = React.useRef<any>(null);
  const isFromOpeningRef = React.useRef(false);
  const isToOpeningRef = React.useRef(false);

  const handleFromOpen = (): void => {
    isFromOpeningRef.current = true;
  };

  const handleFromClose = (): void => {
    isFromOpeningRef.current = false;
  };

  const handleFromChange = (date: any): void => {
    if (isFromOpeningRef.current) {
      isFromOpeningRef.current = false;
      return;
    }
    if (date) {
      const formattedDate = date.toDate().toISOString().split("T")[0];
      if (formattedDate !== dateFrom) {
        onDateFromChange(formattedDate);
      }
    } else if (dateFrom) {
      onDateFromChange("");
    }
  };

  const handleToOpen = (): void => {
    isToOpeningRef.current = true;
  };

  const handleToClose = (): void => {
    isToOpeningRef.current = false;
  };

  const handleToChange = (date: any): void => {
    if (isToOpeningRef.current) {
      isToOpeningRef.current = false;
      return;
    }
    if (date) {
      const formattedDate = date.toDate().toISOString().split("T")[0];
      if (formattedDate !== dateTo) {
        onDateToChange(formattedDate);
      }
    } else if (dateTo) {
      onDateToChange("");
    }
  };

  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 min-w-0">
      <div className="w-full min-w-0">
        <DatePicker
          ref={fromPickerRef}
          value={dateFrom ? new Date(dateFrom) : null}
          onChange={handleFromChange}
          onOpen={handleFromOpen}
          onClose={handleFromClose}
          format="DD/MM/YYYY"
          placeholder="Từ ngày"
          className="w-full min-w-0"
          inputClass="w-full min-w-0 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          containerStyle={{ width: "100%", minWidth: 0 }}
          editable={false}
          calendarPosition="bottom-left"
        />
      </div>
      <div className="w-full min-w-0">
        <DatePicker
          ref={toPickerRef}
          value={dateTo ? new Date(dateTo) : null}
          onChange={handleToChange}
          onOpen={handleToOpen}
          onClose={handleToClose}
          format="DD/MM/YYYY"
          placeholder="Đến ngày"
          className="w-full min-w-0"
          inputClass="w-full min-w-0 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          containerStyle={{ width: "100%", minWidth: 0 }}
          editable={false}
          calendarPosition="bottom-left"
        />
      </div>
    </div>
  );
};
