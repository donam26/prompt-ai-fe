"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { debounce } from "@/lib/utils";
import type { ProductFilterProps } from "@/types/admin/product";
import type { Section } from "@/types";
import { ProductActiveFilters } from "./product-active-filters";

export const ProductFilter = ({
  filters,
  sections,
  sectionsLoading = false,
  onSectionsSearch,
  onSectionsScrollToBottom,
  hasMoreSections = false,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: ProductFilterProps): React.JSX.Element => {
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

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    debouncedSearchHandlerRef.current(value);
  }, []);

  const handleSectionsChange = useCallback(
    (values: string[]) => {
      onFilterChange({
        ...filters,
        sectionIds: values,
      });
      onPageReset?.();
    },
    [filters, onFilterChange, onPageReset]
  );

  const hasActiveFilters =
    filters.searchTerm || (filters.sectionIds && filters.sectionIds.length > 0);

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
                placeholder="Tìm kiếm theo tên, mô tả..."
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters Grid */}
          <div className="gap-4 grid grid-cols-1">
            <div className="space-y-2">
              <Label className="font-medium text-sm">Section</Label>
              <SectionsFilter
                value={filters.sectionIds || []}
                sections={sections}
                sectionsLoading={sectionsLoading}
                onSectionsSearch={onSectionsSearch}
                onSectionsScrollToBottom={onSectionsScrollToBottom}
                hasMoreSections={hasMoreSections}
                onChange={handleSectionsChange}
              />
            </div>
          </div>
        </div>
      </div>

      <ProductActiveFilters
        filters={filters}
        sections={sections}
        onFilterChange={onFilterChange}
        onClearAll={onClearFilters}
        onPageReset={() => onPageReset?.()}
      />
    </div>
  );
};

const SectionsFilter = ({
  value,
  sections,
  sectionsLoading = false,
  onSectionsSearch,
  onSectionsScrollToBottom,
  hasMoreSections = false,
  onChange,
}: {
  value: string[];
  sections: Section[];
  sectionsLoading?: boolean;
  onSectionsSearch?: (search: string) => void;
  onSectionsScrollToBottom?: () => void;
  hasMoreSections?: boolean;
  onChange: (values: string[]) => void;
}): React.JSX.Element => {
  const sectionOptions = sections.map(section => ({
    label: section.name,
    value: section.id.toString(),
  }));

  return (
    <MultiSelect
      options={sectionOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn section..."
      maxCount={3}
      className="w-full"
      shouldFilter={false}
      onSearch={onSectionsSearch}
      onScrollToBottom={onSectionsScrollToBottom}
      isLoading={sectionsLoading}
      hasMore={hasMoreSections}
    />
  );
};
