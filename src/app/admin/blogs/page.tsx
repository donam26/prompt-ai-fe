"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  BlogFilter,
  BlogHeader,
  createBlogColumns,
  DataTable,
} from "./modules";
import { BLOG_CONSTANTS } from "@/constants/blog";
import { useAdminBlogsQuery, useDeleteBlogMutation } from "@/hooks";
import type { BlogFilterState } from "@/types/admin";
import type { Blog } from "@/lib/types";

export default function BlogManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<BlogFilterState>(
    BLOG_CONSTANTS.INITIAL_FILTERS
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(
    BLOG_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE
  );

  // 🔄 Data Hooks
  const { searchTerm, dateRange } = filters;
  const { data: blogsData, isLoading: blogsLoading } = useAdminBlogsQuery({
    page: currentPage,
    pageSize: pageSize,
    search: searchTerm,
    dateFrom: dateRange.from,
    dateTo: dateRange.to,
  });

  const deleteBlogMutation = useDeleteBlogMutation();

  // Extract data from API responses
  const blogs = blogsData?.data || [];
  const totalPages = blogsData?.totalPages || 0;
  const totalItems = blogsData?.total || 0;
  const isLoading = blogsLoading;

  // 🔗 Navigation handlers
  const handleAddBlog = () => {
    router.push(BLOG_CONSTANTS.ROUTES.BLOG_CREATE);
  };

  const handleEditBlog = (blog: Blog) => {
    router.push(BLOG_CONSTANTS.ROUTES.BLOG_EDIT(blog.id));
  };

  const handleViewBlog = (blog: Blog) => {
    router.push(BLOG_CONSTANTS.ROUTES.BLOG_VIEW(blog.id));
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

  // const handlePageSizeChange = useCallback((newPageSize: number): void => {
  //   setPageSize(newPageSize);
  //   setCurrentPage(1);
  // }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(BLOG_CONSTANTS.INITIAL_FILTERS);
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
