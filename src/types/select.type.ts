export interface SelectItem {
  id: string;
  name: string;
}

export interface Props {
  items: SelectItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  isDisabled?: boolean;
}
