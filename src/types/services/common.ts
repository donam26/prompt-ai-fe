// Common service interfaces for reusability

export interface BaseEntityParams {
  id: string | number;
}

export interface EntityWithDataParams extends BaseEntityParams {
  data: unknown;
}

export interface EntityWithOptionalDataParams extends BaseEntityParams {
  data?: unknown;
}

export interface SubscriptionParams extends BaseEntityParams {
  subId: string | number;
}

export interface SubscriptionWithDataParams extends SubscriptionParams {
  data: unknown;
}

export interface SubscriptionWithOptionalDataParams extends SubscriptionParams {
  data?: unknown;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}

export interface PasswordChangeParams extends BaseEntityParams {
  password: string;
  newPassword: string;
}

export interface ExportParams {
  filters: Record<string, unknown>;
}

// Generic service method types
export type ServiceMethod<TParams = void, TResponse = any> = (
  params?: TParams
) => Promise<{ data: TResponse }>;

export type ServiceMethodNoParams<TResponse = any> = () => Promise<{
  data: TResponse;
}>;

export type ServiceMethodWithId<TResponse = any> = (
  id: string | number
) => Promise<{ data: TResponse }>;
