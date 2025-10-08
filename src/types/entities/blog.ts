import { BaseEntity } from "@/types";

export interface BlogCategory extends BaseEntity {
  name: string;
  slug?: string;
  description?: string;
}

export interface Blog extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  featuredImage?: string;
  readTime?: string;
  publishedAt?: string;
  categoryId?: number;
  category?: {
    id: number;
    name: string;
  };
  authorId?: number;
  author?: {
    id: number;
    name: string;
    avatar?: string;
  };
  tags?: string[];
  status: "draft" | "published" | "archived";
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  blogCategory?: BlogCategory;
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
  categoryId?: number;
  status?: "draft" | "published" | "archived";
  authorId?: number;
  tags?: string[];
  sortBy?:
    | "createdAt"
    | "updatedAt"
    | "publishedAt"
    | "viewCount"
    | "likeCount";
  sortOrder?: "asc" | "desc";
}
