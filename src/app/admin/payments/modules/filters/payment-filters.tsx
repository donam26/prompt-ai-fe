"use client";

import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseSelect } from "@/components/ui/base-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { debounce } from "@/lib/utils";
import type { PaymentFilterProps } from "@/types/admin";
import { PaymentStatus } from "@/constants/payment-status";
import { PaymentActiveFilters } from "./payment-active-filters";
import { useSubscriptions } from "@/hooks/admin/useSubscription";

/**
 * Payment filter component with search, status, method, and date range filters
 *
 * @param props - The component props
 * @returns The payment filter JSX
 */
export const PaymentFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: PaymentFilterProps): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState(filters.searchTerm || "");

  // Fetch subscriptions data for filter
  const { subscriptions } = useSubscriptions({});

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

  const handleDateRangeChange = (range: { from: string; to: string }): void => {
    onFilterChange({
      ...filters,
      dateRange: range,
    });
    onPageReset?.();
  };

  const handleSubscriptionChange = (values: string[]): void => {
    onFilterChange({
      ...filters,
      subscriptionIds: values,
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
                placeholder="Tìm kiếm theo mã GD, người dùng..."
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status, Subscription and Date Filters */}
          <div className="gap-4 grid xl:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-medium text-sm">Trạng thái</Label>
              <StatusFilter
                value={filters.status}
                onChange={handleStatusChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium text-sm">Gói đăng ký</Label>
              <SubscriptionFilter
                values={filters.subscriptionIds || []}
                onChange={handleSubscriptionChange}
                subscriptions={subscriptions}
              />
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <Label className="font-medium text-sm">Khoảng thời gian</Label>
              <DateRangeFilter
                value={filters.dateRange}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <PaymentActiveFilters
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
    { id: "all", name: "Tất cả trạng thái" },
    { id: PaymentStatus.SUCCESS, name: "Thành công" },
    { id: PaymentStatus.PENDING, name: "Đang xử lý" },
    { id: PaymentStatus.FAILED, name: "Thất bại" },
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
 * Subscription filter component with multiple selection
 */
const SubscriptionFilter = ({
  values,
  onChange,
  subscriptions,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  subscriptions: any[];
}): React.JSX.Element => {
  const subscriptionItems = subscriptions.map(sub => ({
    id: sub.id.toString(),
    name: sub.name,
  }));

  return (
    <MultiSelect
      options={subscriptionItems.map(item => ({
        value: item.id,
        label: item.name,
      }))}
      value={values}
      onValueChange={onChange}
      placeholder="Chọn gói đăng ký..."
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
