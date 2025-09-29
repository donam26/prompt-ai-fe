import type { SelectProps } from "@/types/select.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BaseSelect({
  items,
  value,
  onValueChange,
  placeholder = "",
  className = "flex justify-center",
  triggerClassName = "w-full max-w-xs",
  isDisabled,
}: SelectProps) {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange} disabled={isDisabled}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="min-w-0 max-w-full w-[var(--radix-select-trigger-width)]">
          {items?.map(item => (
            <SelectItem
              key={item.id}
              value={item.id}
              className="w-full truncate line-clamp-1"
            >
              {item.name}
            </SelectItem>
          )) || []}
        </SelectContent>
      </Select>
    </div>
  );
}
