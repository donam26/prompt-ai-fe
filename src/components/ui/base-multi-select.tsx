import { MultiSelect } from "@/components/ui/multi-select";
import type { SelectOption } from "@/types/select.type";

interface BaseMultiSelectProps {
  items: SelectOption[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  maxCount?: number;
  className?: string;
}

export function BaseMultiSelect({
  items,
  defaultValue = [],
  onValueChange,
  placeholder = "Select items...",
  maxCount = 3,
  className = "w-full",
}: BaseMultiSelectProps) {
  const options = items.map(item => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <MultiSelect
      options={options}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      placeholder={placeholder}
      maxCount={maxCount}
      className={className}
    />
  );
}
