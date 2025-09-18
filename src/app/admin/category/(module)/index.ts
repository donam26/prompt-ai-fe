/**
 * Category management module exports
 *
 * This module provides components and utilities for managing categories
 * in the admin interface, including table columns, filtering, and form handling.
 */

// Column components and utilities
export { categoryColumns, createCategoryColumns } from "./column";

// Filter components and types
export { CategoryFilter } from "./filter";
export type { FilterState } from "@/types/admin";
