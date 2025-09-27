"use client";

import { BaseSwitchField } from "@/components/ui/base";

interface Props {
  name: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  isDisabled?: boolean;
}

export function FormSwitch({
  name,
  label,
  description,
  checked,
  onCheckedChange,
  isDisabled = false,
}: Props) {
  return (
    <div className="space-y-6">
      <BaseSwitchField
        id={name}
        label={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
        description={description}
        disabled={isDisabled}
      />
    </div>
  );
}
