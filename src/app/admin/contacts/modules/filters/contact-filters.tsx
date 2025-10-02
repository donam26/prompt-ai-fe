"use client";

import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseSelect } from "@/components/ui/base-select";
import { debounce } from "@/lib/utils";
import type { ContactFilterProps } from "@/types/admin/contact";
import {
  ContactFilterStatus,
  ContactFilterType,
} from "@/types/enums/contact-filter";
import { ContactActiveFilters } from "@/app/admin/contacts/modules/filters/contact-active-filters";

export const ContactFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: ContactFilterProps): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState(filters.searchTerm || "");

  const updateSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useLayoutEffect(() => {
    updateSearchValue(filters.searchTerm || "");
  }, [filters.searchTerm, updateSearchValue]);

  const debouncedSearchHandler = useMemo(
    () =>
      debounce((value: string) => {
        onFilterChange({
          ...filters,
          searchTerm: value,
        });
        onPageReset?.();
      }, 300),
    [filters, onFilterChange, onPageReset]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearchHandler(value);
    },
    [debouncedSearchHandler]
  );

  const handleStatusChange = (value: string): void => {
    onFilterChange({
      ...filters,
      status: value,
    });
    onPageReset?.();
  };

  const handleTypeChange = (value: string): void => {
    onFilterChange({
      ...filters,
      type: value,
    });
    onPageReset?.();
  };

  const handleDateRangeChange = (range: { from: string; to: string }): void => {
    onFilterChange({
      ...filters,
      dateFrom: range.from,
      dateTo: range.to,
    });
    onPageReset?.();
  };

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="space-y-4 bg-white p-4 border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900 text-lg">Bộ lọc</h3>
        </div>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label className="font-medium text-sm">Tìm kiếm</Label>
            <div className="relative">
              <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên, email, chủ đề..."
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status, Type and Date Filters */}
          <div className="gap-4 grid xl:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-medium text-sm">Trạng thái xử lý</Label>
              <StatusFilter
                value={filters.status}
                onChange={handleStatusChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium text-sm">Loại liên hệ</Label>
              <TypeFilter value={filters.type} onChange={handleTypeChange} />
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <Label className="font-medium text-sm">Khoảng thời gian</Label>
              <DateRangeFilter
                value={{ from: filters.dateFrom, to: filters.dateTo }}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <ContactActiveFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onClearAll={onClearFilters}
        onPageReset={onPageReset}
      />
    </div>
  );
};

/**
 * Status filter component
 */
const StatusFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const statusOptions = [
    { id: ContactFilterStatus.ALL, name: "Tất cả trạng thái" },
    { id: ContactFilterStatus.UNREPLIED, name: "Chưa trả lời" },
    { id: ContactFilterStatus.REPLIED, name: "Đã trả lời" },
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
 * Type filter component
 */
const TypeFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const typeOptions = [
    { id: ContactFilterType.ALL, name: "Tất cả loại" },
    { id: ContactFilterType.SUPPORT, name: "Hỗ trợ" },
    { id: ContactFilterType.REGISTRATION, name: "Đăng ký" },
    { id: ContactFilterType.OTHER, name: "Khác" },
  ];

  return (
    <BaseSelect
      items={typeOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn loại liên hệ..."
      className="w-full"
    />
  );
};

/**
 * Date range filter component
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
