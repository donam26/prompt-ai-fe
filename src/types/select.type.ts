export interface SelectOption {
  id: string;
  name: string;
}

export interface Props {
  items: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  isDisabled?: boolean;
}
