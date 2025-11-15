"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
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
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { ActionModal } from "@/components/admin/action-modal";
import type { SectionFilterState } from "@/types/admin/section";
import { debounce } from "@/lib/utils";
import { useDeepMemo } from "@/hooks/useDeepMemo";

export default function ProductManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<ProductFilterState>(
    PRODUCT_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { productsWithPagination, isFetching: productsLoading } = useProducts({
    pagination,
    filters,
  });

  // Sections state management for infinite scroll and search in filter
  const [sectionsSearch, setSectionsSearch] = useState<string>("");
  const [sectionsPagination, setSectionsPagination] = useState<IPagination>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [allSections, setAllSections] = useState<any[]>([]);

  // Debounced search handler - update sectionsSearch after 1 second
  const debouncedSetSectionsSearch = useRef(
    debounce((search: string) => {
      setSectionsSearch(search);
    }, 1000)
  ).current;

  // Build filters for sections
  const sectionsFilters = useMemo<SectionFilterState | undefined>(() => {
    const hasSearch = !!sectionsSearch.trim();
    const filters: SectionFilterState = {
      searchTerm: hasSearch ? sectionsSearch.trim() : "",
    };
    return filters;
  }, [sectionsSearch]);

  // Fetch sections with pagination and search
  const { sectionsWithPagination, isFetching: sectionsLoading } = useSections({
    pagination: sectionsPagination,
    filters: sectionsFilters,
    enabled: true,
  });

  // Reset sections when search changes
  useEffect(() => {
    setSectionsPagination(prev => ({ ...prev, pageIndex: 0 }));
    setAllSections([]);
  }, [sectionsSearch]);

  // Memoize sections data with deep comparison to prevent infinite loops
  const sectionsDataRaw = sectionsWithPagination?.data || [];
  const sectionsData = useDeepMemo(sectionsDataRaw);

  const currentSectionsPageIndex = sectionsPagination.pageIndex;

  // Accumulate sections data for infinite scroll
  useEffect(() => {
    if (sectionsData.length > 0 || currentSectionsPageIndex === 0) {
      if (currentSectionsPageIndex === 0) {
        setAllSections(sectionsData);
      } else {
        setAllSections(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          const newItems = sectionsData.filter(s => !existingIds.has(s.id));
          return [...prev, ...newItems];
        });
      }
    }
  }, [sectionsData, currentSectionsPageIndex]);

  // Handle sections search change with debounce
  const handleSectionsSearch = useCallback(
    (search: string) => {
      debouncedSetSectionsSearch(search);
    },
    [debouncedSetSectionsSearch]
  );

  // Extract stable values to prevent infinite loops
  const sectionsTotalPages = sectionsWithPagination?.totalPages || 1;
  const sectionsCurrentPageIndex = sectionsPagination.pageIndex;

  // Handle sections scroll to bottom (load more)
  const handleSectionsScrollToBottom = useCallback(() => {
    if (sectionsCurrentPageIndex + 1 < sectionsTotalPages) {
      setSectionsPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [sectionsTotalPages, sectionsCurrentPageIndex]);

  // Check if there are more sections to load
  const hasMoreSections = useMemo(() => {
    return sectionsCurrentPageIndex + 1 < sectionsTotalPages;
  }, [sectionsTotalPages, sectionsCurrentPageIndex]);

  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = productsLoading || isDeleting;

  // Modal handlers

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
          sections={allSections}
          sectionsLoading={sectionsLoading}
          sectionsSearch={sectionsSearch}
          onSectionsSearch={handleSectionsSearch}
          onSectionsScrollToBottom={handleSectionsScrollToBottom}
          hasMoreSections={hasMoreSections}
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
