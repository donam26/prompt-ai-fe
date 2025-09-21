"use client";

import * as React from "react";
import { ChevronsUpDown, X, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Command components not used in current implementation
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  maxCount?: number;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  defaultValue = [],
  onValueChange,
  placeholder = "Select items...",
  maxCount = 3,
  className,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue);
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = React.useState("");
  const selectAllCheckboxRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setSelectedValues(defaultValue);
  }, [defaultValue]);

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Memoize expensive calculations
  const selectedValuesSet = React.useMemo(
    () => new Set(selectedValues || []),
    [selectedValues]
  );

  const handleSelect = React.useCallback(
    (value: string) => {
      const currentValues = selectedValues || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];

      setSelectedValues(newValues);
      onValueChange?.(newValues);
    },
    [selectedValues, onValueChange]
  );

  const handleSelectAll = React.useCallback(() => {
    const allValues = options.map(option => option.value);
    const currentValues = selectedValues || [];
    const newValues = currentValues.length === options.length ? [] : allValues;
    setSelectedValues(newValues);
    onValueChange?.(newValues);
  }, [options, selectedValues, onValueChange]);

  const handleClear = React.useCallback(() => {
    setSelectedValues([]);
    onValueChange?.([]);
  }, [onValueChange]);

  const handleRemove = React.useCallback(
    (value: string) => {
      const currentValues = selectedValues || [];
      const newValues = currentValues.filter(item => item !== value);
      setSelectedValues(newValues);
      onValueChange?.(newValues);
    },
    [selectedValues, onValueChange]
  );

  const getDisplayText = React.useCallback(() => {
    if ((selectedValues?.length || 0) === 0) return placeholder;

    const selectedOptions = options.filter(option =>
      selectedValuesSet.has(option.value)
    );

    if (selectedOptions.length <= maxCount) {
      return selectedOptions.map(option => option.label).join(", ");
    }

    const visibleOptions = selectedOptions.slice(0, maxCount);
    const remainingCount = selectedOptions.length - maxCount;
    return `${visibleOptions.map(option => option.label).join(", ")} +${remainingCount}`;
  }, [
    selectedValues?.length,
    options,
    selectedValuesSet,
    maxCount,
    placeholder,
  ]);

  const getSelectedBadges = React.useCallback(() => {
    return options.filter(option => selectedValuesSet.has(option.value));
  }, [options, selectedValuesSet]);

  const filteredOptions = React.useMemo(() => {
    if (!debouncedSearchValue.trim()) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
  }, [options, debouncedSearchValue]);

  const isAllSelected = React.useMemo(
    () => (selectedValues?.length || 0) === options.length,
    [selectedValues?.length, options.length]
  );

  const isIndeterminate = React.useMemo(
    () =>
      (selectedValues?.length || 0) > 0 &&
      (selectedValues?.length || 0) < options.length,
    [selectedValues?.length, options.length]
  );

  // Handle indeterminate state for Select All checkbox
  React.useEffect(() => {
    if (selectAllCheckboxRef.current) {
      (selectAllCheckboxRef.current as any).indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  // Memoize the display text to avoid recalculation on every render
  const displayText = React.useMemo(() => getDisplayText(), [getDisplayText]);

  // Memoize selected badges to avoid recalculation
  const selectedBadges = React.useMemo(
    () => getSelectedBadges(),
    [getSelectedBadges]
  );

  return (
    <div className={cn("space-y-2", className)}>
      {/* Selected items as badges - displayed above the dropdown */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1 bg-gray-50 p-2 border border-gray-200 rounded-md">
          {selectedBadges.slice(0, maxCount).map(option => (
            <Badge
              key={option.value}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 text-xs"
            >
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(option.value)}
                className="hover:bg-gray-200 ml-1 p-0.5 rounded-full"
                disabled={disabled}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedValues.length > maxCount && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 text-xs"
            >
              +{selectedValues.length - maxCount} more
              <button
                type="button"
                onClick={handleClear}
                className="hover:bg-gray-200 ml-1 p-0.5 rounded-full"
                disabled={disabled}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between w-full",
              !selectedValues.length && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <span className="truncate">{displayText}</span>
            <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full" align="start">
          <div className="p-2">
            {/* Search Input */}
            <div className="relative mb-2">
              <Search className="top-1/2 left-2 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="py-2 pr-3 pl-8 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-auto">
              {/* Select All Option */}
              <div
                onClick={handleSelectAll}
                className="flex items-center hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
              >
                <Checkbox
                  checked={isAllSelected}
                  ref={selectAllCheckboxRef}
                  className="data-[state=checked]:bg-purple-600 mr-2 data-[state=checked]:border-purple-600 data-[state=checked]:text-white"
                />
                <span
                  className={cn(
                    isAllSelected && "font-bold",
                    isIndeterminate && "font-bold"
                  )}
                >
                  {isAllSelected ? "(Deselect All)" : "(Select All)"}
                </span>
              </div>

              {/* Individual Options */}
              {filteredOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="flex items-center hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                >
                  <Checkbox
                    checked={selectedValuesSet.has(option.value)}
                    className="data-[state=checked]:bg-purple-600 mr-2 data-[state=checked]:border-purple-600 data-[state=checked]:text-white"
                  />
                  <span
                    className={cn(
                      selectedValuesSet.has(option.value) && "font-medium"
                    )}
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-2 pt-2 border-gray-200 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear
              </Button>
              <div className="bg-gray-300 w-px h-4"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Close
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
