import type {
  BaseFormProps,
  BaseFilterProps,
  BaseColumnHandlers,
} from "../base";

/**
 * User filter state interface
 */
export interface UserFilterState {
  readonly searchTerm: string;
  readonly role: string;
  readonly status: string;
  readonly dateRange: {
    readonly from: string;
    readonly to: string;
  };
}

/**
 * Props for the UserFilter component
 */
export type UserFilterProps = BaseFilterProps<UserFilterState>;

/**
 * User form data interface
 */
export interface UserFormData {
  readonly fullName: string;
  readonly email: string;
  readonly role: string;
  readonly status: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Props for the UserForm component
 */
export interface UserFormProps extends BaseFormProps<UserFormData> {
  readonly onFieldChange: (field: keyof UserFormData, value: string) => void;
}

/**
 * Column handlers for the user table
 */
export type UserColumnHandlers = BaseColumnHandlers;
