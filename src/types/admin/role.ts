import type { BaseFormProps, BaseFilterProps } from "../base";

/**
 * Role filter state interface
 */
export interface RoleFilterState {
  readonly searchTerm: string;
}

export type RoleFilterProps = BaseFilterProps<RoleFilterState>;

export interface RoleFormData {
  readonly id?: string | number;
  readonly name: string;
  readonly description?: string;
  readonly permissions: string[];
}

/**
 * Props for the RoleForm component
 */
export interface RoleFormProps extends BaseFormProps<RoleFormData> {
  readonly onFieldChange: (
    field: keyof RoleFormData,
    value: string | string[]
  ) => void;
}

/**
 * Column handlers for the role table
 */
export interface RoleColumnHandlers {
  readonly onEditAction?: (role: any) => void;
  readonly onDeleteAction?: (role: any) => void;
  readonly onViewAction?: (role: any) => void;
}

/**
 * Props for the RoleHeader component
 */
export interface Props {
  readonly onAddRole: () => void;
}

/**
 * Role with additional data for display
 */
export interface RoleWithStats {
  readonly id: string | number;
  readonly name: string;
  readonly description?: string;
  readonly permissions: string[];
  readonly usersCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * Permission group interface
 */
export interface PermissionGroup {
  readonly label: string;
  readonly permissions: string[];
}

/**
 * Role assignment data
 */
export interface RoleAssignmentData {
  readonly role: string | number;
  readonly userIds: (string | number)[];
}

/**
 * Role user statistics
 */
export interface RoleUserStats {
  readonly role: string | number;
  readonly roleName: string;
  readonly usersCount: number;
  readonly lastAssignedAt?: string;
}
