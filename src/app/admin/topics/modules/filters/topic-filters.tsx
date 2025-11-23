"use client";

import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Search, X, Filter } from "lucide-react";
import DatePicker from "react-multi-date-picker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { debounce } from "@/lib/utils";
import type { TopicFilterState } from "@/types/admin/topic";
import type { BaseFilterProps } from "@/types/base";

export const TopicFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: BaseFilterProps<TopicFilterState>): React.JSX.Element => {
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
      }, 300),
    [filters, onFilterChange]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearchHandler(value);
    },
    [debouncedSearchHandler]
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
                placeholder="Tìm kiếm theo tên topic..."
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
      <TopicActiveFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onClearAll={onClearFilters}
        onPageReset={onPageReset}
      />
    </div>
  );
};

/**
 * Active filters component
 */
const TopicActiveFilters = ({
  filters,
  onFilterChange,
  onClearAll,
  onPageReset,
}: {
  filters: TopicFilterState;
  onFilterChange: (filters: TopicFilterState) => void;
  onClearAll: () => void;
  onPageReset?: () => void;
}): React.JSX.Element => {
  if (!filters) {
    return <></>;
  }

  // Helper to remove a single filter
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };

    switch (key) {
      case "searchTerm":
        newFilters.searchTerm = "";
        break;
      case "dateFrom":
        newFilters.dateFrom = "";
        break;
      case "dateTo":
        newFilters.dateTo = "";
        break;
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  // Calculate active filter count
  const activeTotal = [
    filters.searchTerm && filters.searchTerm !== "",
    filters.dateFrom || filters.dateTo,
  ].filter(Boolean).length;

  if (activeTotal === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-700 text-sm">
          Bộ lọc đang hoạt động:
        </span>
      </div>

      {/* Search filter */}
      {filters.searchTerm && filters.searchTerm !== "" && (
        <Badge key="search" variant="secondary" className="gap-1">
          <span className="text-xs">Tìm kiếm: {filters.searchTerm}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("searchTerm")}
          />
        </Badge>
      )}

      {/* Date From filter */}
      {filters.dateFrom && (
        <Badge key="dateFrom" variant="secondary" className="gap-1">
          <span className="text-xs">Từ: {filters.dateFrom}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("dateFrom")}
          />
        </Badge>
      )}

      {/* Date To filter */}
      {filters.dateTo && (
        <Badge key="dateTo" variant="secondary" className="gap-1">
          <span className="text-xs">Đến: {filters.dateTo}</span>
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveFilter("dateTo")}
          />
        </Badge>
      )}

      {/* Clear all button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          onClearAll();
          onPageReset?.();
        }}
        className="hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded-full text-xs"
      >
        Xóa tất cả ({activeTotal})
      </Button>
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
