"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  ExpiringSubscriptionsHeader,
  ExpiringSubscriptionsFilter,
  useExpiringSubscriptionsColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { useExpiringSubscriptions } from "@/hooks/admin/useUser/useExpiringSubscriptions";
import { EXPIRING_SUBSCRIPTIONS_CONSTANTS } from "@/constants/expiring-subscriptions";
import type { ExpiringSubscription } from "@/types/admin/expiring-subscription";
import type { ExpiringSubscriptionsFilterState } from "@/types/admin/expiring-subscriptions";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { USERS_CONSTANTS } from "@/constants/users";

export default function ExpiringSubscriptionsPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<ExpiringSubscriptionsFilterState>(
    EXPIRING_SUBSCRIPTIONS_CONSTANTS.INITIAL_FILTERS
  );
  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  const { usersWithPagination, isFetching: isLoading } =
    useExpiringSubscriptions({
      pagination,
      search: filters.search,
      days: filters.days,
      subscriptionType: filters.subscriptionType,
    });

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const handleEditUser = (item: ExpiringSubscription): void => {
    router.push(USERS_CONSTANTS.ROUTES.USER_EDIT(item.userId));
  };

  const handleFilterChange = useCallback(
    (newFilters: ExpiringSubscriptionsFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(EXPIRING_SUBSCRIPTIONS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useExpiringSubscriptionsColumns({
    onEditAction: handleEditUser,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <ExpiringSubscriptionsHeader filters={filters} />

        <ExpiringSubscriptionsFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<ExpiringSubscription>
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
    </AdminContentCard>
  );
}
