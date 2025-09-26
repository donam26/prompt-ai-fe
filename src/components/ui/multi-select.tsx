"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  maxCount?: number;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  hideSelectAll?: boolean;
  closeOnSelect?: boolean;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Select items...",
  maxCount = 3,
  className,
  disabled = false,
  searchable = true,
  hideSelectAll = false,
  closeOnSelect = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    value || defaultValue
  );
  const [searchValue, setSearchValue] = React.useState("");

  // Handle controlled component
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  // Handle uncontrolled component
  React.useEffect(() => {
    if (value === undefined) {
      setSelectedValues(defaultValue);
    }
  }, [defaultValue, value]);

  const selectedValuesSet = React.useMemo(
    () => new Set(selectedValues),
    [selectedValues]
  );

  const handleSelect = React.useCallback(
    (value: string) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(item => item !== value)
        : [...selectedValues, value];

      setSelectedValues(newValues);
      onValueChange?.(newValues);

      if (closeOnSelect) {
        setOpen(false);
      }
    },
    [selectedValues, onValueChange, closeOnSelect]
  );

  const handleClear = React.useCallback(() => {
    setSelectedValues([]);
    onValueChange?.([]);
  }, [onValueChange]);

  const handleRemove = React.useCallback(
    (value: string) => {
      const newValues = selectedValues.filter(item => item !== value);
      setSelectedValues(newValues);
      onValueChange?.(newValues);
    },
    [selectedValues, onValueChange]
  );

  const selectedOptions = React.useMemo(() => {
    return options.filter(option => selectedValuesSet.has(option.value));
  }, [options, selectedValuesSet]);

  const filteredOptions = React.useMemo(() => {
    if (!searchValue.trim()) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  const handleSelectAll = React.useCallback(() => {
    const currentOptions = searchValue ? filteredOptions : options;
    const allValues = currentOptions.map(option => option.value);
    const isAllSelected = allValues.every(value =>
      selectedValues.includes(value)
    );
    const newValues = isAllSelected ? [] : allValues;
    setSelectedValues(newValues);
    onValueChange?.(newValues);
  }, [options, filteredOptions, selectedValues, onValueChange, searchValue]);

  const currentOptions = searchValue ? filteredOptions : options;
  const isAllSelected =
    currentOptions.length > 0 &&
    currentOptions.every(option => selectedValues.includes(option.value));
  const isIndeterminate =
    currentOptions.some(option => selectedValues.includes(option.value)) &&
    !isAllSelected;

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between p-1 w-full h-auto min-h-10",
              !selectedValues.length && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap flex-1 items-center gap-1">
                  {selectedOptions.slice(0, maxCount).map(option => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1 text-xs"
                    >
                      {option.label}
                      <div
                        onClick={e => {
                          e.stopPropagation();
                          if (!disabled) handleRemove(option.value);
                        }}
                        className={cn(
                          "hover:bg-gray-200 ml-1 p-0.5 rounded-full cursor-pointer",
                          disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <X className="w-3 h-3" />
                      </div>
                    </Badge>
                  ))}
                  {selectedValues.length > maxCount && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1 text-xs"
                    >
                      +{selectedValues.length - maxCount} more
                      <div
                        onClick={e => {
                          e.stopPropagation();
                          if (!disabled) handleClear();
                        }}
                        className={cn(
                          "hover:bg-gray-200 ml-1 p-0.5 rounded-full cursor-pointer",
                          disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <X className="w-3 h-3" />
                      </div>
                    </Badge>
                  )}
                </div>
                <div className="flex items-center ml-2">
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      if (!disabled) handleClear();
                    }}
                    className={cn(
                      "hover:bg-gray-200 mr-2 p-1 rounded-full cursor-pointer",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <ChevronsUpDown className="opacity-50 w-4 h-4 shrink-0" />
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span className="text-muted-foreground text-sm">
                  {placeholder}
                </span>
                <ChevronsUpDown className="opacity-50 w-4 h-4 shrink-0" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full" align="start">
          <div className="p-2">
            {searchable && (
              <div className="relative mb-2">
                <Search className="top-1/2 left-2 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue || ""}
                  onChange={e => setSearchValue(e.target.value)}
                  className="bg-transparent py-2 pr-3 pl-8 border border-gray-200 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full placeholder:text-gray-400 text-sm"
                />
              </div>
            )}
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length === 0 && searchValue && (
                <div className="py-6 text-gray-500 text-sm text-center">
                  No options found.
                </div>
              )}
              {!hideSelectAll && (
                <div
                  onClick={handleSelectAll}
                  className="flex items-center hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                >
                  <div
                    className={cn(
                      "flex justify-center items-center mr-2 border border-primary rounded-sm w-4 h-4",
                      isAllSelected
                        ? "bg-primary text-primary-foreground"
                        : isIndeterminate
                          ? "bg-primary/50 text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <span
                    className={cn(
                      isAllSelected && "font-medium",
                      isIndeterminate && "font-medium"
                    )}
                  >
                    {isAllSelected ? "(Deselect All)" : "(Select All)"}
                  </span>
                </div>
              )}
              {filteredOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    "flex items-center hover:bg-gray-100 px-3 py-2 rounded cursor-pointer",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div
                    className={cn(
                      "flex justify-center items-center mr-2 border border-primary rounded-sm w-4 h-4",
                      selectedValuesSet.has(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className="w-3 h-3" />
                  </div>
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
