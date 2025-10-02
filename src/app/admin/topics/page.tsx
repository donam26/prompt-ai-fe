"use client";

import { useState, useCallback, useEffect } from "react";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { TopicFilters, TopicHeader } from "./modules";
import { useTopicColumns, adaptColumnsForDataTable } from "./modules/table";
import { TOPICS_CONSTANTS } from "@/constants/topics";
import { useTopics, useDeleteTopic, useUpsertTopic } from "@/hooks/admin";
import type { Topic, TopicFilterState } from "@/types";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { ActionModal } from "@/components/admin/action-modal";
import { TopicFormModal } from "./modules/modal/topic-form-modal";
import { showToast } from "@/components/ui/toast";

export default function TopicManagementPage(): React.JSX.Element {
  const [filters, setFilters] = useState<TopicFilterState>(
    TOPICS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);

  // Form modal state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const {
    topicsWithPagination,
    isFetching: topicsLoading,
    refetch,
  } = useTopics({
    pagination,
    filters,
  });

  const {
    mutate: deleteTopic,
    isLoading: isDeleting,
    error: deleteTopicError,
  } = useDeleteTopic();

  const {
    mutate: upsertTopic,
    isLoading: isUpserting,
    error: upsertTopicError,
  } = useUpsertTopic();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = topicsLoading || isDeleting || isUpserting;

  const handleAddTopic = () => {
    setEditingTopic(null);
    setFormModalOpen(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setFormModalOpen(true);
  };

  const handleDeleteTopic = (topic: Topic): void => {
    setTopicToDelete(topic);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!topicToDelete) return;
    await deleteTopic(topicToDelete);

    showToast.success(TOPICS_CONSTANTS.MESSAGES.DELETE_SUCCESS);
    refetch();
    setDeleteModalOpen(false);
    setTopicToDelete(null);
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteModalOpen(false);
    setTopicToDelete(null);
  };

  const handleSubmitTopic = async (topicData: any): Promise<void> => {
    await upsertTopic(topicData);
    showToast.success(
      editingTopic
        ? TOPICS_CONSTANTS.MESSAGES.UPDATE_SUCCESS
        : TOPICS_CONSTANTS.MESSAGES.CREATE_SUCCESS
    );
    refetch();
    setFormModalOpen(false);
    setEditingTopic(null);
  };

  const handleCloseFormModal = (): void => {
    setFormModalOpen(false);
    setEditingTopic(null);
  };

  const handleFilterChange = useCallback(
    (newFilters: TopicFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(TOPICS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useTopicColumns({
    onEdit: handleEditTopic,
    onDelete: handleDeleteTopic,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  useEffect(() => {
    if (deleteTopicError || upsertTopicError) {
      showToast.error(deleteTopicError || upsertTopicError);
    }
  }, [deleteTopicError, upsertTopicError]);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <TopicHeader
          onAddTopic={handleAddTopic}
          filters={filters}
          disabled={!topicsWithPagination?.data.length}
        />

        <TopicFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Topic>
          columns={columns}
          data={topicsWithPagination?.data || []}
          pageCount={topicsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={topicsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        {/* Form Modal */}
        {editingTopic && (
          <TopicFormModal
            topic={editingTopic}
            onSubmit={handleSubmitTopic}
            onCancel={handleCloseFormModal}
            isLoading={isUpserting}
            isOpen={formModalOpen}
          />
        )}

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa topic"
          description={TOPICS_CONSTANTS.MESSAGES.DELETE_CONFIRM}
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={topicToDelete?.name}
        />
      </div>
    </AdminContentCard>
  );
}
