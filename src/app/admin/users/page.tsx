"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  UserFilter,
  UserHeader,
  useUserColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { USERS_CONSTANTS } from "@/constants/users";
import { useAdminUsersQuery } from "@/hooks";
import { useDeleteUser } from "@/hooks/admin/useUser/useDeleteUser";
import { ConfirmationModal } from "@/components/admin/confirmation-modal";
import type { User } from "@/types";
import type { UserFilterState } from "@/types/admin/user";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";

export default function UserManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<UserFilterState>(
    USERS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const {
    usersWithPagination,
    isFetching: usersLoading,
    refetch: refetchUsers,
  } = useAdminUsersQuery({
    pagination,
    filters,
  });

  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = usersLoading || isDeleting;

  // 🔗 Navigation handlers
  const handleAddUser = () => {
    router.push(USERS_CONSTANTS.ROUTES.USER_CREATE);
  };

  const handleEditUser = (user: User) => {
    router.push(USERS_CONSTANTS.ROUTES.USER_EDIT(user.id));
  };

  const handleDeleteUser = (user: User): void => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!userToDelete) return;

    const success = await deleteUser(userToDelete);
    if (success) {
      // User deleted successfully - refresh the user list
      refetchUsers();
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = (): void => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleFilterChange = useCallback(
    (newFilters: UserFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(USERS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Handle import success - refresh user list
  const handleImportSuccess = useCallback((): void => {
    refetchUsers();
  }, [refetchUsers]);

  // Create columns with handlers
  const tanstackColumns = useUserColumns({
    onEditAction: handleEditUser,
    onDeleteAction: handleDeleteUser,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <UserHeader
          onAddUser={handleAddUser}
          onImportSuccess={handleImportSuccess}
          filters={filters}
        />

        <UserFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<User>
          columns={columns}
          data={usersWithPagination?.data || []}
          pageCount={usersWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={usersWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa người dùng"
        description={
          userToDelete
            ? `Bạn có chắc chắn muốn xóa người dùng "${userToDelete.fullName || userToDelete.email}"? Hành động này không thể hoàn tác.`
            : "Bạn có chắc chắn muốn xóa người dùng này?"
        }
        confirmText="Xóa"
        cancelText="Hủy"
        isLoading={isDeleting}
        variant="destructive"
      />
    </AdminContentCard>
  );
}
