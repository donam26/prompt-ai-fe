"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import DatePicker from "react-multi-date-picker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BlogActiveFilters } from "./blog-active-filters";
import { debounce } from "@/lib/utils";
import type { BlogFilterState } from "@/types/admin/blog";
import { BaseFilterProps } from "@/types/base";

export const BlogFilter = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: BaseFilterProps<BlogFilterState>): React.JSX.Element => {
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
    }, 300)
  );

  // Update the debounced function when filters or onFilterChange change
  useLayoutEffect(() => {
    debouncedSearchHandlerRef.current = debounce((value: string) => {
      onFilterChange({
        ...filters,
        searchTerm: value,
      });
    }, 300);
  }, [filters, onFilterChange]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearchHandlerRef.current(value);
    },
    []
  );

  const handleDateFromChange = (value: string): void => {
    onFilterChange({
      ...filters,
      dateFrom: value,
    });
  };

  const handleDateToChange = (value: string): void => {
    onFilterChange({
      ...filters,
      dateTo: value,
    });
  };

  const hasActiveFilters =
    filters.searchTerm || filters.dateFrom || filters.dateTo;

  return (
    <div className={`space-y-4 ${className || ""}`}>
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
                placeholder="Tìm kiếm theo tên blog..."
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2">
            <Label className="font-medium text-sm">Khoảng thời gian</Label>
            <DateRangeFilter
              dateFrom={filters.dateFrom}
              dateTo={filters.dateTo}
              onDateFromChange={handleDateFromChange}
              onDateToChange={handleDateToChange}
            />
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <BlogActiveFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onClearAll={onClearFilters}
        onPageReset={onPageReset}
      />
    </div>
  );
};

/**
 * Date range filter component
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
