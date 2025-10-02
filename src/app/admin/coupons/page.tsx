"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { CouponHeader, CouponFilters, CouponActiveFilters } from "./modules";
import { useCouponColumns, adaptColumnsForDataTable } from "./modules/table";
import { COUPON_CONSTANTS } from "@/constants/coupon";
import { useCoupons, useDeleteCoupon } from "@/hooks/admin/useCoupon";
import type { Coupon } from "@/types/entities/coupon";
import type { CouponFilterState } from "@/types/admin/coupon";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { ActionModal } from "@/components/admin/action-modal";

export default function CouponManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<CouponFilterState>(
    COUPON_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  // Modal states
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    couponsWithPagination,
    isFetching: couponsLoading,
    refetch,
  } = useCoupons({
    pagination,
    filters,
  });

  const { mutate: deleteCoupon, isLoading: isDeleting } = useDeleteCoupon();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = couponsLoading || isDeleting;

  const handleEditCoupon = (coupon: Coupon) => {
    router.push(COUPON_CONSTANTS.ROUTES.COUPON_EDIT(coupon.id));
  };

  const handleAddCoupon = () => {
    router.push(COUPON_CONSTANTS.ROUTES.COUPON_CREATE);
  };

  const handleDeleteCouponClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCoupon) {
      const success = await deleteCoupon(selectedCoupon);
      if (success) {
        setIsDeleteModalOpen(false);
        setSelectedCoupon(null);
        refetch();
      }
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: CouponFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(COUPON_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useCouponColumns({
    onEditAction: handleEditCoupon,
    onDeleteAction: handleDeleteCouponClick,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <CouponHeader onAddCoupon={handleAddCoupon} />

        <CouponFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Coupon>
          columns={columns}
          data={couponsWithPagination?.data || []}
          pageCount={couponsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={couponsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        <ActionModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCoupon(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Xóa mã giảm giá"
          description="Bạn có chắc chắn muốn xóa mã giảm giá này không? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={selectedCoupon?.code}
        />
      </div>
    </AdminContentCard>
  );
}
