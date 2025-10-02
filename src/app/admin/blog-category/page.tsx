"use client";

import { useState, useCallback } from "react";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  BlogCategoryFilters,
  BlogCategoryHeader,
  useBlogCategoryColumns,
  adaptColumnsForDataTable,
  BlogCategoryFormModal,
} from "./modules";
import { BLOG_CATEGORY_CONSTANTS } from "@/constants/blog-category";
import {
  useDeleteBlogCategory,
  useUpsertBlogCategory,
  useBlogCategories,
} from "@/hooks/admin/useBlogCategory";
import type { BlogCategory } from "@/types";
import type { BlogCategoryFilterState } from "@/types/admin/blog-category";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { ActionModal } from "@/components/admin/action-modal";

export default function BlogCategoryManagementPage(): React.JSX.Element {
  const [filters, setFilters] = useState<BlogCategoryFilterState>(
    BLOG_CATEGORY_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogCategoryToDelete, setBlogCategoryToDelete] =
    useState<BlogCategory | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingBlogCategory, setEditingBlogCategory] =
    useState<BlogCategory | null>(null);

  const {
    blogCategoriesWithPagination,
    isFetching: blogCategoriesLoading,
    refetch,
  } = useBlogCategories({
    pagination,
    filters,
  });

  const { mutate: deleteBlogCategory, isLoading: isDeleting } =
    useDeleteBlogCategory();
  const { mutate: upsertBlogCategory, isUpserting } = useUpsertBlogCategory();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = blogCategoriesLoading || isDeleting || isUpserting;

  // 🔗 Modal handlers
  const handleAddBlogCategory = () => {
    setEditingBlogCategory(null);
    setFormModalOpen(true);
  };

  const handleEditBlogCategory = (blogCategory: BlogCategory) => {
    setEditingBlogCategory(blogCategory);
    setFormModalOpen(true);
  };

  const handleDeleteBlogCategory = (blogCategory: BlogCategory): void => {
    setBlogCategoryToDelete(blogCategory);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!blogCategoryToDelete) return;
    await deleteBlogCategory(blogCategoryToDelete);
    setDeleteModalOpen(false);
    setBlogCategoryToDelete(null);
    refetch();
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteModalOpen(false);
    setBlogCategoryToDelete(null);
  };

  const handleSubmitBlogCategory = async (
    blogCategoryData: any
  ): Promise<void> => {
    try {
      await upsertBlogCategory(blogCategoryData);
      setFormModalOpen(false);
      setEditingBlogCategory(null);
      refetch();
    } catch (error) {
      console.error("Submit blog category error:", error);
      // Error will be handled by the hook
    }
  };

  const handleCloseFormModal = (): void => {
    setFormModalOpen(false);
    setEditingBlogCategory(null);
  };

  const handleFilterChange = useCallback(
    (newFilters: BlogCategoryFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(BLOG_CATEGORY_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useBlogCategoryColumns({
    onEditAction: handleEditBlogCategory,
    onDeleteAction: handleDeleteBlogCategory,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <BlogCategoryHeader onAddBlogCategory={handleAddBlogCategory} />

        <BlogCategoryFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<BlogCategory>
          columns={columns}
          data={blogCategoriesWithPagination?.data || []}
          pageCount={
            blogCategoriesWithPagination?.totalPages || DEFAULT_TOTAL_PAGES
          }
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={blogCategoriesWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        {/* Form Modal */}
        <BlogCategoryFormModal
          blogCategory={editingBlogCategory || undefined}
          onSubmit={handleSubmitBlogCategory}
          onCancel={handleCloseFormModal}
          isLoading={isUpserting}
          isOpen={formModalOpen}
        />

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa blog category"
          description={BLOG_CATEGORY_CONSTANTS.MESSAGES.DELETE_CONFIRM}
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={blogCategoryToDelete?.name}
          itemDescription={blogCategoryToDelete?.description}
        />
      </div>
    </AdminContentCard>
  );
}
