"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface BaseTextareaFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly className?: string;
  readonly rows?: number;
}

export const BaseTextareaField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className,
  rows = 3,
}: BaseTextareaFieldProps): React.JSX.Element => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={cn(
          error &&
            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
        )}
        required={required}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
