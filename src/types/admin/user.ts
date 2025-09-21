/**
 * Admin user types
 *
 * Type definitions for admin user management components and functionality.
 */

import type { User } from "@/lib/types";

/**
 * Form data structure for user creation/editing
 */
export interface UserFormData {
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly status: "active" | "inactive" | "suspended";
  readonly phone?: string;
  readonly avatar?: string;
}

/**
 * Props for the UserHeader component
 */
export interface UserHeaderProps {
  readonly onAddUser: () => void;
}

/**
 * Props for the UserFormDialog component
 */
export interface UserFormDialogProps {
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly editingUser: User | null;
  readonly formData: UserFormData;
  readonly onFormDataChange: (data: UserFormData) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly onReset: () => void;
}

/**
 * Props for the UserFormFields component
 */
export interface UserFormFieldsProps {
  readonly formData: UserFormData;
  readonly onFormDataChange: (data: UserFormData) => void;
}

/**
 * Props for the UserFormActions component
 */
export interface UserFormActionsProps {
  readonly onReset: () => void;
  readonly editingUser: User | null;
}

/**
 * Props for the UserTable component
 */
export interface UserTableProps {
  readonly data: User[];
  readonly columns: ReturnType<
    typeof import("../../app/admin/users/modules/table/columns").createUserColumns
  >;
  readonly loading: boolean;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems?: number;
  readonly pageSize?: number;
  readonly onPageChange: (page: number) => void;
}

/**
 * Context type for column handlers
 */
export interface UserColumnHandlers {
  readonly onEdit?: (user: User) => void;
  readonly onDelete?: (id: string | number) => void;
  readonly onView?: (user: User) => void;
}

/**
 * Props for the UserImage component
 */
export interface UserImageProps {
  readonly user: User;
}

/**
 * Props for the UserStatus component
 */
export interface UserStatusProps {
  readonly user: User;
}

/**
 * Props for the UserActions component
 */
export interface UserActionsProps {
  readonly user: User;
  readonly handlers: UserColumnHandlers;
}

/**
 * Filter state interface for user filtering
 */
export interface UserFilterState {
  readonly searchTerm: string;
  readonly role: string; // "all" means no filter
  readonly status: string; // "all" means no filter
  readonly dateRange: {
    readonly from: string;
    readonly to: string;
  };
}

/**
 * Props for the UserFilter component
 */
export interface UserFilterProps {
  readonly filters: UserFilterState;
  readonly onFilterChange: (filters: UserFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Active filter item interface
 */
export interface UserActiveFilterItem {
  readonly key: keyof UserFilterState;
  readonly label: string;
  readonly value: string;
}

/**
 * Props for the UserFilterCard component
 */
export interface UserFilterCardProps {
  readonly filters: UserFilterState;
  readonly onSearchChange: (value: string) => void;
  readonly onRoleChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onDateRangeChange: (range: { from: string; to: string }) => void;
  readonly onClearFilters: () => void;
  readonly hasActiveFilters: boolean;
}

/**
 * Props for the UserSearchFilter component
 */
export interface UserSearchFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the UserRoleFilter component
 */
export interface UserRoleFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the UserStatusFilter component
 */
export interface UserStatusFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the UserDateRangeFilter component
 */
export interface UserDateRangeFilterProps {
  readonly value: { from: string; to: string };
  readonly onChange: (range: { from: string; to: string }) => void;
}

/**
 * Props for the UserActiveFiltersList component
 */
export interface UserActiveFiltersListProps {
  readonly activeFilters: UserActiveFilterItem[];
  readonly onRemoveFilter: (key: keyof UserFilterState) => void;
  readonly onClearAll: () => void;
  readonly totalActive: number;
}

/**
 * Props for the UserFilterBadge component
 */
export interface UserFilterBadgeProps {
  readonly label: string;
  readonly onRemove: () => void;
}

/**
 * Props for the UserActiveFilters component
 */
export interface UserActiveFiltersProps {
  readonly filters: UserFilterState;
  readonly onFilterChange: (filters: UserFilterState) => void;
  readonly onClearAll: () => void;
  readonly onPageReset?: () => void;
}
