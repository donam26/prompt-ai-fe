// UI component types for reuse

// Button variants
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";

// Button sizes
export type ButtonSize = "sm" | "md" | "lg" | "icon";

// Button props
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

// Input variants
export type InputVariant = "default" | "filled" | "outlined";

// Input sizes
export type InputSize = "sm" | "md" | "lg";

// Input props
export interface InputProps {
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
}

// Modal sizes
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

// Modal props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

// Alert variants
export type AlertVariant = "info" | "success" | "warning" | "error";

// Alert props
export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

// Badge variants
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// Badge props
export interface BadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

// Card variants
export type CardVariant = "default" | "outlined" | "elevated";

// Card props
export interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

// Avatar sizes
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

// Avatar props
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  className?: string;
}

// Tooltip positions
export type TooltipPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

// Tooltip props
export interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  disabled?: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

// Dropdown menu item
export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  divider?: boolean;
}

// Dropdown menu props
export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

// Table column
export interface TableColumn<T = unknown> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  align?: "left" | "center" | "right";
}

// Table props
export interface TableProps<T = unknown> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((record: T) => string);
  onRowClick?: (record: T, index: number) => void;
  className?: string;
}

// Pagination props
export interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  className?: string;
}

// Loading spinner props
export interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

// Skeleton props
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  className?: string;
}

// Progress bar props
export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  showValue?: boolean;
  className?: string;
}

// Tabs props
export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

// Accordion item
export interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

// Accordion props
export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultActiveKeys?: string[];
  className?: string;
}

// Drawer props
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  placement?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Popover props
export interface PopoverProps {
  content: React.ReactNode;
  trigger: React.ReactNode;
  placement?: TooltipPosition;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

// Theme context
export interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  resolvedTheme: "light" | "dark";
}

// Layout props
export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Header props
export interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

// Sidebar props
export interface SidebarProps {
  items: Array<{
    key: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: Array<{
      key: string;
      label: string;
      href: string;
    }>;
  }>;
  activeKey?: string;
  onItemClick?: (key: string) => void;
  className?: string;
}
