/**
 * Blog related entities và types
 */

import type { BaseEntity, EntityId } from "../base";

// Blog entity
export interface Blog extends BaseEntity {
  title: string;
  content: string;
  metaDescription?: string;
  featuredImage?: string;
  publishedAt?: string;
  categoryId?: EntityId;
  category?: {
    id: EntityId;
    name: string;
  };
  blogCategory?: BlogCategory;
}

// Blog category
export interface BlogCategory extends BaseEntity {
  name: string;
  description?: string;
}

// Create/Update request types
export interface CreateBlogRequest {
  title: string;
  content: string;
  description?: string;
  blogCategoryId: EntityId;
  image?: File;
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
  id: EntityId;
}
