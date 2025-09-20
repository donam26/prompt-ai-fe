import type { Props } from "@/types/select.type";
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
}: Props) {
  const handleValueChange = (newValue: string) => {
    // Convert "all" back to empty string for the parent component
    onValueChange(newValue === "all" ? "" : newValue);
  };

  // Convert empty string to "all" for the Select component
  const selectValue = value === "" ? "all" : value;

  return (
    <div className={className}>
      <Select
        value={selectValue}
        onValueChange={handleValueChange}
        disabled={isDisabled}
      >
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="min-w-0 max-w-full w-[var(--radix-select-trigger-width)]">
          {items.map(item => (
            <SelectItem
              key={item.id}
              value={item.id === "" ? "all" : item.id}
              className="w-full truncate line-clamp-1"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
