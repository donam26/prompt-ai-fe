/**
 * Prompt related entities và types
 */

import type { BaseEntity, EntityId } from "../base";

// Prompt entity
export interface Prompt extends BaseEntity {
  title: string;
  content: string;
  short_description?: string;
  description?: string;
  category_id: EntityId;
  topic_id?: EntityId;
  industry_id?: EntityId;
  is_type: string | number;
  sub_type: number;
  what?: string | null;
  tips?: string | null;
  text?: string | null;
  how?: string | null;
  input?: string | null;
  output?: string | null;
  OptimationGuide?: string | null;
  addtip?: string | null;
  addinformation?: string | null;
  image?: string;
  image_card?: string;
  is_coming_soon?: boolean;
  sum_view?: number;
  category?: Category;
  Category?: Category; // Support both field names
  topic?: Topic;
  industries?: Industry[];
  // Additional properties for UI
  tags?: string[];
  isActive?: boolean;
  isComingSoon?: boolean;
  isPremium?: boolean;
  isPublic?: boolean;
  createdAt?: string;
}

// Category entity
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  image?: string;
  image_card?: string;
  section_id: EntityId;
  type?: string;
  is_coming_soon?: boolean;
  is_comming_soon?: boolean; // Support both spellings
  section?: Section;
  Section?: Section; // Support both field names
  industries?: Industry[];
}

// Section entity
export interface Section extends BaseEntity {
  name: string;
  description?: string;
}

// Topic entity
export interface Topic extends BaseEntity {
  name: string;
  description?: string;
}

// Industry entity
export interface Industry extends BaseEntity {
  name: string;
  description?: string;
}

// Favorite prompt
export interface FavoritePrompt extends BaseEntity {
  user_id: EntityId;
  prompt_id: EntityId;
  prompt?: Prompt;
}

// Create/Update request types
export interface CreatePromptRequest {
  title: string;
  content: string;
  description?: string;
  category_id: EntityId;
  topic_id?: EntityId;
  industry_id?: EntityId;
  is_type: string | number;
  sub_type: number;
  image?: File;
  image_card?: File;
  is_coming_soon?: boolean;
}

export interface UpdatePromptRequest extends Partial<CreatePromptRequest> {
  id: EntityId;
}

// Search và Filter types
export interface PromptSearchFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  category_id?: EntityId;
  topic_id?: EntityId;
  industry_id?: EntityId | EntityId[];
  is_type?: string | number;
  sub_type?: string | number;
  status?: string;
  type?: string | number;
  dateFrom?: string;
  dateTo?: string;
}

export interface PromptFilterState {
  searchTerm: string;
  categoryIds: string[];
  topicIds: string[];
  industryIds: string[];
  isType?: number;
  subType?: number;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}
