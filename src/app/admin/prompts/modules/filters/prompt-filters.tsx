"use client";

import React from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseSelect } from "@/components/ui/base-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { PromptActiveFilters } from "./prompt-active-filters";
import type {
  PromptFilterProps,
  IPromptFilterProps,
} from "@/types/admin/prompt";
import { Category } from "@/lib/types";

/**
 * Prompt filter component with search, category, status, premium, and tags filters
 *
 * @param props - The component props
 * @returns The prompt filter JSX
 */
export const PromptFilter = ({
  filters,
  categories,
  industries,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: PromptFilterProps): React.JSX.Element => {
  const handleSearchChange = (value: string): void => {
    onFilterChange({
      ...filters,
      searchTerm: value,
    });
    onPageReset?.();
  };

  const handlePremiumChange = (value: string): void => {
    onFilterChange({
      ...filters,
      isType: parseInt(value),
    });
    onPageReset?.();
  };

  const handleIndustriesChange = (values: string[]): void => {
    onFilterChange({
      ...filters,
      industryIds: values,
    });
    onPageReset?.();
  };

  const handleCategoriesChange = (values: string[]): void => {
    onFilterChange({
      ...filters,
      categoryIds: values,
    });
    onPageReset?.();
  };

  const handleDateFromChange = (value: string): void => {
    onFilterChange({
      ...filters,
      dateFrom: value,
    });
    onPageReset?.();
  };

  const handleDateToChange = (value: string): void => {
    onFilterChange({
      ...filters,
      dateTo: value,
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

    if (filters.categoryIds.length > 0) {
      const category = categories.find(
        cat => cat.id.toString() === filters.categoryIds[0]
      );
      activeFilters.push({
        key: "categoryId",
        label: "Danh mục",
        value: category?.name || filters.categoryIds.join(", "),
      });
    }

    if (filters.categoryIds.length > 0) {
      const categoryNames = filters.categoryIds
        .map(id => categories.find(cat => cat.id.toString() === id)?.name)
        .filter(Boolean);
      activeFilters.push({
        key: "categoryIds",
        label: "Danh mục",
        value: categoryNames.join(", "),
      });
    }

    if (filters.isType !== undefined) {
      const premiumLabels: Record<string, string> = {
        premium: "Premium",
        free: "Miễn phí",
      };
      activeFilters.push({
        key: "isPremium",
        label: "Loại",
        value: premiumLabels[filters.isType] || filters.isType,
      });
    }

    if (filters.industryIds.length > 0) {
      const industryNames = filters.industryIds
        .map(id => industries.find(ind => ind.id.toString() === id)?.name)
        .filter(Boolean);
      activeFilters.push({
        key: "industryIds",
        label: "Ngành nghề",
        value: industryNames.join(", "),
      });
    }

    if (filters.dateFrom || filters.dateTo) {
      const fromDate = filters.dateFrom
        ? new Date(filters.dateFrom).toLocaleDateString("vi-VN")
        : "";
      const toDate = filters.dateTo
        ? new Date(filters.dateTo).toLocaleDateString("vi-VN")
        : "";
      const dateRangeText =
        fromDate && toDate ? `${fromDate} - ${toDate}` : fromDate || toDate;
      activeFilters.push({
        key: "dateRange",
        label: "Khoảng thời gian",
        value: dateRangeText,
      });
    }

    return activeFilters;
  };

  // const removeItemFromFilter = (key: keyof PromptFilterState): void => {
  //   switch (key) {
  //     case "searchTerm":
  //       onFilterChange({ ...filters, searchTerm: "" });
  //       break;
  //     case "categoryId":
  //       onFilterChange({ ...filters, categoryId: "all" });
  //       break;
  //     case "status":
  //       onFilterChange({ ...filters, status: "all" });
  //       break;
  //     case "isPremium":
  //       onFilterChange({ ...filters, isPremium: "all" });
  //       break;
  //     case "tags":
  //       onFilterChange({ ...filters, tags: [] });
  //       break;
  //   }
  //   onPageReset?.();
  // };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <PromptFilterCard
        filters={filters}
        categories={categories}
        industries={industries}
        onSearchChange={handleSearchChange}
        onCategoriesChange={handleCategoriesChange}
        onPremiumChange={handlePremiumChange}
        onIndustriesChange={handleIndustriesChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {hasActiveFilters && (
        <PromptActiveFilters
          filters={filters}
          categories={categories}
          industries={industries}
          onFilterChange={onFilterChange}
          onClearAll={onClearFilters}
          onPageReset={onPageReset}
        />
      )}
    </div>
  );
};

const PromptFilterCard = ({
  filters,
  categories,
  industries,
  onSearchChange,
  onCategoriesChange,
  onPremiumChange,
  onIndustriesChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
  hasActiveFilters,
}: IPromptFilterProps): React.JSX.Element => (
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
      {/* First Row - Search and Industries */}
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
        {/* Search Input */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Tìm kiếm</Label>
          <div className="relative">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề, nội dung..."
              value={filters.searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Industries Filter */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Ngành nghề</Label>
          <IndustriesFilter
            value={filters.industryIds}
            industries={industries}
            onChange={onIndustriesChange}
          />
        </div>
      </div>

      {/* Second Row - Categories and Type */}
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
        {/* Categories Filter - Multiple Select */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Danh mục</Label>
          <CategoriesMultiFilter
            value={filters.categoryIds || []}
            categories={categories}
            onChange={onCategoriesChange}
          />
        </div>

        {/* Premium Filter */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Loại</Label>
          <PremiumFilter
            value={filters.isType?.toString() || ""}
            onChange={onPremiumChange}
          />
        </div>
      </div>

      {/* Third Row - Date Range (Compact) */}
      <div className="flex justify-start">
        <div className="flex sm:flex-row flex-col gap-4 w-full lg:w-auto">
          {/* Date From */}
          <div className="space-y-2 w-full sm:w-auto">
            <Label className="font-medium text-sm">Từ ngày</Label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={e => onDateFromChange(e.target.value)}
              className="w-full sm:w-48"
            />
          </div>

          {/* Date To */}
          <div className="space-y-2 w-full sm:w-auto">
            <Label className="font-medium text-sm">Đến ngày</Label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={e => onDateToChange(e.target.value)}
              className="w-full sm:w-48"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Premium filter component
 *
 * @param props - The component props
 * @returns The premium filter JSX
 */
const PremiumFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const premiumOptions = [
    { id: "all", name: "Tất cả loại" },
    { id: "2", name: "Premium" },
    { id: "1", name: "Miễn phí" },
  ];

  return (
    <BaseSelect
      items={premiumOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn loại..."
      className="w-full"
    />
  );
};

/**
 * Categories filter component with multiple select
 *
 * @param props - The component props
 * @returns The categories filter JSX
 */
const CategoriesMultiFilter = ({
  value,
  categories,
  onChange,
}: {
  value: string[];
  categories: Category[];
  onChange: (values: string[]) => void;
}): React.JSX.Element => {
  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id.toString(),
  }));

  return (
    <MultiSelect
      options={categoryOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn danh mục..."
      maxCount={3}
      className="w-full"
    />
  );
};

/**
 * Industries filter component with multiple select
 *
 * @param props - The component props
 * @returns The industries filter JSX
 */
const IndustriesFilter = ({
  value,
  industries,
  onChange,
}: {
  value: string[];
  industries: Category[];
  onChange: (values: string[]) => void;
}): React.JSX.Element => {
  const industryOptions = industries.map(industry => ({
    label: industry.name,
    value: industry.id.toString(),
  }));

  return (
    <MultiSelect
      options={industryOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn ngành nghề..."
      maxCount={3}
      className="w-full"
    />
  );
};
