"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface BaseImageFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly className?: string;
  readonly previewHeight?: string;
}

export const BaseImageField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className,
  previewHeight = "h-32",
}: BaseImageFieldProps): React.JSX.Element => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="url"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-10",
          error &&
            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
        )}
        required={required}
      />
      {value && (
        <div className="mt-2">
          <div
            className={cn(
              "relative border rounded-md overflow-hidden",
              previewHeight
            )}
          >
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              onError={e => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
