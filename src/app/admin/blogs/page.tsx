"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  BlogFilter,
  BlogHeader,
  useBlogColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { BLOG_CONSTANTS } from "@/constants/blog";
import { useBlogs } from "@/hooks";
import type { Blog } from "@/types";
import type { BlogFilterState } from "@/types/admin/blog";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { useDeleteBlog } from "@/hooks/admin/useBlog/useDeleteBlog";
import { showToast } from "@/components/ui/toast";
import { ActionModal } from "@/components/admin/action-modal";

export default function BlogManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<BlogFilterState>(
    BLOG_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  const { blogsWithPagination, isFetching: blogsLoading } = useBlogs({
    pagination,
    filters,
  });

  const { mutate: deleteBlog, isLoading: isDeleting } = useDeleteBlog();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = blogsLoading || isDeleting;

  const handleAddBlog = () => {
    router.push(BLOG_CONSTANTS.ROUTES.BLOG_CREATE);
  };

  const handleEditBlog = (blog: Blog) => {
    router.push(BLOG_CONSTANTS.ROUTES.BLOG_EDIT(blog.id));
  };

  const handleDeleteBlog = (blog: Blog): void => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!blogToDelete) return;
    await deleteBlog(blogToDelete);
    showToast.success(BLOG_CONSTANTS.MESSAGES.DELETE_SUCCESS);
    setDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  const handleFilterChange = useCallback(
    (newFilters: BlogFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(BLOG_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useBlogColumns({
    onEditAction: handleEditBlog,
    onDeleteAction: handleDeleteBlog,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <BlogHeader onAddBlog={handleAddBlog} />

        <BlogFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Blog>
          columns={columns}
          data={blogsWithPagination?.data || []}
          pageCount={blogsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={blogsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa blog"
          description="Bạn có chắc chắn muốn xóa blog này không?"
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={blogToDelete?.title}
        />
      </div>
    </AdminContentCard>
  );
}
