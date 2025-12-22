"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import DatePicker from "react-multi-date-picker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseSelect } from "@/components/ui/base-select";
import { debounce } from "@/lib/utils";
import type { FeedbackFilterProps } from "@/types/admin/feedback";
import { FeedbackFilterStatus } from "@/types/enums/feedback-filter";
import { FeedbackActiveFilters } from "@/app/admin/feedbacks/modules/filters/feedback-active-filters";

export const FeedbackFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: FeedbackFilterProps): React.JSX.Element => {
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
                placeholder="Tìm kiếm theo tên, email, nội dung..."
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status and Date Filters */}
          <div className="gap-4 grid xl:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-medium text-sm">Trạng thái xử lý</Label>
              <StatusFilter
                value={filters.status}
                onChange={handleStatusChange}
              />
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

      <FeedbackActiveFilters
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
    { id: FeedbackFilterStatus.ALL, name: "Tất cả trạng thái" },
    { id: FeedbackFilterStatus.PENDING, name: "Chưa xử lý" },
    { id: FeedbackFilterStatus.PROCESSED, name: "Đã xử lý" },
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
 */
const DateRangeFilter = ({
  value = { from: "", to: "" },
  onChange,
}: {
  value?: { from: string; to: string };
  onChange: (range: { from: string; to: string }) => void;
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
      if (formattedDate !== value.from) {
        onChange({ ...value, from: formattedDate });
      }
    } else if (value.from) {
      onChange({ ...value, from: "" });
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
      if (formattedDate !== value.to) {
        onChange({ ...value, to: formattedDate });
      }
    } else if (value.to) {
      onChange({ ...value, to: "" });
    }
  };

  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 min-w-0">
      <div className="w-full min-w-0">
        <DatePicker
          ref={fromPickerRef}
          value={value.from ? new Date(value.from) : null}
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
          value={value.to ? new Date(value.to) : null}
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
