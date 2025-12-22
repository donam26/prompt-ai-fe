"use client";

import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseSelect } from "@/components/ui/base-select";
import { ExpiringSubscriptionsActiveFilters } from "./expiring-subscriptions-active-filters";
import { debounce } from "@/lib/utils";
import {
  ESubscriptionType,
  SUBSCRIPTION_NAMES,
} from "@/constants/subscription";
import type { ExpiringSubscriptionsFilterState } from "@/types/admin/expiring-subscriptions";

interface ExpiringSubscriptionsFilterProps {
  filters: ExpiringSubscriptionsFilterState;
  onFilterChange: (filters: ExpiringSubscriptionsFilterState) => void;
  onClearFilters: () => void;
  onPageReset?: () => void;
  className?: string;
}

export const ExpiringSubscriptionsFilter = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPageReset,
  className,
}: ExpiringSubscriptionsFilterProps): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState(filters.search || "");
  const [daysValue, setDaysValue] = useState(filters.days?.toString() || "1");
  const filtersRef = useRef(filters);

  const updateSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const updateDaysValue = useCallback((value: string) => {
    setDaysValue(value);
  }, []);

  useLayoutEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useLayoutEffect(() => {
    updateSearchValue(filters.search || "");
  }, [filters.search, updateSearchValue]);

  useLayoutEffect(() => {
    updateDaysValue(filters.days?.toString() || "1");
  }, [filters.days, updateDaysValue]);

  // Use useRef to persist debounced functions across renders
  const debouncedSearchHandlerRef = useRef(
    debounce((value: string) => {
      onFilterChange({
        ...filtersRef.current,
        search: value,
      });
      onPageReset?.();
    }, 300)
  );

  const debouncedDaysHandlerRef = useRef(
    debounce((value: number | undefined) => {
      onFilterChange({
        ...filtersRef.current,
        days: value,
      });
      onPageReset?.();
    }, 1000)
  );

  // Update the debounced functions when onFilterChange or onPageReset change
  useLayoutEffect(() => {
    debouncedSearchHandlerRef.current = debounce((value: string) => {
      onFilterChange({
        ...filtersRef.current,
        search: value,
      });
      onPageReset?.();
    }, 300);

    debouncedDaysHandlerRef.current = debounce((value: number | undefined) => {
      onFilterChange({
        ...filtersRef.current,
        days: value,
      });
      onPageReset?.();
    }, 1000);
  }, [onFilterChange, onPageReset]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearchHandlerRef.current(value);
    },
    []
  );

  const handleSubscriptionTypeChange = (value: string): void => {
    onFilterChange({
      ...filters,
      subscriptionType: value === "all" ? undefined : Number(value),
    });
    onPageReset?.();
  };

  const handleDaysChange = useCallback(
    (value: string) => {
      setDaysValue(value);
      const numValue = value === "" ? 1 : Number(value);
      const daysValue = numValue < 1 ? 1 : numValue;
      debouncedDaysHandlerRef.current(daysValue);
    },
    []
  );

  const getActiveFilters = () => {
    const activeFilters = [];

    if (filters.search) {
      activeFilters.push({
        key: "search",
        label: "Tìm kiếm",
        value: filters.search,
      });
    }

    if (
      filters.days !== undefined &&
      filters.days !== null &&
      filters.days > 0
    ) {
      activeFilters.push({
        key: "days",
        label: "Số ngày",
        value: `${filters.days} ngày`,
      });
    }

    if (filters.subscriptionType !== undefined) {
      const subscriptionName =
        SUBSCRIPTION_NAMES[
          filters.subscriptionType as keyof typeof SUBSCRIPTION_NAMES
        ] || `Gói ${filters.subscriptionType}`;
      activeFilters.push({
        key: "subscriptionType",
        label: "Loại gói",
        value: subscriptionName,
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  const handleRemoveFilter = (key: string): void => {
    const newFilters = { ...filters };

    if (key === "search") {
      newFilters.search = "";
      setSearchValue("");
    } else if (key === "days") {
      newFilters.days = 1;
      setDaysValue("1");
    } else if (key === "subscriptionType") {
      newFilters.subscriptionType = undefined;
    }

    onFilterChange(newFilters);
    onPageReset?.();
  };

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="space-y-4 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-lg">
            Bộ lọc
          </h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="mr-1 w-4 h-4" />
              Xóa tất cả
            </Button>
          )}
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="font-medium text-sm">
              Tìm kiếm
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="Tìm kiếm theo tên, email..."
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Days */}
          <div className="space-y-2">
            <Label htmlFor="days" className="font-medium text-sm">
              Số ngày
            </Label>
            <Input
              id="days"
              type="number"
              placeholder="Nhập số ngày (ví dụ: 5, 10, 30)"
              value={daysValue}
              onChange={e => handleDaysChange(e.target.value)}
              min={1}
              className="w-full"
            />
          </div>

          {/* Subscription Type */}
          <div className="space-y-2">
            <Label htmlFor="subscriptionType" className="font-medium text-sm">
              Loại gói
            </Label>
            <BaseSelect
              value={filters.subscriptionType?.toString() || "all"}
              onValueChange={handleSubscriptionTypeChange}
              items={[
                { id: "all", name: "Tất cả" },
                {
                  id: ESubscriptionType.FREE.toString(),
                  name: SUBSCRIPTION_NAMES[ESubscriptionType.FREE] || "Free",
                },
                {
                  id: ESubscriptionType.PREMIUM.toString(),
                  name:
                    SUBSCRIPTION_NAMES[ESubscriptionType.PREMIUM] || "Premium",
                },
                {
                  id: ESubscriptionType.TOKEN_PRO.toString(),
                  name:
                    SUBSCRIPTION_NAMES[ESubscriptionType.TOKEN_PRO] ||
                    "Token Pro",
                },
                {
                  id: ESubscriptionType.LEGACY.toString(),
                  name:
                    SUBSCRIPTION_NAMES[ESubscriptionType.LEGACY] || "Legacy",
                },
                {
                  id: ESubscriptionType.PRO.toString(),
                  name: SUBSCRIPTION_NAMES[ESubscriptionType.PRO] || "Pro",
                },
                {
                  id: ESubscriptionType.BUSINESS.toString(),
                  name:
                    SUBSCRIPTION_NAMES[ESubscriptionType.BUSINESS] ||
                    "Business",
                },
              ]}
              placeholder="Chọn loại gói"
              triggerClassName="w-full"
            />
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <ExpiringSubscriptionsActiveFilters
          filters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={onClearFilters}
        />
      )}
    </div>
  );
};
