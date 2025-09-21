"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { debounce } from "@/lib/utils";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  BlogFilter,
  BlogHeader,
  createBlogColumns,
  DataTable,
} from "./modules";
import { INITIAL_FILTER_STATE } from "@/constants";
import { useAdminBlogsQuery, useDeleteBlogMutation } from "@/hooks";
import type { Blog, BlogFilterState } from "@/types/admin";

/**
 * Use constants from module
 */
const INITIAL_FILTERS: BlogFilterState = {
  searchTerm: "",
  status: "all",
  category: "all",
  dateRange: {
    from: "",
    to: "",
  },
};

/**
 * Blog management page component following Berklee pattern
 * Main Management Page with state management, data hooks, and UI components
 *
 * @returns The blog management page JSX
 */
export default function BlogManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<BlogFilterState>(INITIAL_FILTERS);
  const [debouncedFilters, setDebouncedFilters] =
    useState<BlogFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: BlogFilterState) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedFilterUpdate(filters);
  }, [filters, debouncedFilterUpdate]);

  // 🔄 Data Hooks
  const {
    data: blogsData,
    isLoading: blogsLoading,
    totalPages,
    totalItems,
  } = useAdminBlogsQuery({
    page: currentPage,
    pageSize: pageSize,
    search: debouncedFilters.searchTerm,
    status: debouncedFilters.status,
    category: debouncedFilters.category,
    dateFrom: debouncedFilters.dateRange.from,
    dateTo: debouncedFilters.dateRange.to,
  });

  const deleteBlogMutation = useDeleteBlogMutation();

  // Extract data from API responses
  const blogs = Array.isArray(blogsData?.data?.data)
    ? blogsData.data.data
    : Array.isArray(blogsData?.data)
      ? blogsData.data
      : [];

  const isLoading = blogsLoading;

  // 🔗 Navigation handlers
  const handleAddBlog = () => {
    router.push("/admin/blogs/create");
  };

  const handleEditBlog = (blog: Blog) => {
    router.push(`/admin/blogs/${blog.id}`);
  };

  const handleViewBlog = (blog: Blog) => {
    router.push(`/admin/blogs/${blog.id}/view`);
  };

  const handleDeleteBlog = async (id: string | number): Promise<void> => {
    try {
      deleteBlogMutation.mutate(id);
    } catch {
      // Error deleting blog - could be logged to monitoring service
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: BlogFilterState): void => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    []
  );

  const handlePageSizeChange = useCallback((newPageSize: number): void => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  // Create columns with handlers
  const columns = createBlogColumns({
    onEdit: handleEditBlog,
    onDelete: handleDeleteBlog,
    onView: handleViewBlog,
  });

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <BlogHeader onAddBlog={handleAddBlog} />

        <BlogFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() => setCurrentPage(1)}
        />

        <DataTable
          columns={columns}
          data={blogs}
          pagination={{
            currentPage: currentPage,
            totalPages: totalPages,
            totalItems: totalItems,
            pageSize: pageSize,
            onPageChange: (page: number) => setCurrentPage(page),
            onPageSizeChange: (newPageSize: number) => {
              setPageSize(newPageSize);
              setCurrentPage(1);
            },
            showPrevNext: true,
            maxVisiblePages: 5,
          }}
          loading={isLoading}
        />
      </div>
    </AdminContentCard>
  );
}
