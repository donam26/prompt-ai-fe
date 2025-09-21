"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Select components not used in current implementation

export interface SimpleMultiSelectOption {
  value: string;
  label: string;
}

interface SimpleMultiSelectProps {
  options: SimpleMultiSelectOption[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  maxCount?: number;
  className?: string;
  disabled?: boolean;
}

export function SimpleMultiSelect({
  options,
  defaultValue = [],
  onValueChange,
  placeholder = "Select items...",
  maxCount = 3,
  className,
  disabled = false,
}: SimpleMultiSelectProps) {
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSelectedValues(defaultValue);
  }, [defaultValue]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    onValueChange?.(newValues);
  };

  const handleRemove = (value: string) => {
    const newValues = selectedValues.filter(item => item !== value);
    setSelectedValues(newValues);
    onValueChange?.(newValues);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;

    const selectedOptions = options.filter(option =>
      selectedValues.includes(option.value)
    );

    if (selectedOptions.length <= maxCount) {
      return selectedOptions.map(option => option.label).join(", ");
    }

    const visibleOptions = selectedOptions.slice(0, maxCount);
    const remainingCount = selectedOptions.length - maxCount;
    return `${visibleOptions.map(option => option.label).join(", ")} +${remainingCount}`;
  };

  const getSelectedBadges = () => {
    return options.filter(option => selectedValues.includes(option.value));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "justify-between w-full",
            !selectedValues.length && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <span className="truncate">{getDisplayText()}</span>
          <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>

        {isOpen && (
          <div className="z-50 absolute bg-white shadow-lg mt-1 border border-gray-200 rounded-md w-full max-h-60 overflow-auto">
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "flex items-center hover:bg-gray-100 px-3 py-2 cursor-pointer",
                  selectedValues.includes(option.value) && "bg-blue-50"
                )}
              >
                <Check
                  className={cn(
                    "mr-2 w-4 h-4",
                    selectedValues.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected items as badges */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {getSelectedBadges().map(option => (
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
        </div>
      )}
    </div>
  );
}
