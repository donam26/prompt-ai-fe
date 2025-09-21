"use client";

import React from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseSelect } from "@/components/ui/base-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { PromptActiveFilters } from "@/components/common";
import type {
  PromptFilterProps,
  PromptFilterState,
  PromptActiveFilterItem,
} from "@/types/admin";

/**
 * Prompt filter component with search, category, status, premium, and tags filters
 *
 * @param props - The component props
 * @returns The prompt filter JSX
 */
export const PromptFilter = ({
  filters,
  categories,
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

  const handleCategoryChange = (value: string): void => {
    onFilterChange({
      ...filters,
      categoryId: value,
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

  const handlePremiumChange = (value: string): void => {
    onFilterChange({
      ...filters,
      isPremium: value,
    });
    onPageReset?.();
  };

  const handleTagsChange = (values: string[]): void => {
    onFilterChange({
      ...filters,
      tags: values,
    });
    onPageReset?.();
  };

  const getActiveFilters = (): PromptActiveFilterItem[] => {
    const activeFilters: PromptActiveFilterItem[] = [];

    if (filters.searchTerm) {
      activeFilters.push({
        key: "searchTerm",
        label: "Tìm kiếm",
        value: filters.searchTerm,
      });
    }

    if (filters.categoryId !== "all") {
      const category = categories.find(
        cat => cat.id.toString() === filters.categoryId
      );
      activeFilters.push({
        key: "categoryId",
        label: "Danh mục",
        value: category?.name || filters.categoryId,
      });
    }

    if (filters.status !== "all") {
      const statusLabels: Record<string, string> = {
        active: "Hoạt động",
        inactive: "Không hoạt động",
        draft: "Bản nháp",
      };
      activeFilters.push({
        key: "status",
        label: "Trạng thái",
        value: statusLabels[filters.status] || filters.status,
      });
    }

    if (filters.isPremium !== "all") {
      const premiumLabels: Record<string, string> = {
        premium: "Premium",
        free: "Miễn phí",
      };
      activeFilters.push({
        key: "isPremium",
        label: "Loại",
        value: premiumLabels[filters.isPremium] || filters.isPremium,
      });
    }

    if (filters.tags.length > 0) {
      activeFilters.push({
        key: "tags",
        label: "Tags",
        value: `${filters.tags.length} tag(s)`,
      });
    }

    return activeFilters;
  };

  const removeItemFromFilter = (key: keyof PromptFilterState): void => {
    switch (key) {
      case "searchTerm":
        onFilterChange({ ...filters, searchTerm: "" });
        break;
      case "categoryId":
        onFilterChange({ ...filters, categoryId: "all" });
        break;
      case "status":
        onFilterChange({ ...filters, status: "all" });
        break;
      case "isPremium":
        onFilterChange({ ...filters, isPremium: "all" });
        break;
      case "tags":
        onFilterChange({ ...filters, tags: [] });
        break;
    }
    onPageReset?.();
  };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <PromptFilterCard
        filters={filters}
        categories={categories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        onPremiumChange={handlePremiumChange}
        onTagsChange={handleTagsChange}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {hasActiveFilters && (
        <PromptActiveFilters
          filters={filters}
          categories={categories}
          onFilterChange={onFilterChange}
          onClearAll={onClearFilters}
          onPageReset={onPageReset}
        />
      )}
    </div>
  );
};

/**
 * Prompt filter card component
 *
 * @param props - The component props
 * @returns The prompt filter card JSX
 */
const PromptFilterCard = ({
  filters,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onPremiumChange,
  onTagsChange,
  onClearFilters,
  hasActiveFilters,
}: {
  filters: PromptFilterState;
  categories: any[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPremiumChange: (value: string) => void;
  onTagsChange: (values: string[]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}): React.JSX.Element => (
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
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category and Status Filters */}
      <div className="gap-4 grid xl:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Danh mục</Label>
          <CategoryFilter
            value={filters.categoryId}
            categories={categories}
            onChange={onCategoryChange}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Trạng thái</Label>
          <StatusFilter value={filters.status} onChange={onStatusChange} />
        </div>
      </div>

      {/* Premium and Tags Filters */}
      <div className="gap-4 grid xl:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-medium text-sm">Loại</Label>
          <PremiumFilter value={filters.isPremium} onChange={onPremiumChange} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Tags</Label>
          <TagsFilter value={filters.tags} onChange={onTagsChange} />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Category filter component
 *
 * @param props - The component props
 * @returns The category filter JSX
 */
const CategoryFilter = ({
  value,
  categories,
  onChange,
}: {
  value: string;
  categories: any[];
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const categoryOptions = [
    { value: "all", label: "Tất cả danh mục" },
    ...categories.map(category => ({
      value: category.id.toString(),
      label: category.name,
    })),
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
    { value: "all", label: "Tất cả trạng thái" },
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Không hoạt động" },
    { value: "draft", label: "Bản nháp" },
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
    { value: "all", label: "Tất cả loại" },
    { value: "premium", label: "Premium" },
    { value: "free", label: "Miễn phí" },
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
 * Tags filter component
 *
 * @param props - The component props
 * @returns The tags filter JSX
 */
const TagsFilter = ({
  value,
  onChange,
}: {
  value: readonly string[];
  onChange: (values: string[]) => void;
}): React.JSX.Element => {
  // Mock tags data - in real app, this would come from API
  const tagOptions = [
    { value: "ai", label: "AI" },
    { value: "writing", label: "Writing" },
    { value: "coding", label: "Coding" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "business", label: "Business" },
  ];

  return (
    <MultiSelect
      items={tagOptions}
      defaultValue={[...value]}
      onValueChange={onChange}
      placeholder="Chọn tags..."
      maxCount={3}
      className="w-full"
    />
  );
};
