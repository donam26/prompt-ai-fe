"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BaseTagsFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string[];
  readonly onChange: (tags: string[]) => void;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly className?: string;
  readonly separator?: string;
}

export const BaseTagsField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className,
  separator = ",",
}: BaseTagsFieldProps): React.JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value
      .split(separator)
      .map(tag => tag.trim())
      .filter(tag => tag);
    onChange(tags);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        value={Array.isArray(value) ? value.join(`, ${separator} `) : ""}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-10",
          error &&
            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
        )}
        required={required}
      />
      {value && value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
