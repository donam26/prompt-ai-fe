"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import { Search, X } from "lucide-react";
import DatePicker from "react-multi-date-picker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseSelect } from "@/components/ui/base-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import { PromptActiveFilters } from "./prompt-active-filters";
import { industryService } from "@/services";
import { debounce } from "@/lib/utils";
import type {
  PromptFilterProps,
  IPromptFilterProps,
} from "@/types/admin/prompt";
import { Category } from "@/types";

export const PromptFilter = ({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: PromptFilterProps): React.JSX.Element => {
  const [filteredIndustries, setFilteredIndustries] = useState<Category[]>([]);
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(false);
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

  // Fetch industries when categoryIds change
  useEffect(() => {
    // Only fetch when categories are selected
    if (!filters.categoryIds || filters.categoryIds.length === 0) {
      setFilteredIndustries([]);
      return;
    }

    const fetchIndustries = async () => {
      setIsLoadingIndustries(true);
      try {
        const response = await industryService.getIndustries({
          categoryIds: filters.categoryIds,
        });
        const industriesData: Category[] =
          (response.data?.data as Category[]) ||
          (Array.isArray(response.data) ? response.data : []);
        setFilteredIndustries(industriesData);
      } catch (error) {
        console.error("Error fetching industries:", error);
        setFilteredIndustries([]);
      } finally {
        setIsLoadingIndustries(false);
      }
    };

    fetchIndustries();
  }, [filters.categoryIds]);

  const handlePremiumChange = (value: string): void => {
    onFilterChange({
      ...filters,
      isType: value === "all" ? undefined : parseInt(value),
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
      // Clear industryIds when categories change
      industryIds: [],
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

  const handleOnlyWithoutCategoryChange = (value: boolean): void => {
    onFilterChange({
      ...filters,
      onlyWithoutCategory: value ? true : undefined,
    });
    onPageReset?.();
  };

  // Calculate if has active filters
  const hasActiveFilters =
    !!filters.searchTerm ||
    (filters.categoryIds && filters.categoryIds.length > 0) ||
    (filters.industryIds && filters.industryIds.length > 0) ||
    filters.isType !== undefined ||
    !!filters.dateFrom ||
    !!filters.dateTo ||
    !!filters.onlyWithoutCategory;

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <PromptFilterCard
        filters={filters}
        categories={categories}
        filteredIndustries={filteredIndustries}
        isLoadingIndustries={isLoadingIndustries}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onCategoriesChange={handleCategoriesChange}
        onPremiumChange={handlePremiumChange}
        onIndustriesChange={handleIndustriesChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
        onOnlyWithoutCategoryChange={handleOnlyWithoutCategoryChange}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {hasActiveFilters && (
        <PromptActiveFilters
          filters={filters}
          categories={categories}
          industries={filteredIndustries}
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
  filteredIndustries,
  isLoadingIndustries,
  searchValue,
  onSearchChange,
  onCategoriesChange,
  onPremiumChange,
  onIndustriesChange,
  onDateFromChange,
  onDateToChange,
  onOnlyWithoutCategoryChange,
  onClearFilters,
  hasActiveFilters,
}: IPromptFilterProps & { searchValue: string }): React.JSX.Element => (
  <div className="space-y-4 bg-white p-4 border border-gray-200 rounded-lg">
    <div className="flex justify-between items-center">
      <h3 className="font-medium text-gray-900 text-lg">Bộ lọc</h3>
      {hasActiveFilters && (
        <Button
          variant="ghost"
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
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search Input */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Tìm kiếm</Label>
          <div className="relative">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề, nội dung..."
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Premium Filter */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Loại</Label>
          <PremiumFilter
            value={filters.isType?.toString() || ""}
            onChange={onPremiumChange}
          />
        </div>

        {/* Third Row - Date Range */}
        <div className="space-y-2 w-full lg:w-auto">
          <Label className="font-medium text-sm">Khoảng thời gian</Label>
          <DateRangePicker
            dateFrom={filters.dateFrom}
            dateTo={filters.dateTo}
            onDateFromChange={onDateFromChange}
            onDateToChange={onDateToChange}
          />
        </div>
      </div>

      {/* Second Row - Categories and Type */}
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
        {/* Categories Filter - Multiple Select */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Danh mục</Label>
          <CategoriesMultiFilter
            value={filters.categoryIds || []}
            categories={categories}
            onChange={onCategoriesChange}
          />
        </div>

        {/* Industries Filter */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Ngành nghề</Label>
          <IndustriesFilter
            value={filters.industryIds}
            industries={filteredIndustries}
            isLoading={isLoadingIndustries}
            disabled={!filters.categoryIds || filters.categoryIds.length === 0}
            onChange={onIndustriesChange}
          />
        </div>

        {/* Only Without Category */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">
            Chỉ hiển thị prompt chưa có danh mục
          </Label>
          <div className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg">
            <Switch
              checked={!!filters.onlyWithoutCategory}
              onCheckedChange={onOnlyWithoutCategoryChange}
              aria-label="Chỉ hiển thị prompt chưa có danh mục"
            />
            <span className="text-gray-700 text-sm">
              Bật để lọc những prompt chưa gán danh mục
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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

const IndustriesFilter = ({
  value,
  industries,
  isLoading,
  disabled,
  onChange,
}: {
  value: string[];
  industries: Category[];
  isLoading?: boolean;
  disabled?: boolean;
  onChange: (values: string[]) => void;
}): React.JSX.Element => {
  const industryOptions = industries.map(industry => ({
    label: industry.name,
    value: industry.id.toString(),
  }));

  const placeholder = disabled
    ? "Vui lòng chọn danh mục trước..."
    : isLoading
      ? "Đang tải ngành nghề..."
      : "Chọn ngành nghề...";

  return (
    <MultiSelect
      options={industryOptions}
      value={value}
      onValueChange={onChange}
      placeholder={placeholder}
      maxCount={3}
      className="w-full"
      disabled={disabled || isLoading}
    />
  );
};

const DateRangePicker = ({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: {
  dateFrom?: string;
  dateTo?: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}): React.JSX.Element => {
  const handleDateFromChange = (date: any) => {
    const dateString = date ? date.format("YYYY-MM-DD") : "";
    onDateFromChange(dateString);
  };

  const handleDateToChange = (date: any) => {
    const dateString = date ? date.format("YYYY-MM-DD") : "";
    onDateToChange(dateString);
  };

  const formatDateForDisplay = (dateString?: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <div className="flex sm:flex-row flex-col gap-4 w-full lg:w-auto">
      {/* Date From */}
      <div className="w-full sm:w-48">
        <DatePicker
          value={formatDateForDisplay(dateFrom)}
          onChange={handleDateFromChange}
          format="DD/MM/YYYY"
          placeholder="Từ ngày"
          className="w-full"
          containerClassName="w-full"
          inputClass="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Date To */}
      <div className="w-full sm:w-48">
        <DatePicker
          value={formatDateForDisplay(dateTo)}
          onChange={handleDateToChange}
          format="DD/MM/YYYY"
          placeholder="Đến ngày"
          className="w-full"
          containerClassName="w-full"
          inputClass="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};
