"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import isEqual from "lodash/isEqual";
import {
  ChevronDown,
  XCircle,
  X as XIcon,
  Check,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export interface MultiSelectOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[]; // controlled
  defaultValue?: string[]; // uncontrolled initial
  placeholder?: string;
  maxCount?: number;
  variant?: "default" | "secondary";
  animation?: number;
  modalPopover?: boolean;
  disabled?: boolean;
  shouldFilter?: boolean;
  className?: string;
  onValueChange?: (values: string[]) => void;
  onSearch?: (q: string) => void;
  onPopoverOpenChange?: (open: boolean) => void;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  placeholder = "Select options",
  maxCount = 3,
  variant = "default",
  animation = 0,
  modalPopover,
  shouldFilter = true,
  disabled = false,
  className,
  onValueChange,
  onSearch,
  onPopoverOpenChange,
}: MultiSelectProps) {
  // controlled vs uncontrolled
  const isControlled = value !== undefined;

  // local state (used when uncontrolled; also mirrored for controlled to render immediately)
  const [selectedValues, setSelectedValues] = useState<string[]>(() =>
    isControlled ? ((value as string[]) ?? []) : (defaultValue ?? [])
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedRef = useRef<string[]>(selectedValues);

  // sync controlled value -> local
  useLayoutEffect(() => {
    const safeValue = Array.isArray(value) ? value : [];
    if (!isEqual(safeValue, selectedRef.current)) {
      selectedRef.current = safeValue;
      setSelectedValues([...safeValue]);
    }
  }, [value]);

  // if defaultValue changes and uncontrolled, update
  useEffect(() => {
    if (!isControlled) {
      setSelectedValues(defaultValue ?? []);
      selectedRef.current = defaultValue ?? [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const emitChange = (newValues: string[]) => {
    selectedRef.current = newValues;
    onValueChange?.(newValues);
  };

  const toggleOption = (opt: string) => {
    // compute new values
    const newValues = selectedValues.includes(opt)
      ? selectedValues.filter(v => v !== opt)
      : [...selectedValues, opt];

    // update local (useful for immediate UI) and notify
    setSelectedValues(newValues);
    emitChange(newValues);
  };

  const clearAll = () => {
    setSelectedValues([]);
    emitChange([]);
  };

  const clearExtra = () => {
    const trimmed = selectedValues.slice(0, maxCount);
    setSelectedValues(trimmed);
    emitChange(trimmed);
  };

  const handleSelectAllFor = (currentOptions: MultiSelectOption[]) => {
    const allValues = currentOptions.map(o => o.value);
    const isAllSelected =
      currentOptions.length > 0 &&
      currentOptions.every(o => selectedValues.includes(o.value));

    const newValues = isAllSelected
      ? selectedValues.filter(v => !allValues.includes(v))
      : Array.from(new Set([...selectedValues, ...allValues]));

    setSelectedValues(newValues);
    emitChange(newValues);
  };

  const handleSearch = (q: string) => {
    setSearchTerm(q);
    onSearch?.(q);
  };

  const handlePopoverChange = (open: boolean) => {
    setIsPopoverOpen(open);
    onPopoverOpenChange?.(open);
    // reset search when closing (optional)
    if (!open) {
      setSearchTerm("");
    }
  };

  // filtering (we control it so Select All respects current visible items)
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm.trim()) return options;
    const q = searchTerm.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(q));
  }, [options, searchTerm]);

  // input key handling (Backspace to remove last)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsPopoverOpen(true);
    } else if (
      e.key === "Backspace" &&
      !(e.currentTarget as HTMLInputElement).value
    ) {
      // remove last
      if (selectedValues.length > 0) {
        const newValues = selectedValues.slice(0, -1);
        setSelectedValues(newValues);
        emitChange(newValues);
      }
    }
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={handlePopoverChange}
      modal={modalPopover}
    >
      {/* Trigger button: wrap whole trigger as child so popover positions correctly */}
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 bg-background p-1 border border-input rounded-md w-full min-h-10",
            disabled && "opacity-50 pointer-events-none",
            className
          )}
          aria-expanded={isPopoverOpen}
          aria-haspopup="listbox"
        >
          <div className="flex flex-wrap flex-1 items-center gap-1">
            {selectedValues.length === 0 ? (
              <span className="ml-2 text-muted-foreground text-sm">
                {placeholder}
              </span>
            ) : (
              <>
                {selectedValues.slice(0, maxCount).map(val => {
                  const opt = options.find(o => o.value === val);
                  const IconComp = opt?.icon;
                  return (
                    <Badge
                      key={val}
                      variant={variant}
                      className="flex items-center gap-1 px-2 py-1 text-xs"
                    >
                      {IconComp && <IconComp className="w-4 h-4" />}
                      <span>{opt?.label}</span>
                      {/* use onMouseDown to prevent the trigger toggle */}
                      <XCircle
                        className="w-4 h-4 cursor-pointer"
                        onMouseDown={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleOption(val);
                        }}
                      />
                    </Badge>
                  );
                })}

                {selectedValues.length > maxCount && (
                  <Badge
                    variant={variant}
                    className="flex items-center gap-1 px-2 py-1 text-xs"
                  >
                    +{selectedValues.length - maxCount} more
                    <XCircle
                      className="w-4 h-4 cursor-pointer"
                      onMouseDown={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        clearExtra();
                      }}
                    />
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* small controls on the right */}
          {selectedValues.length > 0 ? (
            <>
              <div
                className="hover:bg-gray-100 mx-1 p-1 rounded cursor-pointer"
                onMouseDown={e => {
                  // prevent popover toggle
                  e.preventDefault();
                  e.stopPropagation();
                  clearAll();
                }}
                role="button"
                aria-label="Clear selection"
              >
                <XIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <Separator orientation="vertical" className="h-6" />
            </>
          ) : (
            <div className="mx-1" />
          )}

          <ChevronDown className="mx-2 w-4 h-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      {/* Popover content */}
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={6}
        className="z-50 p-0 w-56"
      >
        <Command shouldFilter={shouldFilter}>
          <CommandInput
            placeholder="Search..."
            value={searchTerm}
            onValueChange={handleSearch}
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup>
              {/* Select All (for current filtered options) */}
              <CommandItem
                value="__select_all"
                onSelect={() => handleSelectAllFor(filteredOptions)}
              >
                <div
                  className={cn(
                    "flex justify-center items-center mr-2 border border-primary rounded-sm w-4 h-4",
                    filteredOptions.length > 0 &&
                      filteredOptions.every(o =>
                        selectedValues.includes(o.value)
                      )
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <Check className="w-4 h-4" />
                </div>
                Select all
              </CommandItem>

              {/* Options */}
              {filteredOptions.map(opt => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.label}
                    onSelect={() => toggleOption(opt.value)}
                  >
                    <div
                      className={cn(
                        "flex justify-center items-center mr-2 border border-primary rounded-sm w-4 h-4",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                    {opt.icon && (
                      <opt.icon className="mr-2 w-4 h-4 text-muted-foreground" />
                    )}
                    <span>{opt.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup>
              {selectedValues.length > 0 && (
                <>
                  <CommandItem
                    onSelect={() => {
                      clearAll();
                    }}
                    className="flex-1 justify-center"
                  >
                    Clear
                  </CommandItem>
                  <Separator orientation="vertical" className="h-6" />
                </>
              )}
              <CommandItem
                onSelect={() => setIsPopoverOpen(false)}
                className="flex-1 justify-center"
              >
                Close
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>

      {/* optional animation toggle */}
      {animation > 0 && selectedValues.length > 0 && (
        <WandSparkles
          className={cn(
            "my-2 w-3 h-3 cursor-pointer",
            isAnimating ? "text-foreground" : "text-muted-foreground"
          )}
          onClick={() => setIsAnimating(prev => !prev)}
        />
      )}
    </Popover>
  );
}

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
