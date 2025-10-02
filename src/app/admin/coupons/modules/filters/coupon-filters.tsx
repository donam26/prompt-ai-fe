"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CouponFilterProps } from "@/types/admin/coupon";
import { COUPON_CONSTANTS } from "@/constants/coupon";
import { CouponActiveFilters } from "./coupon-active-filters";

export const CouponFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className = "",
}: CouponFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, searchTerm: value });
    onPageReset?.();
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({ ...filters, type: value === "all" ? "" : value });
    onPageReset?.();
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value === "all" ? "" : value });
    onPageReset?.();
  };

  const handleDateFromChange = (date: string) => {
    onFilterChange({ ...filters, dateFrom: date });
    onPageReset?.();
  };

  const handleDateToChange = (date: string) => {
    onFilterChange({ ...filters, dateTo: date });
    onPageReset?.();
  };

  const handleClearFilters = () => {
    onClearFilters();
    onPageReset?.();
  };

  const handleRemoveFilter = (filterKey: keyof typeof filters) => {
    onFilterChange({ ...filters, [filterKey]: "" });
    onPageReset?.();
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.type ||
    filters.status ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
          <Input
            placeholder="Tìm kiếm theo mã, tên mã giảm giá..."
            value={filters.searchTerm || ""}
            onChange={e => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Bộ lọc
          {hasActiveFilters && (
            <span className="bg-blue-100 ml-1 px-1.5 py-0.5 rounded-full text-blue-800 text-xs">
              {
                [
                  filters.searchTerm,
                  filters.type,
                  filters.status,
                  filters.dateFrom,
                  filters.dateTo,
                ].filter(Boolean).length
              }
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-50 p-4 rounded-lg">
          {/* Type Filter */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 text-sm">
              Loại mã giảm giá
            </label>
            <Select
              value={filters.type || "all"}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value={COUPON_CONSTANTS.TYPES.PERCENT}>
                  {COUPON_CONSTANTS.TYPE_LABELS.percent}
                </SelectItem>
                <SelectItem value={COUPON_CONSTANTS.TYPES.FIXED}>
                  {COUPON_CONSTANTS.TYPE_LABELS.fixed}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 text-sm">
              Trạng thái
            </label>
            <Select
              value={filters.status || "all"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value={COUPON_CONSTANTS.STATUSES.ACTIVE}>
                  {COUPON_CONSTANTS.STATUS_LABELS.active}
                </SelectItem>
                <SelectItem value={COUPON_CONSTANTS.STATUSES.INACTIVE}>
                  {COUPON_CONSTANTS.STATUS_LABELS.inactive}
                </SelectItem>
                <SelectItem value={COUPON_CONSTANTS.STATUSES.EXPIRED}>
                  {COUPON_CONSTANTS.STATUS_LABELS.expired}
                </SelectItem>
                <SelectItem value={COUPON_CONSTANTS.STATUSES.USED_UP}>
                  {COUPON_CONSTANTS.STATUS_LABELS.used_up}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <CouponActiveFilters
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearFilters}
      />
    </div>
  );
};
