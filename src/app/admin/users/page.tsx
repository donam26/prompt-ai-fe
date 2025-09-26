"use client";

import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  UserFilter,
  UserHeader,
  createUserColumns,
  DataTable,
} from "./modules";
import { USERS_CONSTANTS } from "@/constants/users";
import { useAdminUsersQuery, useDeleteUserMutation } from "@/hooks";
import type { UserFilterState } from "@/types/admin";
import type { User } from "@/lib/types";
import { debounce } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

export default function UserManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<UserFilterState>(
    USERS_CONSTANTS.INITIAL_FILTERS
  );
  const [debouncedFilters, setDebouncedFilters] = useState<UserFilterState>(
    USERS_CONSTANTS.INITIAL_FILTERS
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: UserFilterState) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedFilterUpdate(filters);
  }, [filters, debouncedFilterUpdate]);

  // 🔄 Data Hooks
  const {
    data: usersData,
    isLoading: usersLoading,
    totalPages,
    totalItems,
  } = useAdminUsersQuery({
    page: currentPage,
    pageSize: pageSize,
    search: debouncedFilters.searchTerm,
    role: debouncedFilters.role,
    status: debouncedFilters.status,
    dateFrom: debouncedFilters.dateRange.from,
    dateTo: debouncedFilters.dateRange.to,
  });

  const deleteUserMutation = useDeleteUserMutation();

  // Extract data from API responses
  const users = Array.isArray(usersData?.data?.data)
    ? usersData.data.data
    : Array.isArray(usersData?.data)
      ? usersData.data
      : [];

  const isLoading = usersLoading;

  // 🔗 Navigation handlers
  const handleAddUser = () => {
    router.push(USERS_CONSTANTS.ROUTES.USER_CREATE);
  };

  const handleEditUser = (user: User) => {
    router.push(USERS_CONSTANTS.ROUTES.USER_EDIT(user.id));
  };

  const handleViewUser = (user: User) => {
    router.push(USERS_CONSTANTS.ROUTES.USER_VIEW(user.id));
  };

  const handleDeleteUser = async (id: string | number): Promise<void> => {
    try {
      deleteUserMutation.mutate(id);
    } catch {
      // Error deleting user - could be logged to monitoring service
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: UserFilterState): void => {
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
    setFilters(USERS_CONSTANTS.INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  // Create columns with handlers
  const columns = createUserColumns({
    onEdit: handleEditUser,
    onDelete: handleDeleteUser,
    onView: handleViewUser,
  });

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <UserHeader onAddUser={handleAddUser} />

        <UserFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() => setCurrentPage(1)}
        />

        <DataTable
          columns={columns}
          data={users}
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
