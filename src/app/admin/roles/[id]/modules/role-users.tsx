"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActionModal } from "@/components/admin/action-modal";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { showToast } from "@/components/ui/toast";
import { Plus, Trash2 } from "lucide-react";
import {
  useRoleUsers,
  useAssignUsersToRole,
  useRemoveUserFromRole,
} from "@/hooks";
import { useAdminUsersQuery } from "@/hooks/admin/useUser/useUsers";
import type { User } from "@/types";
import type { PaginationParams } from "@/types/base";
import { getUserRoleLabel } from "@/types/enums";
import { BadgeCell } from "@/components/table-cell";
import { MultiSelect } from "@/components/ui/multi-select";
import { useDeepMemo } from "@/hooks/useDeepMemo";
import { debounce } from "@/lib/utils";
import type { UserFilterState } from "@/types/admin/user";

interface RoleUsersProps {
  readonly roleId: string | number;
  readonly roleName?: string;
}

export const RoleUsers = ({
  roleId,
  roleName = "",
}: RoleUsersProps): React.JSX.Element => {
  // Role users state for infinite scroll
  const [roleUsersPagination, setRoleUsersPagination] =
    useState<PaginationParams>({
      pageIndex: 0,
      pageSize: 10,
    });
  const [allRoleUsers, setAllRoleUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Available users state for infinite scroll
  const [usersSearch, setUsersSearch] = useState<string>("");
  const [usersPagination, setUsersPagination] = useState<PaginationParams>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [allAvailableUsers, setAllAvailableUsers] = useState<User[]>([]);

  // Debounced search handler
  const debouncedSetSearch = useRef(
    debounce((search: string) => {
      setUsersSearch(search);
    }, 1000)
  ).current;

  // Get users in this role
  const {
    usersWithPagination,
    isFetching: roleUsersLoading,
    refetch: refetchRoleUsers,
  } = useRoleUsers({
    roleId,
    pagination: roleUsersPagination,
    enabled: !!roleId,
  });

  // Get all users for selection
  const usersFilters = useMemo<UserFilterState>(() => {
    return {
      searchTerm: usersSearch.trim() || "",
      role: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    };
  }, [usersSearch]);

  const {
    usersWithPagination: allUsersWithPagination,
    isFetching: allUsersLoading,
  } = useAdminUsersQuery({
    filters: usersFilters,
    pagination: usersPagination,
    enabled: true,
  });

  // Reset pagination when search changes (don't clear data yet, wait for API response)
  useEffect(() => {
    setUsersPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [usersSearch]);

  // Memoize role users data
  const roleUsersDataRaw = usersWithPagination?.data || [];
  const roleUsersData = useDeepMemo(roleUsersDataRaw);
  const currentRoleUsersPageIndex = roleUsersPagination.pageIndex;

  // Accumulate role users data for infinite scroll
  useEffect(() => {
    // Early return: ensure roleUsersData is an array
    if (!Array.isArray(roleUsersData)) {
      if (currentRoleUsersPageIndex === 0) {
        setAllRoleUsers([]);
      }
      return;
    }

    // Reset on first page
    if (currentRoleUsersPageIndex === 0) {
      setAllRoleUsers(roleUsersData);
      return;
    }

    // Early return: skip if no new data
    if (roleUsersData.length === 0) {
      return;
    }

    // Append new items for subsequent pages
    setAllRoleUsers(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      const existingIds = new Set(prevArray.map(u => u.id));
      const newItems = roleUsersData.filter(u => !existingIds.has(u.id));
      return [...prevArray, ...newItems];
    });
  }, [roleUsersData, currentRoleUsersPageIndex]);

  // Memoize available users data
  const availableUsersDataRaw = allUsersWithPagination?.data || [];
  const availableUsersData = useDeepMemo(availableUsersDataRaw);
  const currentUsersPageIndex = usersPagination.pageIndex;

  // Accumulate available users data for infinite scroll
  // When pageIndex is 0, replace all data (this handles search reset)
  // When pageIndex > 0, append new data for infinite scroll
  useEffect(() => {
    // Early return: ensure availableUsersData is an array
    if (!Array.isArray(availableUsersData)) {
      if (currentUsersPageIndex === 0) {
        setAllAvailableUsers([]);
      }
      return;
    }

    // Replace all data when starting fresh (new search or initial load)
    if (currentUsersPageIndex === 0) {
      setAllAvailableUsers(availableUsersData);
      return;
    }

    // Append new data for infinite scroll
    if (availableUsersData.length > 0) {
      setAllAvailableUsers(prev => {
        const prevArray = Array.isArray(prev) ? prev : [];
        const existingIds = new Set(prevArray.map(u => u.id));
        const newItems = availableUsersData.filter(u => !existingIds.has(u.id));
        return [...prevArray, ...newItems];
      });
    }
  }, [availableUsersData, currentUsersPageIndex]);

  // Get role user IDs for filtering
  const roleUserIds = useMemo(
    () =>
      new Set((Array.isArray(allRoleUsers) ? allRoleUsers : []).map(u => u.id)),
    [allRoleUsers]
  );

  // Filter available users (not in role)
  const availableUsers = useMemo(() => {
    const allAvailableUsersArray = Array.isArray(allAvailableUsers)
      ? allAvailableUsers
      : [];
    return allAvailableUsersArray.filter(user => !roleUserIds.has(user.id));
  }, [allAvailableUsers, roleUserIds]);

  const { mutate: assignUsers, isLoading: isAssigning } =
    useAssignUsersToRole();
  const { mutate: removeUser, isLoading: isRemoving } = useRemoveUserFromRole();

  // Handle role users scroll to bottom
  const roleUsersTotalPages = usersWithPagination?.totalPages || 1;
  const handleRoleUsersScrollToBottom = useCallback(() => {
    if (currentRoleUsersPageIndex + 1 < roleUsersTotalPages) {
      setRoleUsersPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [roleUsersTotalPages, currentRoleUsersPageIndex]);

  const hasMoreRoleUsers = useMemo(() => {
    return currentRoleUsersPageIndex + 1 < roleUsersTotalPages;
  }, [roleUsersTotalPages, currentRoleUsersPageIndex]);

  // Handle available users scroll to bottom
  const availableUsersTotalPages = allUsersWithPagination?.totalPages || 1;
  const handleAvailableUsersScrollToBottom = useCallback(() => {
    if (currentUsersPageIndex + 1 < availableUsersTotalPages) {
      setUsersPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [availableUsersTotalPages, currentUsersPageIndex]);

  const hasMoreAvailableUsers = useMemo(() => {
    return currentUsersPageIndex + 1 < availableUsersTotalPages;
  }, [availableUsersTotalPages, currentUsersPageIndex]);

  // Handle search change
  const handleUsersSearch = useCallback(
    (search: string) => {
      debouncedSetSearch(search);
    },
    [debouncedSetSearch]
  );

  const handleAddUsers = useCallback(async () => {
    if (selectedUserIds.length === 0) {
      showToast.error("Vui lòng chọn ít nhất một người dùng");
      return;
    }

    const userIds = selectedUserIds.map(id => Number.parseInt(id, 10));
    const success = await assignUsers(roleId, userIds);
    if (success) {
      showToast.success("Thêm người dùng vào vai trò thành công");
      setSelectedUserIds([]);
      // Reset and refetch role users
      setRoleUsersPagination({ pageIndex: 0, pageSize: 10 });
      setAllRoleUsers([]);
      refetchRoleUsers();
    } else {
      showToast.error("Có lỗi xảy ra khi thêm người dùng");
    }
  }, [roleId, selectedUserIds, assignUsers, refetchRoleUsers]);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = useCallback(async () => {
    if (!userToDelete) return;

    const success = await removeUser(roleId, userToDelete.id);
    if (success) {
      showToast.success("Xóa người dùng khỏi vai trò thành công");
      setDeleteModalOpen(false);
      setUserToDelete(null);
      // Reset and refetch role users
      setRoleUsersPagination({ pageIndex: 0, pageSize: 10 });
      setAllRoleUsers([]);
      refetchRoleUsers();
    } else {
      showToast.error("Có lỗi xảy ra khi xóa người dùng");
    }
  }, [roleId, userToDelete, removeUser, refetchRoleUsers]);

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const userOptions = useMemo(
    () =>
      availableUsers.map(user => ({
        value: user.id.toString(),
        label: `${user.fullName} (${user.email})`,
      })),
    [availableUsers]
  );

  return (
    <AdminContentCard>
      <div className="space-y-6">
        {/* Add Users Section */}
        <Card>
          <CardHeader>
            <CardTitle>Thêm người dùng vào vai trò</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium text-sm">Chọn người dùng</div>
              <MultiSelect
                options={userOptions}
                value={selectedUserIds}
                onValueChange={setSelectedUserIds}
                onSearch={handleUsersSearch}
                onScrollToBottom={handleAvailableUsersScrollToBottom}
                hasMore={hasMoreAvailableUsers}
                isLoading={allUsersLoading}
                placeholder="Tìm kiếm và chọn người dùng..."
                shouldFilter={false}
                className="w-full"
              />
            </div>
            <Button
              onClick={handleAddUsers}
              disabled={selectedUserIds.length === 0 || isAssigning}
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 w-4 h-4" />
              {isAssigning ? "Đang thêm..." : "Thêm người dùng"}
            </Button>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="break-words">
              Danh sách người dùng trong vai trò ({allRoleUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="!p-0 !border-none">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
              {(Array.isArray(allRoleUsers) ? allRoleUsers : []).map(user => (
                <div
                  key={user.id}
                  className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 sm:gap-4 p-4 w-full"
                >
                  <div className="flex flex-col flex-1 w-full sm:w-auto min-w-0">
                    <span className="font-semibold text-gray-900 break-words">
                      {user.fullName || user.email}
                    </span>
                    {user.fullName && (
                      <span className="text-gray-500 text-sm break-words">
                        {user.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center self-start sm:self-center gap-2 sm:gap-4 shrink-0">
                    <BadgeCell
                      label={getUserRoleLabel(user.role)}
                      variant="secondary"
                      maxWidth="max-w-full sm:max-w-[200px]"
                      className="text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(user)}
                      className="hover:bg-red-50 text-red-600 hover:text-red-700 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {hasMoreRoleUsers && (
                <div className="py-4 text-center">
                  <Button
                    variant="outline"
                    onClick={handleRoleUsersScrollToBottom}
                    disabled={roleUsersLoading}
                  >
                    {roleUsersLoading ? "Đang tải..." : "Tải thêm"}
                  </Button>
                </div>
              )}
              {allRoleUsers.length === 0 && !roleUsersLoading && (
                <div className="py-8 text-gray-500 text-center">
                  Chưa có người dùng nào trong vai trò này
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa người dùng khỏi vai trò"
          description={`Bạn có chắc chắn muốn xóa người dùng "${userToDelete?.fullName}" khỏi vai trò "${roleName}" không?`}
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isRemoving}
          variant="destructive"
          itemName={userToDelete?.fullName}
        />
      </div>
    </AdminContentCard>
  );
};
