// Form validation and field types

// Base form field
export interface BaseFormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
}

// Text input field
export interface TextField extends BaseFormField {
  type: "text" | "email" | "password" | "tel" | "url";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// Number input field
export interface NumberField extends BaseFormField {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}

// Select field
export interface SelectField extends BaseFormField {
  type: "select";
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  multiple?: boolean;
  searchable?: boolean;
}

// Textarea field
export interface TextareaField extends BaseFormField {
  type: "textarea";
  rows?: number;
  cols?: number;
  minLength?: number;
  maxLength?: number;
}

// Checkbox field
export interface CheckboxField extends BaseFormField {
  type: "checkbox";
  checked?: boolean;
}

// Radio field
export interface RadioField extends BaseFormField {
  type: "radio";
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
}

// File upload field
export interface FileField extends BaseFormField {
  type: "file";
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

// Date field
export interface DateField extends BaseFormField {
  type: "date" | "datetime-local" | "time";
  min?: string;
  max?: string;
}

// Union type for all field types
export type FormField =
  | TextField
  | NumberField
  | SelectField
  | TextareaField
  | CheckboxField
  | RadioField
  | FileField
  | DateField;

// Form validation rule
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
  message?: string;
}

// Form field with validation
export type FormFieldWithValidation = FormField & {
  validation?: ValidationRule;
};

// Form schema
export interface FormSchema {
  fields: FormFieldWithValidation[];
  submitText?: string;
  resetText?: string;
  cancelText?: string;
}

// Form state
export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

// Form submission result
export interface FormSubmissionResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
  message?: string;
}

// Login form data
export interface LoginFormData {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

// Register form data
export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Profile form data
export interface ProfileFormData {
  fullName: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: File;
}

// Password change form data
export interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

// Search form data
export interface SearchFormData {
  query: string;
  category?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Filter form data
export interface FilterFormData {
  status?: string[];
  role?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  search?: string;
}

// Form hook return type
export interface UseFormReturn<T = Record<string, unknown>> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  setValue: (name: string, value: unknown) => void;
  setError: (name: string, error: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  handleChange: (name: string, value: unknown) => void;
  handleBlur: (name: string) => void;
  handleSubmit: (
    onSubmit: (values: T) => void | Promise<void>
  ) => (e: React.FormEvent) => void;
  reset: () => void;
  validate: () => boolean;
  validateField: (name: string) => boolean;
}
