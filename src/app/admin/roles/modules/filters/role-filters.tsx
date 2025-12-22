"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RoleActiveFilters } from "./role-active-filters";
import { debounce } from "@/lib/utils";
import type { RoleFilterState } from "@/types/admin/role";
import { BaseFilterProps } from "@/types/base";

export const RoleFilter = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: BaseFilterProps<RoleFilterState>): React.JSX.Element => {
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

  const hasActiveFilters = filters.searchTerm;

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
                placeholder="Tìm kiếm theo tên vai trò..."
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <RoleActiveFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onClearAll={onClearFilters}
        onPageReset={onPageReset}
      />
    </div>
  );
};
