import { BaseEntity } from "@/types";

export interface Blog extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  featured_image?: string;
  readTime?: string;
  published_at?: string;
  category_id?: number;
  category?: {
    id: number;
    name: string;
  };
  author_id?: number;
  author?: {
    id: number;
    name: string;
    avatar?: string;
  };
  tags?: string[];
  status: "draft" | "published" | "archived";
  view_count?: number;
  like_count?: number;
  comment_count?: number;
}

export interface BlogListResponse {
  blogs: Blog[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export interface BlogFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  category_id?: number;
  status?: "draft" | "published" | "archived";
  author_id?: number;
  tags?: string[];
  sort_by?:
    | "created_at"
    | "updated_at"
    | "published_at"
    | "view_count"
    | "like_count";
  sort_order?: "asc" | "desc";
}
