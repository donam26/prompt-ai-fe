import { useCallback, useEffect, useState } from "react";
import type { BlogCategory } from "@/types";
import type { BlogCategoryFilterState } from "@/types/admin/blog-category";
import type { PaginationParams } from "@/types/base";
import { blogCategoryService } from "@/services/admin/blogs/blogCategoryService";

interface UseBlogCategoriesParams {
  pagination: PaginationParams;
  filters: BlogCategoryFilterState;
}

interface BlogCategoriesWithPagination {
  data: BlogCategory[];
  total: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}

export const useBlogCategories = ({
  pagination,
  filters,
}: UseBlogCategoriesParams) => {
  const [blogCategoriesWithPagination, setBlogCategoriesWithPagination] =
    useState<BlogCategoriesWithPagination | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchBlogCategories = useCallback(async () => {
    setIsFetching(true);
    setError("");

    try {
      const params = {
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search: filters.searchTerm,
      };

      const response = await blogCategoryService.getBlogCategoriesPage(params);

      setBlogCategoriesWithPagination({
        data: response.data.data || [],
        total: response.data.pagination.total || 0,
        totalPages: response.data.pagination.totalPages || 0,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch blog categories";
      setError(errorMessage);
    } finally {
      setIsFetching(false);
    }
  }, [pagination, filters]);

  useEffect(() => {
    fetchBlogCategories();
  }, [fetchBlogCategories]);

  const refetch = useCallback(() => {
    fetchBlogCategories();
  }, [fetchBlogCategories]);

  return {
    blogCategoriesWithPagination,
    isFetching,
    error,
    refetch,
  };
};
