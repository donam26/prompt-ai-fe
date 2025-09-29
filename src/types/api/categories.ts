import type { Section, Industry } from "@/types";

/**
 * Industry data structure from API
 */
export interface ApiIndustry {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
}

/**
 * Section data structure from API
 */
export interface ApiSection {
  readonly id: number;
  readonly name: string;
}

/**
 * Category data structure from API
 */
export interface ApiCategory {
  readonly id: number;
  readonly name: string;
  readonly image: string;
  readonly description: string | null;
  readonly image_card: string;
  readonly section_id: number;
  readonly type: "premium" | "free";
  readonly created_at: string;
  readonly updated_at: string;
  readonly is_comming_soon: boolean;
  readonly Section: ApiSection;
  readonly industries: ApiIndustry[];
}

/**
 * Pagination metadata for API responses
 */
export interface ApiPaginationMeta {
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly filters: Record<string, unknown>;
}

/**
 * Categories API response structure (raw from API)
 */
export interface CategoriesApiResponse {
  readonly data: ApiCategory[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly filters: Record<string, unknown>;
}

/**
 * Wrapped API response structure (as returned by service)
 */
export interface WrappedCategoriesApiResponse {
  readonly data: CategoriesApiResponse;
  readonly message?: string;
  readonly success?: boolean;
}

/**
 * Transformed category data for frontend use
 */
export interface TransformedCategory {
  readonly id: string | number;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  readonly image_card?: string;
  readonly section_id: string | number;
  readonly type?: string;
  readonly is_coming_soon?: boolean;
  readonly is_comming_soon?: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly section?: Section;
  readonly Section?: Section;
  readonly industries?: Industry[];
}

/**
 * Hook result for categories query
 */
export interface UseAdminCategoriesQueryResult {
  readonly isLoading: boolean;
  readonly error: unknown;
  readonly refetch: () => void;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly categories: TransformedCategory[];
}
