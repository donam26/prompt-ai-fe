"use client";

import React from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseSelect } from "@/components/ui/base-select";
import type { BlogFilterProps, BlogFilterState } from "@/types/admin";

/**
 * Blog filter component with search, status, category, and date range filters
 *
 * @param props - The component props
 * @returns The blog filter JSX
 */
export const BlogFilter = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: BlogFilterProps): React.JSX.Element => {
  const handleSearchChange = (value: string): void => {
    onFilterChange({
      ...filters,
      searchTerm: value,
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

  const handleCategoryChange = (value: string): void => {
    onFilterChange({
      ...filters,
      category: value,
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

  const hasActiveFilters =
    filters.searchTerm ||
    filters.status !== "all" ||
    filters.category !== "all" ||
    filters.dateRange.from ||
    filters.dateRange.to;

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
                placeholder="Tìm kiếm theo tiêu đề, nội dung..."
                value={filters.searchTerm}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status and Category Filters */}
          <div className="gap-4 grid xl:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-medium text-sm">Trạng thái</Label>
              <StatusFilter
                value={filters.status}
                onChange={handleStatusChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium text-sm">Danh mục</Label>
              <CategoryFilter
                value={filters.category}
                onChange={handleCategoryChange}
              />
            </div>
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
    { value: "all", label: "Tất cả trạng thái" },
    { value: "published", label: "Đã xuất bản" },
    { value: "draft", label: "Bản nháp" },
    { value: "archived", label: "Đã lưu trữ" },
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
 * Category filter component
 */
const CategoryFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const categoryOptions = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "technology", label: "Công nghệ" },
    { value: "business", label: "Kinh doanh" },
    { value: "lifestyle", label: "Lối sống" },
    { value: "education", label: "Giáo dục" },
  ];

  return (
    <BaseSelect
      items={categoryOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn danh mục..."
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
