"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  RoleFilter,
  RoleHeader,
  useRoleColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { ROLE_CONSTANTS } from "@/constants/roles";
import { useRoles, useDeleteRole } from "@/hooks";
import type { Role } from "@/types";
import type { RoleFilterState } from "@/types/admin/role";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { ActionModal } from "@/components/admin/action-modal";

export default function RoleManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<RoleFilterState>(
    ROLE_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const {
    rolesWithPagination,
    isFetching: rolesLoading,
    refetch,
  } = useRoles({
    pagination,
    filters,
  });

  const { mutate: deleteRole, isLoading: isDeleting } = useDeleteRole();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = rolesLoading || isDeleting;

  const handleAddRole = () => {
    router.push(ROLE_CONSTANTS.ROUTES.ROLE_CREATE);
  };

  const handleEditRole = (role: Role) => {
    router.push(ROLE_CONSTANTS.ROUTES.ROLE_EDIT(role.id));
  };

  const handleDeleteRole = (role: Role): void => {
    setRoleToDelete(role);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!roleToDelete) return;
    const success = await deleteRole(roleToDelete);
    if (success) {
      setDeleteModalOpen(false);
      setRoleToDelete(null);
      refetch(); // Refetch the roles list
    }
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteModalOpen(false);
    setRoleToDelete(null);
  };

  const handleFilterChange = useCallback(
    (newFilters: RoleFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(ROLE_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useRoleColumns({
    onEditAction: handleEditRole,
    onDeleteAction: handleDeleteRole,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <RoleHeader onAddRole={handleAddRole} />

        <RoleFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Role>
          columns={columns}
          data={rolesWithPagination?.data || []}
          pageCount={rolesWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={rolesWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa vai trò"
          description="Bạn có chắc chắn muốn xóa vai trò này không?"
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={roleToDelete?.name}
        />
      </div>
    </AdminContentCard>
  );
}
