"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface BaseSwitchFieldProps {
  readonly id: string;
  readonly label: string;
  readonly checked: boolean;
  readonly onCheckedChange: (checked: boolean) => void;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly description?: string;
}

export const BaseSwitchField = ({
  id,
  label,
  checked,
  onCheckedChange,
  disabled = false,
  className,
  description,
}: BaseSwitchFieldProps): React.JSX.Element => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <Label htmlFor={id} className="font-medium text-sm">
          {label}
        </Label>
      </div>
      {description && (
        <p className="ml-6 text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
};
