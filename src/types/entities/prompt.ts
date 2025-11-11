/**
 * Prompt related entities và types
 */

import type { BaseEntity, EntityId } from "../base";

// Prompt entity
export interface Prompt extends BaseEntity {
  title: string;
  content: string;
  shortDescription?: string;
  description?: string;
  categoryId: EntityId;
  topicId?: EntityId;
  industryId?: EntityId;
  isType: string | number;
  subType: number;
  what?: string | null;
  tips?: string | null;
  text?: string | null;
  how?: string | null;
  input?: string | null;
  output?: string | null;
  optimizationGuide?: string | null;
  addTip?: string | null;
  addInformation?: string | null;
  image?: string;
  imageCard?: string;
  isComingSoon?: boolean;
  sumView?: number;
  category?: Category;
  promptIndustries?: Industry[];
  topic?: Topic;
  industries?: Industry[];
  // Additional properties for UI
  tags?: string[];
  isActive?: boolean;
  isPremium?: boolean;
  isPublic?: boolean;
}

// Category entity
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  image?: string;
  imageCard?: string;
  sectionId: EntityId;
  type?: string;
  isComingSoon?: boolean;
  section?: Section;
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
}

// Industry entity
export interface Industry extends BaseEntity {
  name: string;
  description?: string;
}

// Favorite prompt
export interface FavoritePrompt extends BaseEntity {
  userId: EntityId;
  promptId: EntityId;
  prompt?: Prompt;
}

// Create/Update request types
export interface CreatePromptRequest {
  title: string;
  content: string;
  description?: string;
  categoryId: EntityId;
  topicId?: EntityId;
  industryId?: EntityId;
  isType: string | number;
  subType: number;
  image?: File;
  imageCard?: File;
  isComingSoon?: boolean;
}

export interface UpdatePromptRequest extends Partial<CreatePromptRequest> {
  id: EntityId;
}

// Search và Filter types
export interface PromptSearchFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: EntityId;
  topicId?: EntityId;
  industryId?: EntityId | EntityId[];
  isType?: string | number;
  subType?: string | number;
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
  isType?: any;
  subType?: number;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  onlyWithoutCategory?: boolean;
}
