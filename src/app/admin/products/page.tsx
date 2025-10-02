"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  ProductFilter,
  ProductHeader,
  useProductColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { PRODUCT_CONSTANTS } from "@/constants/product";
import { useProducts, useSections } from "@/hooks";
import { useDeleteProduct } from "@/hooks/admin/useProduct/useDeleteProduct";
import type { Product } from "@/types";
import type { ProductFilterState } from "@/types/admin/product";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
  DEFAULT_PAGE_MAX_SIZE,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { ActionModal } from "@/components/admin/action-modal";

export default function ProductManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<ProductFilterState>(
    PRODUCT_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    productsWithPagination,
    isFetching: productsLoading,
    refetch,
  } = useProducts({
    pagination,
    filters,
  });

  const { sections } = useSections({
    pagination: {
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_MAX_SIZE,
    },
  });

  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = productsLoading || isDeleting;

  // Modal handlers
  const handleViewProduct = (product: Product) => {
    router.push(PRODUCT_CONSTANTS.ROUTES.PRODUCT_DETAIL(product.id));
  };

  const handleEditProduct = (product: Product) => {
    router.push(PRODUCT_CONSTANTS.ROUTES.PRODUCT_EDIT(product.id));
  };

  const handleAddProduct = () => {
    router.push(PRODUCT_CONSTANTS.ROUTES.PRODUCT_CREATE);
  };

  const handleDeleteProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: ProductFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(PRODUCT_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useProductColumns({
    onEditAction: handleEditProduct,
    onDeleteAction: handleDeleteProductClick,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <ProductHeader onAddProduct={handleAddProduct} />

        <ProductFilter
          filters={filters}
          sections={sections}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Product>
          columns={columns}
          data={productsWithPagination?.data || []}
          pageCount={productsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={productsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        {/* Modals */}

        <ActionModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Xóa sản phẩm"
          description="Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={selectedProduct?.name}
        />
      </div>
    </AdminContentCard>
  );
}
