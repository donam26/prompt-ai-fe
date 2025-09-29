/**
 * Blog related entities và types
 */

import type { BaseEntity, EntityId } from "../base";

// Blog entity
export interface Blog extends BaseEntity {
  title: string;
  content: string;
  meta_description?: string;
  featured_image?: string;
  published_at?: string;
  category_id?: EntityId;
  category?: {
    id: EntityId;
    name: string;
  };
  blog_category?: BlogCategory;
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
  blog_category_id: EntityId;
  image?: File;
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
  id: EntityId;
}
