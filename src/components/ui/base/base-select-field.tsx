"use client";

import React from "react";
import { BaseSelect } from "@/components/ui/base-select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types/select.type";

export interface BaseSelectFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly options: SelectOption[];
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly className?: string;
}

export const BaseSelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  error,
  className,
}: BaseSelectFieldProps): React.JSX.Element => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <BaseSelect
        items={options}
        value={value}
        onValueChange={onChange}
        placeholder={placeholder}
        isDisabled={disabled}
        className={cn(
          "w-full h-10",
          error &&
            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
